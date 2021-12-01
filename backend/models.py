from typing import List, Optional

from flask_sqlalchemy import SQLAlchemy
from pydantic import BaseModel

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    skill = db.Column(db.Boolean)

    def __repr__(self):
        return "<User %r>" % self.name


class UserSchema(BaseModel):
    id: int
    name: str
    skill: Optional[bool] #skill, true is displayed with 1, false with 0

    class Config:
        orm_mode = True


class UsersResponse(BaseModel):
    items: List[UserSchema]
