from App.Models.ollamaModel import OllamaModel
from App.Models.openAiModel import OpenAIModel
from App.Models.geminiModel import GeminiModel
from App.Models.userModel import UserModel
from App.Models.config import (
    GEMINI_API_KEY,
    OPENAI_API_KEY
)

def get_model(
        model_type,
        **kwargs
):

    if model_type == "llama":
        return OllamaModel()

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
    


    # هذا الملف لأنشاء النموذج المطلوب بدل من تكرار الكود في كل ملف