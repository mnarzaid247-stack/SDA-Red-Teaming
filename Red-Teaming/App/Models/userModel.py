# اليوزر رح يرفع 3 اشياء : 
# API URL
# API KEY
# MODEL NAME
import requests

from App.Models.BaseModel import BaseModel


class UserModel(BaseModel):

    def __init__(
            self,
            endpoint_url,
            api_key=None
    ):

        self.endpoint_url = endpoint_url
        self.api_key = api_key

    def generate(self, prompt):

        headers = {}

        if self.api_key:
            headers["Authorization"] = (
                f"Bearer {self.api_key}"
            )

        response = requests.post(
            self.endpoint_url,
            headers=headers,
            json={
                "prompt": prompt
            }
        )

        return response.text