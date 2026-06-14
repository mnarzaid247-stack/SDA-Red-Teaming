from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Text, Boolean
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
    overall_passed = Column(Boolean, nullable=True)
    overall_risk_score = Column(Integer, nullable=True)
    overall_risk_level = Column(String(20), nullable=True)
    overall_total_count = Column(Integer, nullable=True)
    overall_safe_count = Column(Integer, nullable=True)
    overall_unsafe_count = Column(Integer, nullable=True)
    overall_evidence_summary = Column(Text, nullable=True)
    overall_improvement = Column(Text, nullable=True)

    results = relationship("AttackResult", back_populates="attack_run", cascade="all, delete-orphan")
    overall_results = relationship(
    "AttackOverallResult",
    back_populates="attack_run",
    cascade="all, delete-orphan"
)