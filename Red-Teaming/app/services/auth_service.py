from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from jose import JWTError

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


class AuthService:

    def hash_password(self, password: str):
        return pwd_context.hash(password)

    def verify_password(
        self,
        plain_password: str,
        hashed_password: str
    ):
        return pwd_context.verify(
            plain_password,
            hashed_password
        )
    
    def create_access_token(self, data: dict):
        to_encode = data.copy()

        expire = datetime.utcnow() + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )

        to_encode.update({
            "exp": expire
        })

        return jwt.encode(
            to_encode,
            SECRET_KEY,
            algorithm=ALGORITHM
        )
    
    def decode_access_token(self, token: str):
        try:
            payload = jwt.decode(
                token,
                SECRET_KEY,
                algorithms=[ALGORITHM]
            )
            return payload

        except JWTError:
            return None