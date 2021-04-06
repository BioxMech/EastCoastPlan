from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
import json
import os
from passlib.hash import sha256_crypt

#import pika
#import amqp_setup

#monitorBindingKey='*.notifications'

app = Flask(__name__)

print(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://is213@localhost:3306/users'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# to fix the kong bug
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)

CORS(app)

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

# class Notifications(db.Model):
#     __tablename__ = 'notifications'

#     notification_id = db.Column(db.Integer, primary_key=True, AUTO_INCREMENT=True)
#     message = db.Column(db.String(1000), nullable=False)
#     account_type = db.Column(db.String(10), nullable=False)

#     def __init__(self, message, account_type):

#         self.message = message
#         self.account_type = account_type

#     def json(self):
#         return {"notification_id": self.notification_id, "message": self.message, "account_type": self.account_type}


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
def get_user(email):
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


@app.route("/users/verify/<string:email>", methods=['POST'])
def verify_user(email):
    users = Users.query.filter_by(email=email).first()
    data = request.get_json()
    
    if data != None:
        enteredPw = data['password']

    else:
        return jsonify(
            {
                "code": 400,
                "data": {
                    "message": "No password was entered."
                },
                
            }, 400
        )
    return jsonify(
        {
            "result": sha256_crypt.verify(enteredPw, users.password)
        }

    )
   
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
    print(data)

    print("EMAIL HERE: " + str(email))
    print("DATA HERE: " + str(data))
    users = Users(email, **data)
    

    users.password = sha256_crypt.encrypt(users.password)
    
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




# #retrieve all user/admin notification
# @app.route("/notifications/<string:account_type>", methods=['GET'])
# def get_notifications(account_type):
#     print(account_type)
#     notificationList = Notifications.query.filter_by(account_type = account_type).all()
#     #resource_list = Facility.query.filter_by(schedule_id=schedule_id).all()
    
#     if len(notificationList):
#         return jsonify(
#             {
#                 "code": 200,
#                 "data": {
#                     "notifications": [notifications.json() for notifications in notificationList]
#                 }
#             }
#         )
#     return jsonify(
#         {
#             "code": 404,
#             "message": "There are no such notifications."
#         }
#     ), 404

# #insert into notification
# @app.route("/notifications/<string:account_type>", methods=['POST'])
# def create_notification(account_type):

#     data = request.get_json()
    
#     message = data['message']
#     print(message)
#     print("ACCOUNT_TYPE HERE: " + str(account_type))
#     print("DATA HERE: " + str(message))
#     notifications = Notifications(account_type = account_type, message = message)
    
#     try:
#         db.session.add(notifications)
#         db.session.commit()

#     except:

#         return jsonify(
#             {
#                 "code": 500,
#                 "data": {
#                     "account_type": account_type
#                 },
#                 "message": "An error occurred creating the notifications."
#             }
#         ), 500

#     return jsonify(
#         {
#             "code": 201,
#             "data": notifications.json()
#         }
#     ), 201

# def receiveNotifications ():
#     amqp_setup.check_setup()
    
#     queue_name = "Notifications"

#     # set up a consumer and start to wait for coming messages
#     amqp_setup.channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)
#     amqp_setup.channel.start_consuming() # an implicit loop waiting to receive messages; 
#     #it doesn't exit by default. Use Ctrl+C in the command window to terminate it.  


# def callback(channel, method, properties, body): # required signature for the callback; no return
#     print("\nReceived a message by " + __file__)
#     processNotifications(body)
#     print() # print a new line feed

# def processNotifications(notificationMsg):
#     print("Printing the notification:")
#     try:
#         notification = json.loads(notificationMsg)
#         print("--JSON:", notification)
#     except Exception as e:
#         print("--NOT JSON:", e)
#         print("--DATA:", notificationMsg)
#     print()

if __name__ == '__main__':
    # print("\nThis is " + os.path.basename(__file__), end='')
    # print(": monitoring routing key '{}' in exchange '{}' ...".format(monitorBindingKey, amqp_setup.exchangename))
    # print("xxasdasasdasdasdasd")
    # receiveNotifications()
    app.run(host='0.0.0.0', port=5001, debug=True)
    # app.run(port=5000, debug=True)
    


    
