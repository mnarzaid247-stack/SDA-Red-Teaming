from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: str = "user"


class UserResponse(BaseModel):
    id: str
    full_name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    full_name: str | None = None
    email: EmailStr | None = None
    role: str | None = None