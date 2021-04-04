from flask import Flask, request, jsonify
from flask_cors import CORS

import os, sys

import requests

import json
from invokes import invoke_http

app = Flask(__name__)
CORS(app)

users_URL = "http://localhost:5001/users"
facilities_URL = "http://localhost:5002/updateAvailability/810431"

@app.route("/edit_facility", methods=['POST'])
def edit_facility():
    #check if it is json
    if request.is_json:
        try:
            users = request.get_json()
            print("\nReceived an order in JSON:", users)

            result = processEditFacility(users)
            return jsonify(result), 200

        except Exception as e:
            pass  # do nothing.

    # if reached here, not a JSON request.
    return jsonify({
        "code": 400,
        "message": "Invalid JSON input: " + str(request.get_data())
    }), 400

def processEditFacility(users):
    print('\n-----Invoking facilities microservice-----')
    users_result = invoke_http(users_URL, method='GET', json=users)
    print('facilities_result:', users_result)



# Execute this program if it is run as a main script (not by 'import')
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5100, debug=True)