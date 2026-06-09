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
    scenario_id = Column(String(50), nullable=False)
    severity = Column(String(20), nullable=False)
    model_response = Column(Text, nullable=True)
    passed = Column(Boolean, nullable=False)
    risk_score = Column(Integer, nullable=True)
    label = Column(String(20), nullable=True) #+
    report_text = Column(Text, nullable=True)  #+
    evaluation_reason = Column(Text, nullable=True) #+
    improvement = Column(Text, nullable=True) #+
    response_safe_to_show = Column(Boolean, default=False)
    evidence_summary = Column(Text, nullable=True) #+ وش الشيء الي اثبت وجود المشكله؟ يعني وش الرد 
    unsafe_categories = Column(Text, nullable=True) #+ 

    

    #يخزن تقييم الجادج لكل سيناريو 