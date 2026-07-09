
"""
This file defines all attack types used across the project.

The idea is to keep the attack names in one place so the rest of the system
(scenarios, scoring, engine) can reference them consistently. If we ever add
a new attack, we only update this file.

"""

class AttackTypes:

    """
    Centralized list of attack identifiers.
    These values act as keys throughout the system.
    """
     
    PROMPT_INJECTION = "prompt_injection"
    JAILBREAK = "jailbreak"
    DATA_LEAKAGE = "data_leakage"
    TOXICITY = "toxicity"
    HALLUCINATION = "hallucination"  
    TOOL_MISUSE = "tool_misuse"          

# List of all supported attacks.
# Keeping this as a separate list makes it easier to loop through them when needed.

ATTACKS = [
    AttackTypes.PROMPT_INJECTION,
    AttackTypes.JAILBREAK,
    AttackTypes.DATA_LEAKAGE,
    AttackTypes.TOXICITY,
    AttackTypes.HALLUCINATION,
    AttackTypes.TOOL_MISUSE
    
]

# Future attacks can be added here if needed.
# Example:
# MODEL_EXTRACTION = "model_extraction"
# ROLEPLAY_ABUSE = "roleplay_abuse"
