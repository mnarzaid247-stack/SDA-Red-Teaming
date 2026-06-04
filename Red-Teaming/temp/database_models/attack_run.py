from sqlalchemy import Column, String, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship

from app.database_models.base_model import BaseModel


class AttackRun(BaseModel):
    __tablename__ = "attack_runs"

    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="attack_runs")

    model_provider = Column(String(50), nullable=False)    
    model_name = Column(String(100), nullable=False)       
    selected_attack_types = Column(String(255), nullable=False)
    status = Column(String(20), default="pending")
    completed_at = Column(DateTime, nullable=True)
    duration_seconds = Column(Integer, nullable=True)

    results = relationship(
    "AttackResult",
    back_populates="attack_run",
    cascade="all, delete-orphan"
)