from flask import Flask, request, jsonify
from flask_cors import CORS

import os, sys

import requests

import json
from invokes import invoke_http

app = Flask(__name__)
CORS(app)

users_URL = "http://localhost:5001/users"
facilities_URL = "http://localhost:5002/updateAvailability/"

@app.route("/edit_facility", methods=['PUT'])
def edit_facility():
    facility_id = request.headers.get('facility_id')
    if request.is_json:
        try:
            facilities = request.get_json()
            print("\nReceived an order in JSON:", facilities)

            result = processEditFacility(facilities, facility_id)
            return jsonify(result), 200

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
    return('facilities_result:', facilities_result)




# Execute this program if it is run as a main script (not by 'import')
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5100, debug=True)