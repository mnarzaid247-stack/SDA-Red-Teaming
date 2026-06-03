from sqlalchemy import Column, String, Text
from app.database_models.base_model import BaseModel


class Scenario(BaseModel):
    __tablename__ = "scenarios"

    attack_type = Column(String(50), nullable=False)
    prompt = Column(Text, nullable=False)
    expected_behavior = Column(Text, nullable=False)
    severity = Column(String(20), nullable=False)
    scenario_code = Column(String(20), nullable=False, unique=True)