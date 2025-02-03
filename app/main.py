from fastapi import FastAPI, HTTPException, File, UploadFile
from pydantic import BaseModel
from typing import List, Optional
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from PIL import Image
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()
app = FastAPI()

class UserCreate(BaseModel):
    id: int
    password: str

class PortfolioCreate(BaseModel):
    id: int
    title: str
    body: str
    user_id: int

class ProfileCreate(BaseModel):
    portfolio_id: int
    username: str
    phoneNumber: str
    profile_image: str
    banner_image: str
    school_name: str
    blog_url: Optional[str] = None # 필수가 아님
    major: str
    degree: str

class PRCreate(BaseModel):
    portfolio_id: int
    personality: str

class SkillCreate(BaseModel):
    portfolio_id: int
    skill_name: str
    skill_group: str
    description: str

class AwardCreate(BaseModel):
    portfolio_id: int
    award_title: str
    award_from: str
    award_val: str
    award_date: str

class ExperienceCreate(BaseModel):
    portfolio_id: int
    job_title: str
    job_responsibility: str
    job_exp: str
    start_yr: int
    start_month: int
    end_yr: int
    end_month: int

class ProjectCreate(BaseModel):
    portfolio_id: int
    project_image: str
    project_title: str
    project_skills: str
    project_responsibility: str
    project_link: Optional[str] = None
    description: str
    start_yr: int
    start_month: int
    end_yr: int
    end_month: int

# === 데이터 저장 ===
users_db = {}
portfolios_db = defaultdict(dict)


# === POST API ===

@app.post("/users", summary="새로운 사용자 생성")
def create_user(user: UserCreate):
    if user.id in users_db:
        raise HTTPException(status_code=400, detail="이미 존재하는 사용자입니다.")
    users_db[user.id] = {
        "id": user.id,
        "password": user.password
    }
    return {"message": "사용자가 성공적으로 생성되었습니다.", "user": users_db[user.id]}

@app.post("/portfolio", summary="새로운 포트폴리오 생성")
def create_portfolio(portfolio: PortfolioCreate):
    if portfolio.id in portfolios_db:
        raise HTTPException(status_code=400, detail="Portfolio ID already exists")
    portfolios_db[portfolio.id] = portfolio
    return {"message": "Portfolio created successfully", "portfolio": portfolio}

@app.post("/portfolio/{portfolio_id}/profile", summary="새로운 프로필 생성")
def create_profile(portfolio_id: int, profile: ProfileCreate):
    return {"message": "Profile created successfully", "profile": profile}

@app.post("/portfolio/{portfolio_id}/pr", summary="새로운 소개서 생성")
def create_pr(portfolio_id: int, pr: PRCreate):
    return {"message": "PR created successfully", "pr": pr}

@app.post("/portfolio/{portfolio_id}/skills", summary="새로운 기술 스택 생성")
def create_skills(portfolio_id: int, skill: SkillCreate):
    return {"message": "Skill created successfully", "skill": skill}

@app.post("/portfolio/{portfolio_id}/award", summary="새로운 수상 내역 생성")
def create_award(portfolio_id: int, award: AwardCreate):
    return {"message": "Award created successfully", "award": award}

@app.post("/portfolio/{portfolio_id}/experience", summary="새로운 경험 생성")
def create_experience(portfolio_id: int, experience: ExperienceCreate):
    return {"message": "Experience created successfully", "experience": experience}

@app.post("/portfolio/{portfolio_id}/project", summary="새로운 프로젝트 생성")
def create_project(portfolio_id: int, project: ProjectCreate):
    return {"message": "Project created successfully", "project": project}


# === GET API ===

@app.get("/users", summary="모든 사용자 목록 조회")
def get_users():
    return {"users": list(users_db.values())}

@app.get("/portfolio/{portfolio_id}", summary="포트폴리오 조회")
def get_portfolio(portfolio_id: int):
    portfolio = portfolios_db.get(portfolio_id)
    if not portfolio:
        raise HTTPException(status_code=404, detail=f"ID가 {portfolio_id}인 포트폴리오를 찾을 수 없습니다.")
    return {"message": "포트폴리오 조회 성공", "portfolio": portfolio}

# === 이미지 업로드 ===
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "backend/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)  # 업로드 폴더 생성

# 고정된 파일 이름 설정 (항상 덮어쓰기)
FIXED_FILENAME = "uploaded_image.png"
CROPPED_FILENAME = "cropped_uploaded_image.png"

# 크롭할 사이즈 (가로x세로)
TARGET_WIDTH = 350
TARGET_HEIGHT = 250

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, FIXED_FILENAME)
    cropped_path = os.path.join(UPLOAD_DIR, CROPPED_FILENAME)

    # 기존 파일 삭제 (원본 & 크롭된 파일)
    for path in [file_path, cropped_path]:
        if os.path.exists(path):
            os.remove(path)

    # 새 파일 저장
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # 이미지 크롭
    with Image.open(file_path) as img:
        width, height = img.size
        left = (width - TARGET_WIDTH) / 2
        top = (height - TARGET_HEIGHT) / 2
        right = (width + TARGET_WIDTH) / 2
        bottom = (height + TARGET_HEIGHT) / 2
        img = img.crop((left, top, right, bottom))  # 중앙 크롭
        img.save(cropped_path)

    return {"url": f"{API_BASE_URL}/uploads/{CROPPED_FILENAME}"}  # 환경 변수 적용

# 업로드된 파일 제공
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")