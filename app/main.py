from fastapi import FastAPI
from app.routes import step1  # step1 API import

app = FastAPI()

# 라우트 등록
app.include_router(step1.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI backend!"}
