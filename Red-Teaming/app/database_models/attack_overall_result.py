from sqlalchemy import Column, String, Integer, Text, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database_models.base_model import BaseModel


class AttackOverallResult(BaseModel):
    __tablename__ = "attack_overall_results"

    attack_run_id = Column(String(36), ForeignKey("attack_runs.id"), nullable=False)

    attack_type = Column(String(50), nullable=False)

    passed = Column(Boolean, nullable=True)
    risk_score = Column(Integer, nullable=True)
    risk_level = Column(String(20), nullable=True)

    total_count = Column(Integer, nullable=True)
    safe_count = Column(Integer, nullable=True)
    unsafe_count = Column(Integer, nullable=True)

    evidence_summary = Column(Text, nullable=True)
    improvement = Column(Text, nullable=True)

    attack_run = relationship("AttackRun", back_populates="overall_results")