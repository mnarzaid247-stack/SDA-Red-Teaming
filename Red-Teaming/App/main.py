from fastapi import FastAPI
from app.extensions import Base, engine
from app.database_models import User
from app.routes.user_routes import router as user_router

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Red Teaming Platform")
app.include_router(user_router)


@app.get("/")
def home():
    return {"message": "Red Teaming Platform API is running"}