from flask import Flask, request, jsonify
from flask_cors import CORS

import os, sys

import requests

from invokes import invoke_http

import amqp_setup
import pika
import json

app = Flask(__name__)
CORS(app)

users_URL = "http://localhost:5001/users"
facilities_URL = "http://localhost:5002/updateAvailability/"

@app.route("/edit_facility", methods=['PUT'])
def edit_facility():
    #facility_id = request.headers.get('facility_id')
    data = request.get_json()
    facility_id = data["facility_id"]
    availability = data["availability"]
    print(facility_id)
    print(availability)
    if request.is_json:
        try:
            facilities = request.get_json()
            print("\nReceived an order in JSON:", facilities)

            result = processEditFacility(facilities, facility_id)
            print(result["code"])

            code = result["code"]
            message = json.dumps(result)
            #return jsonify(result)
            if (code == 200):
                #return jsonify(result)
                
                #return jsonify(result)
                print('\n\n-----Publishing the (notifications) message with routing_key=*.notifications-----')
                amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="users.notifications", body=message, xproperties=pika.BasicProperties(delivery_mode = 2)) 
                
                return jsonify(result)

        except Exception as e:
            pass  # do nothing.

    # if reached here, not a JSON request.
    return jsonify({
        "code": 400,
        "message": "Invalid JSON input: " + str(request.get_data())
    }), 400

def processEditFacility(facilities, facility_id):
    print('\n-----Invoking facilities microservice-----')
    facilities_result = invoke_http(facilities_URL + facility_id, method='PUT', json=facilities)
    return(facilities_result)



# Execute this program if it is run as a main script (not by 'import')
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5100, debug=True)