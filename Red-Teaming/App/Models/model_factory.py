from app.models.ollamaModel import OllamaModel
from app.models.openAiModel import OpenAIModel
from app.models.geminiModel import GeminiModel
from app.models.groqModel import GroqModel
from app.models.userModel import UserModel
from app.models.config import (
    GEMINI_API_KEY,
    OPENAI_API_KEY,
    GROQ_API_KEY
)

def get_model(
        model_type,
        **kwargs
):

    if model_type == "llama":
        return OllamaModel()
    
    elif model_type == "llama_groq":
        return GroqModel(
            api_key=kwargs.get("api_key") or GROQ_API_KEY
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
        raise ValueError(
            "Unsupported model type"
        )