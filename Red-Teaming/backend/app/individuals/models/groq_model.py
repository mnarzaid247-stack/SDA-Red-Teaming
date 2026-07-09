# Groq Model Integration
# ----------------------------------------------------------
# Provides a unified interface for interacting with models
# hosted on Groq. This implementation uses Groq's
# OpenAI-compatible API and returns generated responses
# through the common BaseModel interface.
# ==========================================================
from openai import OpenAI
from app.individuals.models.base_model import BaseModel


# Implementation of the BaseModel interface using Groq.
class GroqModel(BaseModel):

# Initializes the Groq client and stores the target model name.
    def __init__(self, api_key, model_name):
# Groq provides an OpenAI-compatible API endpoint.
        self.client = OpenAI(
            api_key=api_key,
            base_url="https://api.groq.com/openai/v1"
        )
        self.model_name = model_name

    def generate(self, prompt):

# Generate a model response using the chat completion endpoint.
        response = self.client.chat.completions.create(
            model=self.model_name,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=500,
            temperature=0.2
        )


# Return only the generated text content.
        return response.choices[0].message.content
