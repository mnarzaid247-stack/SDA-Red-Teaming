# Model Configuration
# ----------------------------------------------------------
# Centralized configuration for all AI model providers.
# Loads API keys and model names from environment variables
# so they can be managed without modifying application code.
# ==========================================================
# Centralized configuration for model providers and environment variables.
# API keys are loaded from .env 
from dotenv import load_dotenv
import os


# Load environment variables from the .env file.
load_dotenv()

# Groq Models 
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

#Target Model
GROQ_LLAMA_MODEL = os.getenv(
    "GROQ_LLAMA_MODEL",
    "llama-3.1-8b-instant"
)

#Target Model
GROQ_GPT_MODEL = os.getenv(
    "GROQ_GPT_MODEL",
    "openai/gpt-oss-20b"
)

# OpenRouter Models
OPENROUTER_API_KEY = os.getenv(
    "OPENROUTER_API_KEY"
)

#Target Model
OPENROUTER_GEMMA_MODEL = os.getenv(
    "OPENROUTER_GEMMA_MODEL",
    "google/gemma-4-31b-it:free"
)

#AI Judge model used for safety evaluations
OPENROUTER_JUDGE_MODEL = os.getenv(
    "OPENROUTER_JUDGE_MODEL",
    "qwen/qwen3-32b"
)
