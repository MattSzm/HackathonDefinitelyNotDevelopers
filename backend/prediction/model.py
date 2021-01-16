from app import db
import uuid


class Prediction(db.Model):
    user = db.columns.UUID(primary_key=True)
    id = db.columns.UUID(primary_key=True, clustering_order='DESC',
                         default=uuid.uuid1)
    content = db.columns.Text()
    category = db.columns.Text()
    prediction = db.columns.Text()
    saved_time = db.columns.Float()
    created_time = db.columns.DateTime()

    def __repr__(self):
        return f'{self.user}/{self.id}'
