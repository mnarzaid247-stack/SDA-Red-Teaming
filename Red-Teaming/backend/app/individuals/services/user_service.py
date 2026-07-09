from app.individuals.database_models.user import User
from app.individuals.services.auth_service import AuthService
from sqlalchemy.exc import IntegrityError

class UserService:
    auth_service = AuthService()
    def create_user(self, db, user_data):
        existing_user = db.query(User).filter(
            User.email == user_data.email
        ).first()

        if existing_user:
            return None

        user = User(
            full_name=user_data.full_name,
            email=user_data.email,
            password_hash=self.auth_service.hash_password(
                user_data.password
            ),
            role="user"
        )

        try:
            db.add(user)
            db.commit()
            db.refresh(user)
        except IntegrityError:
            db.rollback()
            return None

        return user

    def get_all_users(self, db):
        return db.query(User).all()

    def get_user_by_id(self, db, user_id):
        return db.query(User).filter(
            User.id == user_id
        ).first()

    
    def get_user_by_email(self, db, email):
        return db.query(User).filter(
            User.email == email
        ).first()

    
    def update_user(self, db, user_id, user_data):
        user = self.get_user_by_id(db, user_id)

        if not user:
            return None

        update_data = user_data.model_dump(exclude_unset=True)
        if not update_data:
            raise ValueError("No update data provided")
        
        new_email = update_data.get("email")

        if new_email and new_email != user.email:
            existing_user = self.get_user_by_email(db, new_email)

            if existing_user:
                raise ValueError("Email already exists")

        for key, value in update_data.items():
            setattr(user, key, value)

        try:
            db.commit()
            db.refresh(user)
        except IntegrityError:
            db.rollback()
            raise ValueError("Email already exists")

        return user
    

    def delete_user(self, db, user_id):
        user = self.get_user_by_id(db, user_id)

        if not user:
            return None

        db.delete(user)
        db.commit()

        return user