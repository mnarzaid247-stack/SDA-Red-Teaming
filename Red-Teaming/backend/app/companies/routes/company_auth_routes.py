from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.extensions import get_db
from app.companies.schemas.company_auth_schema import (
    CompanyRegister,
    CompanyLogin,
    CompanyTokenResponse,
    CompanyUserResponse
)
from app.companies.services.company_auth_service import CompanyAuthService
from app.companies.dependencies.company_auth_dependencies import get_current_company_user

router = APIRouter(
    prefix="/companies/auth",
    tags=["Company Auth"]
)

company_auth_service = CompanyAuthService()


@router.post("/register", response_model=CompanyUserResponse, status_code=201)
def register_company_user(
    user_data: CompanyRegister,
    db: Session = Depends(get_db)
):
    user = company_auth_service.register_company_user(db, user_data)

    if not user:
        raise HTTPException(
            status_code=409,
            detail="Company user email already exists"
        )

    return user


@router.post("/login", response_model=CompanyTokenResponse)
def login_company_user(
    login_data: CompanyLogin,
    db: Session = Depends(get_db)
):
    user = company_auth_service.get_user_by_email(
        db,
        login_data.email
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    is_valid_password = company_auth_service.verify_password(
        login_data.password,
        user.password_hash
    )

    if not is_valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = company_auth_service.create_access_token(
        data={
            "sub": user.id,
            "email": user.email,
            "role": user.role,
            "type": "company"
        }
    )

    return CompanyTokenResponse(
        access_token=access_token,
        token_type="bearer"
    )


@router.get("/me", response_model=CompanyUserResponse)
def get_company_me(
    current_user = Depends(get_current_company_user)
):
    return current_user