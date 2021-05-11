from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS
import requests
import time

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/booking'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# to fix the kong bug
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)

CORS(app)


class Booking(db.Model):
    __tablename__ = 'booking'

    booking_id = db.Column(db.Integer, primary_key=True)
    schedule_id = db.Column(db.Integer)
    facility_id = db.Column(db.Integer)
    facility_name = db.Column(db.String(64), nullable=False)
    user_id = db.Column(db.Integer)
    full_name = db.Column(db.String(64), nullable=False)
    date = db.Column(db.Date)
    start = db.Column(db.String(10), nullable=False)
    end = db.Column(db.String(10), nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)
    status = db.Column(db.String(10), nullable=False, default="Pending")

    def __init__(self, booking_id, schedule_id, facility_id, facility_name, user_id, full_name,  date, start, end, price, status):
        self.booking_id = booking_id
        self.user_id = user_id
        self.full_name = full_name
        self.schedule_id = schedule_id
        self.facility_id = facility_id
        self.facility_name = facility_name
        self.date = date
        self.start = start
        self.end = end
        self.price = price
        self.status = status

    def json(self):
        return {"booking_id": self.booking_id, "user_id": self.user_id, "full_name": self.full_name, "schedule_id": self.schedule_id, "facility_id": self.facility_id, "facility_name": self.facility_name, "date": self.date, "start": self.start, "end": self.end, "price": self.price, "status": self.status}


@app.route("/bookings")
def get_all():
    bookinglist = Booking.query.all()  # select * from
    if len(bookinglist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "bookings": [booking.json() for booking in bookinglist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no bookings."
        }
    ), 404

# Find bookings by user_id


@app.route("/bookings/user/<string:user_id>")
def find_by_user_id(user_id):
    bookings = Booking.query.filter_by(user_id=user_id).all()
    if bookings:
        return jsonify(
            {
                "code": 200,
                "data": [booking.json() for booking in bookings]
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "Bookings not found."
        }
    ), 404


# Find bookings by booking_id
@app.route("/bookings/<string:booking_id>")
def find_by_booking_id(booking_id):
    booking = Booking.query.filter_by(booking_id=booking_id).all()
    if booking:
        return jsonify(
            {
                "code": 200,
                "data": booking.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Booking not found."
        }
    ), 404


@app.route("/createBooking/<string:booking_id>", methods=['POST'])
def create_booking(booking_id):
    data = request.get_json()
    print(data)
    schedule_id = data['schedule_id']
    facility_id = data['facility_id']
    resource_id = data['resource_id']
    user_id = data['user_id']
    full_name = data['full_name']
    date = data['date']
    start = data['start']
    finish = data['finish']
    print("=======================")
    print(start)
    print("=======================")
    print(finish)
    print("=======================")
    price = data['price']
    myobj = {'start': start, 'finish': finish,
             'full_name': full_name, 'resource_id': resource_id}
    url = "https://www.supersaas.com/api/bookings.json?schedule_id=" + schedule_id + "&api_key=jZf9H2V1AtNvTKRwzWaLBw"
    post_request = requests.post(url, json=myobj)
    print(post_request.status_code)
    if post_request.status_code == 201:
        booking = Booking(booking_id, schedule_id, facility_id, resource_id,
                          user_id, full_name, date, start, finish, price, "Payment made")
        print(booking)
        try:
            db.session.add(booking)
            db.session.commit()
        except:
            return jsonify(
                {
                    "code": 500,
                    "data": {
                        "booking_id": booking_id
                    },
                    "message": "An error occurred creating the booking."
                }
            ), 500
    else:
        return jsonify({
            "code": 404,
            "error": "Unable to make booking"
        })

    return jsonify(
        {
            "code": 201,
            "data": booking.json()
            # "data": "Test"
        }
    ), 201


@app.route("/updateBooking/<string:booking_id>", methods=['PUT'])
def update_booking(booking_id):
    data = request.get_json()
    print(data)
    schedule_id = data['schedule_id']
    facility_id = data['facility_id']
    resource_id = data['resource_id']
    user_id = data['user_id']
    full_name = data['full_name']
    date = data['date']
    start = data['start']
    finish = data['finish']
    price = data['price']
    myobj = {'start': start, 'finish': finish,
             'full_name': full_name, 'resource_id': resource_id}
    url = "https://www.supersaas.com/api/bookings.json?schedule_id=" + \
        schedule_id + "&api_key=jZf9H2V1AtNvTKRwzWaLBw"
    post_request = requests.post(url, json=myobj)
    print(post_request.status_code)
    if post_request.status_code == 201:
        booking = Booking(booking_id, schedule_id, facility_id, resource_id,
                          user_id, full_name, date, start, finish, price, "Payment made")

        try:
            db.session.add(booking)
            db.session.commit()
        except:
            return jsonify(
                {
                    "code": 500,
                    "data": {
                        "booking_id": booking_id
                    },
                    "message": "An error occurred creating the booking."
                }
            ), 500
    else:
        return jsonify({
            "code": 404,
            "error": "Unable to make booking"
        })

    return jsonify(
        {
            "code": 201,
            "data": booking.json()
            # "data": "Test"
        }
    ), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003, debug=True)
