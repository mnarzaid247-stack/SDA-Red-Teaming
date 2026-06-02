from pydantic import BaseModel
from typing import List, Optional


class AttackRunRequest(BaseModel):
    model_type: str
    selected_attack_types: List[str]
    endpoint_url: Optional[str] = None
    api_key: Optional[str] = None
    max_scenarios_per_attack: int = 5


class AttackRunResponse(BaseModel):
    attack_run_id: str
    status: str