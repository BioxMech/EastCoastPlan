from flask import Flask, request, jsonify
from flask_cors import CORS
import os, sys
from os import environ

import requests
from invokes import invoke_http

# import amqp_setup
# import pika
import json

app = Flask(__name__)
CORS(app)

# facilities_URL = environ.get("facilities_URL") or "http://localhost:5002/"
booking_URL = environ.get('booking_URL') or "http://localhost:5003/createBooking/"

@app.route("/make_booking/<string:booking_id>", methods=['POST'])
def make_booking(booking_id):
    # simple check of input format and data of request is in JSON format
    if request.is_json:
        try:
            booking = request.get_json()
            print("\nReceived a booking request in JSON:", booking)

            result = processMakeBooking(booking, booking_URL, booking_id)
            print('\n------------------------')
            print('\nresult: ', result)
            # return jsonify(result), result["code"]
            return jsonify(
                {
                    "code": 201,
                    "data": result
                }
            )
        except Exception as e:
            # Unexpected error in code
            # exc_type, exc_obj, exc_tb = sys.exc_info()
            # fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            # ex_str = str(e) + " at " + str(exc_type) + ": " + fname + ": line " + str(exc_tb.tb_lineno)
            # print(ex_str)
            print(e)

            return jsonify({
                "code": 500,
                "message": "book_a_facility.py internal error: "
            }), 500
    # if reached here, not a JSON request.
    
    return jsonify({
        "code": 400,
        "message": "Invalid JSON input: " + str(request.get_data())
    }), 400

            
def processMakeBooking(booking, booking_URL, booking_id):

#     # print("\n----Invoking Payment Microservice----")
#     # payment_result = 

    
    print("\n-----Invoking Booking Microservice-----")
    print(booking)
    # booking_id = booking['booking_id']
    # print(booking_id)
    schedule_id = booking['schedule_id']
    facility_id = booking['facility_id']
    resource_id = booking['resource_id']
    user_id = booking['user_id']
    full_name = booking['full_name']
    date = booking['date']
    start = booking['start']
    finish = booking['finish']
    price = booking['price']
    # print(booking_URL)
    # print(booking_id)
    booking_URL = booking_URL + booking_id
    # print(booking_URL + booking_id)
    print(booking_URL)
    booking_result = invoke_http(booking_URL, method='POST', json=booking)
    print("booking_result:", booking_result)

    code = booking_result['code']
    message = json.dumps(booking_result)

    return {
        "code": 201,
        "data": {
            "booking_result": booking_result
        }
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5010, debug=True)