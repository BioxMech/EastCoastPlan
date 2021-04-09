from flask import Flask, request, jsonify
from flask_cors import CORS

import os, sys

import requests

from invokes import invoke_http

import amqp_setup

import json
import pika

app = Flask(__name__)
CORS(app)

notifications_URL = "http://localhost:5007/notifications/"
facilities_URL = "http://localhost:5002/updateAvailability/"

@app.route("/edit_facility", methods=['POST'])
def edit_facility():
    data = request.get_json()

    if request.is_json:
        try:
        
            print("\nReceived facility in JSON:", data)

            #returns the whole facilty in JSON
            result = processEditFacility(data)
            return(jsonify(result))
            code = result["code"]
            message = json.dumps(result)
            print (code)
            print (message)
            if (code == 200):
                print('\n\n-----Publishing the (notifications) message with routing_key=user.notifications-----')
                amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="user.notifications", body=message) 
                
                result2 = processStoreNotification(result, data)
                return(jsonify(result2))
                

        except Exception as e:
            pass  # do nothing.

    # if reached here, not a JSON request.
    return jsonify({
        "code": 400,
        "message": "Invalid JSON input: " + str(request.get_data())
    }), 400

#update availability based on id
def processEditFacility(facilities):
    facility_id = facilities["facility_id"]
    print(facility_id)
    print("facility_id")
    print(facilities_URL)
    print('\n-----Invoking facilities microservice-----')
    facilities_result = invoke_http(facilities_URL + facility_id, method='PUT', json=facilities)
    return(facilities_result)

#insert into database (notification)
def processStoreNotification(facilities, data):
    facility_name = facilities["data"]["facility_name"]
    data["facility_name"] = facility_name
    print('\n-----Invoking notifications microservice-----')
    notifications_result = invoke_http(notifications_URL + "admin", method='POST', json=data)
    return (notifications_result)
    
# Execute this program if it is run as a main script (not by 'import')
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5006, debug=True)