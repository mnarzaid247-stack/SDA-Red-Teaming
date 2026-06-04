from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.extensions import get_db
from app.services.user_service import UserService
from app.schemas.user_schema import (
    UserCreate,
    UserResponse,
    UserUpdate
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

user_service = UserService()


@router.post("", response_model=UserResponse)
def create_user(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    return user_service.create_user(
        db,
        user_data
    )


@router.get("", response_model=list[UserResponse])
def get_users(
    db: Session = Depends(get_db)
):
    return user_service.get_all_users(db)


@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: str,
    db: Session = Depends(get_db)
):
    user = user_service.get_user_by_id(
        db,
        user_id
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: str,
    user_data: UserUpdate,
    db: Session = Depends(get_db)
):
    user = user_service.update_user(
        db,
        user_id,
        user_data
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


@router.delete("/{user_id}")
def delete_user(
    user_id: str,
    db: Session = Depends(get_db)
):
    user = user_service.delete_user(
        db,
        user_id
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "message": "User deleted successfully"
    }