from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os
from PIL import Image
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000")

app = FastAPI()

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
from fastapi.staticfiles import StaticFiles
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")
