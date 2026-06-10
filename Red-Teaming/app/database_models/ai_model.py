#maybe skip the whole file
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database_models.base_model import BaseModel


class AIModel(BaseModel):
    __tablename__ = "ai_models"

    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    name = Column(String(100), nullable=False)          
    provider = Column(String(50), nullable=False)       
    endpoint_url = Column(String(500), nullable=True)  
    model_name = Column(String(100), nullable=False)   
    owner = relationship("User", back_populates="ai_models")