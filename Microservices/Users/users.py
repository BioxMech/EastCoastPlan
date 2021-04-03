from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL') 
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/EastCoastPlan'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Users(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True, AUTO_INCREMENT=True)
    email = db.Column(db.String(99), nullable=False)
    password = db.Column(db.String(30), nullable=False)
    account_type = db.Column(db.String(10), nullable=False)

    def __init__(self, email, password, account_type):
        
        self.email = email
        self.password = password
        self.account_type = account_type

    def json(self):
        return {"user_id": self.user_id, "email": self.email, "password": self.password, "account_type": self.account_type}


@app.route("/users")
def get_users():
	userList = Users.query.all()
	if len(userList):
	     return jsonify(
            {
                "code": 200,
                "data": {
                    "users": [users.json() for users in userList]
                }
            }
        )
	return jsonify(
        {
            "code": 404,
            "message": "There are no users."
        }
    ), 404

@app.route("/users/<string:email>")
def get_password(email):
	users = Users.query.filter_by(email=email).first()
	if users:
		return jsonify(
            {
                "code": 200,
                "data": users.json()
            }
        )
	return jsonify(
        {
            "code": 404,
            "message": "User not found."
        }
    ), 404


@app.route("/users/<string:email>")
def get_user_type(email):
	pass

@app.route("/users/<string:email>", methods=['POST'])
def create_user(email):
	if (Users.query.filter_by(email=email).first()):
		return jsonify(
            {
                "code": 400,
                "data": {
                    "email": email
                },
                "message": "User already exists."
            }
        ), 400

	data = request.get_json()
	print("EMAIL HERE: " + str(email))
	print("DATA HERE: " + str(data))
	users = Users(email, **data)
	
	try:
		db.session.add(users)
		db.session.commit()
	except:
		return jsonify(
            {
                "code": 500,
                "data": {
                    "email": email
                },
                "message": "An error occurred creating the user."
            }
        ), 500

	return jsonify(
        {
            "code": 201,
            "data": users.json()
        }
    ), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
    #app.run(port=5000, debug=True)