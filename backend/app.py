from faker import Faker
from flask import Flask, request
from flask_cors import CORS
from sqlalchemy.sql import text

from models import db, User, UsersResponse

fake = Faker()


def create_app():
    _app = Flask(__name__)
    _app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    _app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(_app)
    with _app.app_context():
        db.drop_all()
        db.create_all()
    return _app


app = create_app()

CORS(app)

@app.route("/users", methods=["POST"])
def create_users_batch():
    with app.app_context():
        for x in range(10):
            db.session.add(User(name=fake.name(), skill=fake.boolean()))
        db.session.commit()
    return "Users created", 201


@app.route("/users", methods=["DELETE"])
def delete_all_users():
    with app.app_context():
        User.query.delete()
        db.session.commit()
    return "Users deleted"


@app.route("/users", methods=["GET"])
def users():
    with app.app_context():
        skill = request.args.get('skill') #parameters default is not boolean, nor string but integer (0/1)
        filters = ""
        if skill:
            filters = "skill='" + str(skill) + "'"
        results = User.query.filter(text(filters)).all()
    return UsersResponse(items=results).json()


#@app.route("/users", methods=["PUT"])
#def users():
#    with app.app_context():
#        id = request.args.get('id')
#        if id:
#            User.query.get(id)


#    return "added Skill for user {id}", id




if __name__ == "__main__":
    app.run()
