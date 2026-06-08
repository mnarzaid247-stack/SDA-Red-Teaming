from dataclasses import dataclass
from typing import Optional

"""
Defines the base Scenario model used across all attack types.

This keeps the structure consistent so every scenario has the same fields,
and makes it easier for the engine and reporting layer to work with them.
"""




# Simple container for a single scenario.
# Each scenario includes the prompt being tested, the expected safe behavior,
# and a severity level. The ID is added later by the library.

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

