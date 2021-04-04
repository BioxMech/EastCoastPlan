from flask import Flask, request, jsonify
from flask_cors import CORS

import os, sys
from os import environ

import requests
# from invokes import invoke_http

import amqp_setup
import pika
import json

app = Flask(__name__)
CORS(app)

facilities_URL = environ.get("facilities_URL") or "http://localhost:5002/"
booking_URL = environ.get("booking_URL") or "http://localhost:5003/"

@app.route("/make_booking", methods=['POST'])
def make_booking():
    # simple check of input format and data of request is in JSON format
    if request.is_json:
        try:
            booking = request.get_json()
            print("\nReceived a booking request in JSON:", booking)

            




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000, debug=True)