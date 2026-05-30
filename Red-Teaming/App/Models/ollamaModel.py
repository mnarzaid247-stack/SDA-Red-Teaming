import requests

from App.Models.BaseModel import BaseModel


class OllamaModel(BaseModel):

    def __init__(self, model_name="llama3"):
        self.model_name = model_name

    def generate(self, prompt):

        response = requests.post(
            "http://localhost:11434/api/generate", #The API for llama3
            json={
                "model": self.model_name,
                "prompt": prompt,
                "stream": False
            }
        )

        data = response.json()

        return data["response"]