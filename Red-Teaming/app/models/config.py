# Centralized configuration for model providers and environment variables.
# API keys are loaded from .env 
from dotenv import load_dotenv
import os

load_dotenv()

# Groq
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

GROQ_LLAMA_MODEL = os.getenv(
    "GROQ_LLAMA_MODEL",
    "llama-3.1-8b-instant"
)

GROQ_GPT_MODEL = os.getenv(
    "GROQ_GPT_MODEL",
    "openai/gpt-oss-20b"
)

# OpenRouter
OPENROUTER_API_KEY = os.getenv(
    "OPENROUTER_API_KEY"
)

OPENROUTER_GEMMA_MODEL = os.getenv(
    "OPENROUTER_GEMMA_MODEL",
    "google/gemma-4-31b-it:free"
)

OPENROUTER_JUDGE_MODEL = os.getenv(
    "OPENROUTER_JUDGE_MODEL",
    "qwen/qwen3-32b"
)
# باختصار الشرح مثل خذ قيمة GEMINI_API_KEY من ملف .env وخزنها داخل متغير