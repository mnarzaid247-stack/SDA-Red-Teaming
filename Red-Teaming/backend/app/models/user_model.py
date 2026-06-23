# User Model Integration
# ----------------------------------------------------------
# Allows users to connect their own AI models through a
# custom API endpoint. The system sends prompts to the user
# model and retrieves responses using a unified interface.
# ==========================================================
import requests
from app.models.base_model import BaseModel


# Implementation of the BaseModel interface for user-provided models.
class UserModel(BaseModel):

    # Stores the user model connection details and configuration.
    def __init__(
        self,
        endpoint_url,
        api_key=None,
        model_name="user-model"
    ):
        self.endpoint_url = endpoint_url
        self.api_key = api_key
        self.model_name = model_name

    # Sends a prompt to the user-provided model endpoint
    # and returns the generated response.
    def generate(self, prompt):
        # Default request headers for API communication.
        headers = {
            "Content-Type": "application/json"
        }

        # Add authentication header if an API key was provided.
        if self.api_key:
            headers["Authorization"] = f"Bearer {self.api_key}"

        response = requests.post(
            self.endpoint_url,
            headers=headers,
            json={
                "model": self.model_name,
                "messages": [
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "prompt": prompt
            },
            timeout=60
        )

        response.raise_for_status()

        # Parse the API response into JSON format.
        data = response.json()

        if "choices" in data:
            return data["choices"][0]["message"]["content"]

        if "response" in data:
            return data["response"]

        if "text" in data:
            return data["text"]

        return response.text