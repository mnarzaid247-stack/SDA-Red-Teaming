from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class AttackRiskDistributionItem(BaseModel):
    attack_type: str
    successful_scenarios: int
    percentage: float


class TotalScenarioCountResponse(BaseModel):
    total_scenarios: int


class LastAttackRunResponse(BaseModel):
    last_attack_at: Optional[datetime] = None
    message: str