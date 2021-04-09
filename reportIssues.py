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
report_URL = "http://localhost:5000/createReport"

@app.route("/report_issues", methods=['POST'])

def edit_facility():
    data = request.get_json()

    if request.is_json:
        try:
        
            print("\nReceived report data in JSON:", data)

            #returns the whole facilty in JSON
            result = processCreateReport(data)
            code = result["code"]
            message = json.dumps(result)
            # return(jsonify(result))
            if (code in range(200, 300)):
                print('\n\n-----Publishing the (notifications) message with routing_key=admin.notifications-----')
                print(message)
                amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="admin.notifications", body=message) 
                
                result2 = processStoreNotification(result, data)
                return(jsonify(result2))
        
        except Exception as e:
            return e  # do nothing.

    return jsonify({
        "code": 400,
        "message": "Invalid JSON input: " + str(request.get_data())
    }), 400
            
def processCreateReport(report):
    print('\n-----Invoking report microservice-----')
    report_results = invoke_http(report_URL, method='POST', json=report)
    return(report_results)

#insert into database (notification)
def processStoreNotification(facilities, data):
    facility_name = facilities["data"]["facility_name"]
    data["facility_name"] = facility_name
    print('\n-----Invoking notifications microservice-----')
    notifications_result = invoke_http(notifications_URL + "user", method='POST', json=data)
    return (notifications_result)
    

# Execute this program if it is run as a main script (not by 'import')
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5008, debug=True)