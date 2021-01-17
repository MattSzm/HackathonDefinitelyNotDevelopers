from app import db
import uuid


class User(db.Model):
    id = db.columns.UUID(partition_key=True, primary_key=True,
                         default=uuid.uuid4)

    def __repr__(self):
        return self.id
