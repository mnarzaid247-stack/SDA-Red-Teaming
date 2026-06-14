from fastapi import FastAPI
from app.seed import seed_database
from app.extensions import Base, engine
import app.database_models
from app.routes.user_routes import router as user_router
from app.routes.attack_routes import router as attack_router
from app.routes.scenario_routes import router as scenario_router
from app.routes import dashboard_routes
from app.routes import report_routes


Base.metadata.create_all(bind=engine)
seed_database()
app = FastAPI(title="Red Teaming Platform")
app.include_router(user_router)
app.include_router(attack_router)
app.include_router(scenario_router)
app.include_router(dashboard_routes.router)
app.include_router(report_routes.router)




@app.get("/", tags=['System'])
def home():
    return {"message": "Red Teaming Platform API is running"}
