from fastapi import FastAPI

from App.extensions import Base, engine
from App.database_models import User
from App.routes.user_routes import router as user_router



Base.metadata.create_all(bind=engine)
app = FastAPI(title="Red Teaming Platform")
app.include_router(user_router)




@app.get("/")
def home():
    return {"message": "Red Teaming Platform API is running"}
