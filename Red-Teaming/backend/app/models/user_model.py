# اليوزر رح يرفع 3 اشياء : 
# API URL
# API KEY
# MODEL NAME
import requests
from app.models.base_model import BaseModel


class UserModel(BaseModel):

    def __init__(
        self,
        endpoint_url,
        api_key=None,
        model_name="user-model"
    ):
        self.endpoint_url = endpoint_url
        self.api_key = api_key
        self.model_name = model_name

    def generate(self, prompt):
        headers = {
            "Content-Type": "application/json"
        }

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

        data = response.json()

        if "choices" in data:
            return data["choices"][0]["message"]["content"]

        if "response" in data:
            return data["response"]

        if "text" in data:
            return data["text"]

        return response.text