from app.individuals.database_models.attack_run import AttackRun
from sqlalchemy.orm import Session


class ReportService:
    def get_report_cards(
            self,
            db,
            current_user,
            attack_type=None,
            model_provider=None,
            model_name=None,
            risk_level=None
        ):
            query = db.query(AttackRun)

            if current_user.role != "admin":
                query = query.filter(
                    AttackRun.user_id == current_user.id
                )

            if attack_type:
                query = query.filter(
                    AttackRun.selected_attack_types.ilike(f"%{attack_type}%")
                )

            if model_provider:
                query = query.filter(
                    AttackRun.model_provider.ilike(f"%{model_provider}%")
                )

            if model_name:
                query = query.filter(
                    AttackRun.model_name.ilike(f"%{model_name}%")
                )

            if risk_level:
                query = query.filter(
                    AttackRun.overall_risk_level.ilike(f"%{risk_level}%")
                )

            return query.order_by(
                AttackRun.created_at.desc()
            ).all()
    

    def get_attack_run_by_id(self, db, attack_run_id):
        return db.query(AttackRun).filter(
            AttackRun.id == attack_run_id
        ).first()
    
    def get_all_attack_runs(self, db: Session):
        return (
            db.query(AttackRun)
            .order_by(AttackRun.created_at.desc())
            .all()
        )