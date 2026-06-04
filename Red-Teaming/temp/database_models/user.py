from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from app.database_models.base_model import BaseModel


class User(BaseModel):
    __tablename__ = "users"

    full_name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), default="user")
    attack_runs = relationship(
    "AttackRun",
    back_populates="user",
    cascade="all, delete-orphan"
)
    
    ai_models = relationship(
    "AIModel",
    back_populates="owner",
    cascade="all, delete-orphan"
)