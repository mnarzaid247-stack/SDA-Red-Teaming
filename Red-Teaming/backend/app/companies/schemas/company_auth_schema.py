from pydantic import BaseModel, EmailStr, Field, field_validator
import re


class CompanyRegister(BaseModel):
    full_name: str = Field(min_length=2, max_length=100)
    company_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=64, examples=["MyPassword123!"])

    @field_validator("password")
    @classmethod
    def validate_password(cls, value):
        if not re.search(r"[A-Z]", value):
            raise ValueError("Password must contain at least one uppercase letter")

        if not re.search(r"[a-z]", value):
            raise ValueError("Password must contain at least one lowercase letter")

        if not re.search(r"\d", value):
            raise ValueError("Password must contain at least one number")

        return value


class CompanyLogin(BaseModel):
    email: EmailStr
    password: str


class CompanyTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class CompanyUserResponse(BaseModel):
    id: str
    full_name: str
    company_name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True