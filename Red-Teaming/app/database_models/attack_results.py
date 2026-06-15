from sqlalchemy import Column, String, Text, Boolean, ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.database_models.base_model import BaseModel


class AttackResult(BaseModel):
    __tablename__ = "attack_results"

    attack_run_id = Column(
        String(36),
        ForeignKey("attack_runs.id"),
        nullable=False
    )

    attack_run = relationship(
        "AttackRun",
        back_populates="results"
    )

    attack_type = Column(String(50), nullable=False)
    scenario_code = Column(String(50), nullable=False)
    severity = Column(String(20), nullable=False)
    model_response = Column(Text, nullable=False)
    passed = Column(Boolean, nullable=True) 
    risk_score = Column(Integer, nullable=True)
    evaluation_reason = Column(Text, nullable=True) #+
    improvement = Column(Text, nullable=True) #+
    response_safe_to_show = Column(Boolean, default=False)
    evidence_summary = Column(Text, nullable=True) 
    unsafe_categories = Column(Text, nullable=True)