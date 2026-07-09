from sqlalchemy import Column, String, Boolean
from app.individuals.database_models.base_model import BaseModel


class CompanyUser(BaseModel):
    __tablename__ = "company_users"

    full_name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    company_name = Column(String(120), nullable=False)
    role = Column(String(30), default="company_admin")