from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from sqlalchemy.exc import IntegrityError

from app.companies.database_models.company_user import CompanyUser

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY is missing from environment variables")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


class CompanyAuthService:
    def hash_password(self, password: str):
        return pwd_context.hash(password)

    def verify_password(self, plain_password: str, hashed_password: str):
        return pwd_context.verify(plain_password, hashed_password)

    def create_access_token(self, data: dict):
        to_encode = data.copy()

        expire = datetime.utcnow() + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )

        to_encode.update({"exp": expire})

        return jwt.encode(
            to_encode,
            SECRET_KEY,
            algorithm=ALGORITHM
        )

    def decode_access_token(self, token: str):
        try:
            return jwt.decode(
                token,
                SECRET_KEY,
                algorithms=[ALGORITHM]
            )
        except JWTError:
            return None

    def register_company_user(self, db, user_data):
        existing_user = db.query(CompanyUser).filter(
            CompanyUser.email == user_data.email
        ).first()

        if existing_user:
            return None

        company_user = CompanyUser(
            full_name=user_data.full_name,
            company_name=user_data.company_name,
            email=user_data.email,
            password_hash=self.hash_password(user_data.password),
            role="company_admin"
        )

        try:
            db.add(company_user)
            db.commit()
            db.refresh(company_user)
        except IntegrityError:
            db.rollback()
            return None

        return company_user

    def get_user_by_email(self, db, email: str):
        return db.query(CompanyUser).filter(
            CompanyUser.email == email
        ).first()

    def get_user_by_id(self, db, user_id: str):
        return db.query(CompanyUser).filter(
            CompanyUser.id == user_id
        ).first()