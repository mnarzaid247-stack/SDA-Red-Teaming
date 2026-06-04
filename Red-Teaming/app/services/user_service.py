from app.database_models.user import User

class UserService:

    def create_user(self, db, user_data):
        existing_user = db.query(User).filter(
            User.email == user_data.email
        ).first()

        if existing_user:
            return None

        user = User(
            full_name=user_data.full_name,
            email=user_data.email,
            password_hash=user_data.password,
            role=user_data.role
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user

    def get_all_users(self, db):
        return db.query(User).all()

    def get_user_by_id(self, db, user_id):
        return db.query(User).filter(
            User.id == user_id
        ).first()

    def delete_user(self, db, user_id):
        user = self.get_user_by_id(db, user_id)

        if not user:
            return None

        db.delete(user)
        db.commit()

        return user
    
    def update_user(self, db, user_id, user_data):
        user = self.get_user_by_id(db, user_id)

        if not user:
            return None

        update_data = user_data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(user, key, value)

        db.commit()
        db.refresh(user)

        return user