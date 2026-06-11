from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.extensions import get_db
from app.services.user_service import UserService
from app.dependencies.auth_dependencies import (get_current_user, get_current_admin)
from app.schemas.user_schema import (
    RegisterUser,
    UserLogin,
    UserResponse,
    UserUpdate,
    TokenResponse,
    AdminUserUpdate
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


@router.post("/register", response_model=UserResponse, status_code=201)
def register_user(
    user_data: RegisterUser,
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
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    return user_service.get_all_users(db)


@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: str,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
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


@router.put("/me", response_model=UserResponse)
def update_me(
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    try:
        user = user_service.update_user(
            db,
            current_user.id,
            user_data
        )
    except ValueError as error:
        status_code = 400

        if str(error) == "Email already exists":
            status_code = 409

        raise HTTPException(
            status_code=status_code,
            detail=str(error)
        )
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


@router.put("/{user_id}", response_model=UserResponse)
def update_any_user(
    user_id: str,
    user_data: AdminUserUpdate,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
):
    try:
        user = user_service.update_user(
            db,
            user_id,
            user_data
        )
    except ValueError as error:
        status_code = 400

        if str(error) == "Email already exists":
            status_code = 409

        raise HTTPException(
            status_code=status_code,
            detail=str(error)
        )
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


@router.delete("/me")
def delete_me(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)):
    user = user_service.delete_user(
        db,
        current_user.id
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "message": "Account deleted successfully"
    }


@router.delete("/{user_id}")
def delete_user(
    user_id: str,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin)
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