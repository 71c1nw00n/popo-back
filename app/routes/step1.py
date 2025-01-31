from fastapi import APIRouter

router = APIRouter()

@router.get("/step1")
def get_step1():
    return {"step": "step1", "message": "This is the Step 1 API"}