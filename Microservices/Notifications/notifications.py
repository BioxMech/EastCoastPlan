from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
import json
import os
import amqp_setup
from invokes import invoke_http

monitorBindingKey='*.notifications'

app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://is213@localhost:3306/notifications'

# to fix the kong bug
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)

CORS(app)

class Notifications(db.Model):
    __tablename__ = 'notifications'

    notification_id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(1000), nullable=False)
    account_type = db.Column(db.String(10), nullable=False)
    facility_name = db.Column(db.String(64), nullable=False) 

    def __init__(self, message, account_type, facility_name):

        self.message = message
        self.account_type = account_type
        self.facility_name = facility_name

    def json(self):
        return {"notification_id": self.notification_id, "message": self.message, "account_type": self.account_type, "facility_name": self.facility_name}



def receiveNotifications ():
    amqp_setup.check_setup()
    
    #queue_name = "User"
    # set up a consumer and start to wait for coming messages
    amqp_setup.channel.basic_consume(queue="Admin", on_message_callback=callback, auto_ack=True)
    amqp_setup.channel.basic_consume(queue="User", on_message_callback=callback, auto_ack=True)
    
    amqp_setup.channel.start_consuming() # an implicit loop waiting to receive messages; 
    #it doesn't exit by default. Use Ctrl+C in the command window to terminate it.  

def callback(channel, method, properties, body): # required signature for the callback; no return
    print("\nReceived a message by " + __file__)
    processNotifications(body)
    print() 

def processNotifications(notificationMsg):
    print("Printing the notification:")
    try:
        notification = json.loads(notificationMsg)
        print("--JSON:", notification)
        #call the invoke(create_noti + admin/user, post, json=data)
        #invoke_http("http://localhost:5007/notifications/admin", method='POST', json=notification["data"])

    except Exception as e:
        print("--NOT JSON:", e)
        print("--DATA:", notificationMsg)
    print()


#retrieve all user/admin notification
#limit by 5 only
@app.route("/notifications/<string:account_type>", methods=['GET'])
def get_notifications(account_type):
    notificationList = Notifications.query.filter_by(account_type = account_type).order_by(Notifications.notification_id.desc()).limit(5).all()
    
    if len(notificationList):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "notifications": [notifications.json() for notifications in notificationList]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no such notifications."
        }
    ), 404


# #insert into notification
@app.route("/notifications/<string:account_type>", methods=['POST'])
def create_notification(account_type):
    
    data = request.get_json()
    
    message = data['message']
    facility_name = data['facility_name']
    print("ACCOUNT_TYPE HERE: " + str(account_type))
    print("DATA HERE: " + str(message))
    notifications = Notifications(account_type = account_type, message = message, facility_name = facility_name)
    
    try:
        db.session.add(notifications)
        db.session.commit()

    except Exception as e:
        print (e)
        return jsonify(
            {
                "code": 500,
                "data": {
                    "account_type": account_type
                },
                "message": "An error occurred creating the notifications."
            }
        ), 500

    return jsonify(
        {   #SUCCESS
            "code": 201,
            "data": notifications.json()
        }
    ), 201


if __name__ == '__main__':
    app.run(port=5007, debug=True)
    print("\nThis is " + os.path.basename(__file__), end='')
    print(": monitoring routing key '{}' in exchange '{}' ...".format(monitorBindingKey, amqp_setup.exchangename))
    receiveNotifications()
    
    


    
