from flask import Flask, request, jsonify
from flask_cors import CORS
import os, sys
from os import environ
import requests
from invokes import invoke_http
import amqp_setup
import pika
import json

app = Flask(__name__)
CORS(app)

notifications_URL = environ.get("notifications_URL") or "http://localhost:5007/notifications/"
facilities_URL = environ.get("facilities_URL") or "http://localhost:5002/updateAvailability/"

@app.route("/edit_facility", methods=['POST'])
def edit_facility():
    if request.is_json:
        try:
            edit = request.get_json()
            result = processEditFacility(edit, facilities_URL)
            code = result['code']
            message = json.dumps(result)
            if result['code'] == 200:
                # return jsonify({
                #     "code": 201,
                #     "data": result
                # }), 201
                print('\n\n-----Publishing the (notifications) message with routing_key=user.notifications-----')
                
                try:
                    amqp_setup.channel.basic_publish(exchange=amqp_setup.exchangename, routing_key="user.notifications", body=message, properties=pika.BasicProperties(delivery_mode = 2)) 
                    return jsonify({
                        "code": 200,
                        "message": "Message: Uploaded to DB"
                    }), 200

                except Exception as e:
                    return jsonify({
                        "code": 500,
                        "error": str(e)
                    }),500
            else:
                return jsonify({
                    "code": 501,
                    "result": result
                }), 501
        except Exception as e:
            return jsonify({
                "code": 502,
                "message": str(e)
            }), 502


def processEditFacility(edit, facilities_URL):
    facility_id = edit["facility_id"]
    messages = edit["messages"]
    print('\n-----Invoking facilities microservice-----')
    facilities_URL = facilities_URL + facility_id
    facilities_result = invoke_http(facilities_URL, method='PUT', json=edit)
    facilities_result['data']['messages'] = messages
    facilities_result['data']['receiver'] = "user"
    return(facilities_result)






if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5100, debug=True)