from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS
import requests, time

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/booking'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app)

class Booking(db.Model):
    __tablename__ = 'booking'

    booking_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    user_name = db.Column(db.String(64), nullable=False)
    schedule_id = db.Column(db.Integer)
    facility_id = db.Column(db.Integer)
    facility_name = db.Column(db.String(64), nullable=False)
    date = db.Column(db.Date)
    start_time = db.Column(db.String(10), nullable=False)
    end_time = db.Column(db.String(10), nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)
    status = db.Column(db.String(10), nullable=False, default="Pending")

    def __init__(self, booking_id, user_id, user_name, schedule_id, facility_id, facility_name, date, start_time, end_time, price, status):
        self.booking_id = booking_id
        self.user_id = user_id
        self.user_name = user_name
        self.schedule_id = schedule_id
        self.facility_id = facility_id
        self.facility_name = facility_name
        self.date = date
        self.start_time = start_time
        self.end_time = end_time
        self.price = price
        self.status = status

    def json(self):
        return {"booking_id": self.booking_id, "user_id": self.user_id, "user_name": self.user_name, "schedule_id": self.schedule_id, "facility_id": self.facility_id, "facility_name": self.facility_name, "date": self.date, "start_time": self.start_time, "end_time": self.end_time, "price": self.price, "status": self.status}


@app.route("/bookings")
def get_all():
    bookinglist = Booking.query.all() # select * from
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


@app.route("/booking/<string:booking_id>")
def find_by_booking_id(booking_id):
    booking = Booking.query.filter_by(booking_id=booking_id).first()
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


# @app.route("/createBooking/<string:booking_id>", methods=['POST'])
# def create_booking(booking_id):
#     if (Booking.query.filter_by(booking_id=booking_id).first()):
#         return jsonify(
#             {
#                 "code": 400,
#                 "data": {
#                     "booking_id": booking_id
#                 },
#                 "message": "Booking already exists."
#             }
#         ), 400

#     data = request.get_json()
#     booking = Booking(booking_id, **data)

#     try:
#         db.session.add(booking)
#         db.session.commit()
#     except:
#         return jsonify(
#             {
#                 "code": 500,
#                 "data": {
#                     "booking_id": booking_id
#                 },
#                 "message": "An error occurred creating the booking."
#             }
#         ), 500

#     return jsonify(
#         {
#             "code": 201,
#             "data": booking.json()
#         }
#     ), 201

@app.route("/createBooking/<string:booking_id>", methods=['POST'])
def create_booking(booking_id):
    data = request.get_json()
    schedule_id = data['schedule_id']
    print(schedule_id)
    url = "https://www.supersaas.com/api/bookings.json?schedule_id=" + schedule_id + "&api_key=jZf9H2V1AtNvTKRwzWaLBw"

    
    # booking = Booking(**data)

    # try:
    #     db.session.add(booking)
    #     db.session.commit()
    # except:
    #     return jsonify(
    #         {
    #             "code": 500,
    #             "data": {
    #                 "booking_id": "Non"
    #             },
    #             "message": "An error occurred creating the booking."
    #         }
    #     ), 500

    return jsonify(
        {
            "code": 201,
            # "data": booking.json()
            "data": "Test"
        }
    ), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003, debug=True)

