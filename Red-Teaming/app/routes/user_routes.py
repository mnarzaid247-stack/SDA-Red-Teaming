from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.extensions import get_db
from app.services.user_service import UserService
from app.dependencies.auth_dependencies import get_current_user
from app.schemas.user_schema import (
    UserCreate,
    UserLogin,
    UserResponse,
    UserUpdate,
    TokenResponse
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

user_service = UserService()


@router.get("/me", response_model=UserResponse)
def get_me(
    current_user = Depends(get_current_user)
):
    return current_user



@router.post("/login", response_model=TokenResponse)
def login_user(
    login_data: UserLogin,
    db: Session = Depends(get_db)
):
    user = user_service.get_user_by_email(
        db,
        login_data.email
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    is_valid_password = user_service.auth_service.verify_password(
        login_data.password,
        user.password_hash
    )

    if not is_valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    
    access_token = user_service.auth_service.create_access_token(
        data={
            "sub": user.id,
            "email": user.email,
            "role": user.role
        }
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer"
    )




@router.post("", response_model=UserResponse, status_code=201)
def create_user(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    user = user_service.create_user(
        db,
        user_data
    )

    if not user:
        raise HTTPException(
            status_code=409,
            detail="Email already exists"
        )

    return user


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