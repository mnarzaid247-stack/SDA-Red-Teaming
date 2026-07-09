from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.extensions import get_db
from app.companies.services.company_auth_service import CompanyAuthService

security = HTTPBearer()
company_auth_service = CompanyAuthService()


def get_current_company_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    payload = company_auth_service.decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user_id = payload.get("sub")
    token_type = payload.get("type")

    if not user_id or token_type != "company":
        raise HTTPException(
            status_code=401,
            detail="Invalid company token"
        )

    user = company_auth_service.get_user_by_id(db, user_id)

    if not user :
        raise HTTPException(
            status_code=401,
            detail="Company user not found "
        )

    return user