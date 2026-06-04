from dataclasses import dataclass
from typing import Optional


@dataclass
class Scenario:

    prompt: str
    expected_behavior: str
    severity: str
    id: Optional[str] = None


def add_ids(prefix, scenarios):
    for index, scenario in enumerate(scenarios, start=1):
        scenario.id = f"{prefix}-{index:03}"
    return scenarios

