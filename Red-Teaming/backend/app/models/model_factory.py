# Factory function for selecting the correct model provider.
# Maps user-facing model choices to their backend provider implementation.
from app.models.groq_model import GroqModel
from app.models.openrouter_model import OpenRouterModel
from app.models.user_model import UserModel
from app.models.config import (
    GROQ_API_KEY,
    GROQ_LLAMA_MODEL,
    GROQ_GPT_MODEL,
    OPENROUTER_GEMMA_MODEL,
    OPENROUTER_JUDGE_MODEL
)


def get_model(model_type, **kwargs):

    if model_type == "llama":
        return GroqModel(
            api_key=kwargs.get("api_key") or GROQ_API_KEY,
            model_name=kwargs.get("model_name") or GROQ_LLAMA_MODEL
        )

    elif model_type == "gpt":
        return GroqModel(
            api_key=kwargs.get("api_key") or GROQ_API_KEY,
            model_name=kwargs.get("model_name") or GROQ_GPT_MODEL
        )

    elif model_type == "gemma":
        return OpenRouterModel(
            model_name=kwargs.get("model_name") or OPENROUTER_GEMMA_MODEL
        )

    elif model_type == "judge":
        return OpenRouterModel(
            model_name=kwargs.get("model_name") or OPENROUTER_JUDGE_MODEL
        )

    elif model_type == "user":
        endpoint_url = kwargs.get("endpoint_url")

        if not endpoint_url:
            raise ValueError(
                "endpoint_url is required for user model"
            )

        return UserModel(
            endpoint_url=endpoint_url,
            api_key=kwargs.get("api_key")
        )

    else:
        raise ValueError("Unsupported model type")