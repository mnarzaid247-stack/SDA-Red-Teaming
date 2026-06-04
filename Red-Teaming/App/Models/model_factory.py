from app.models.openai_model import OpenAIModel
from app.models.gemini_model import GeminiModel
from app.models.groq_model import GroqModel
from app.models.user_model import UserModel

from app.models.config import (
    GEMINI_API_KEY,
    OPENAI_API_KEY,
    GROQ_API_KEY,
    GROQ_MODEL_NAME
)


def get_model(model_type, **kwargs):

    if model_type == "llama":
        return GroqModel(
            api_key=kwargs.get("api_key") or GROQ_API_KEY,
            model_name=kwargs.get("model_name") or GROQ_MODEL_NAME
# Llama is served through Groq API instead of local Ollama for deployment compatibility
        )

    elif model_type == "gpt":
        return OpenAIModel(
            api_key=kwargs.get("api_key") or OPENAI_API_KEY
        )

    elif model_type == "gemini":
        return GeminiModel(
            api_key=kwargs.get("api_key") or GEMINI_API_KEY
        )

    elif model_type == "user":
        return UserModel(
            endpoint_url=kwargs["endpoint_url"],
            api_key=kwargs.get("api_key")
        )

    else:
        raise ValueError("Unsupported model type")