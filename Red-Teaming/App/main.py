from fastapi import FastAPI

app = FastAPI(title="Red Teaming Platform")


@app.get("/")
def home():
    return {"message": "Red Teaming Platform API is running"}