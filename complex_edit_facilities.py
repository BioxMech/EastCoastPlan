from flask import Flask, request, jsonify
from flask_cors import CORS
import os, sys
from os import environ

import requests
from invokes import invoke_http
import amqp_setup

import json
import pika

app = Flask(__name__)
CORS(app)

notifications_URL = environ.get("notifications_URL") or "http://localhost:5007/notifications/"
facilities_URL = environ.get("facilities_URL") or "http://localhost:5002/updateAvailability/"

@app.route("/edit_facility", methods=['POST'])
def edit_facility():
    # request = json.dumps(request)
    if request.is_json:
        try:
            edit = request.get_json()
            # print("\nReceived facility in JSON:", data)
            # print (data["message"])
            #returns the whole facilty in JSON
            result = processEditFacility(edit, facilities_URL)
            code = result["code"]
            message = json.dumps(result)
            
            if (code == 200):
                print('\n\n-----Publishing the (notifications) message with routing_key=user.notifications-----')
                
                amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="user.notifications", body=message, properties=pika.BasicProperties(delivery_mode = 2)) 
                return jsonify({
                    "code": 200,
                    "message": "Message: Uploaded to DB"
                }), 200

                

        except Exception as e:
            print(e)
            return jsonify({
                "code": 500,
                "error:": str(e)
            })  # do nothing.

    # if reached here, not a JSON request.
    return jsonify({
        "code": 400,
        "message": "Invalid JSON input: ",
        "error:": str(request.get_data()),
        "type": str(type(request))
    }), 400

#update availability based on id
def processEditFacility(edit, facilities_URL):
    facility_id = edit["facility_id"]
    messages = edit["messages"]
    print('\n-----Invoking facilities microservice-----')
    facilities_URL = facilities_URL + facility_id
    facilities_result = invoke_http(facilities_URL, method='PUT', json=edit)
    facilities_result['data']['messages'] = messages
    facilities_result['data']['receiver'] = "user"
    return(facilities_result)
    
# Execute this program if it is run as a main script (not by 'import')
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5100, debug=True)