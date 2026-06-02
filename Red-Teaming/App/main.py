from fastapi import FastAPI

from app.extensions import Base, engine
import app.database_models
from app.routes.user_routes import router as user_router
from app.routes.attack_routes import router as attack_router



Base.metadata.create_all(bind=engine)
app = FastAPI(title="Red Teaming Platform")
app.include_router(user_router)
app.include_router(attack_router)




@app.get("/", tags=['System'])
def home():
    return {"message": "Red Teaming Platform API is running"}
