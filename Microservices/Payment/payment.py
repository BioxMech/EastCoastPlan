from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify
import json
from os import environ
import stripe
from datetime import date
today = date.today()



app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/payment'
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# to fix the kong bug
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)
CORS(app)


class Payment(db.Model):
    __tablename__ = 'payment'

    booking_id = db.Column(db.String(64), primary_key=True)
    schedule_id = db.Column(db.String(64), nullable=False)
    facility_id = db.Column(db.String(64), nullable=False)
    user_id = db.Column(db.Integer, nullable=False)
    full_name = db.Column(db.String(64), nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)
    start = db.Column(db.String(64), nullable=False)
    finish = db.Column(db.String(64), nullable=False)
    payment_date = db.Column(db.DateTime)

    def __init__(self, booking_id, schedule_id, facility_id, user_id, full_name, price, start, finish, payment_date):
        self.booking_id = booking_id
        self.schedule_id = schedule_id
        self.facility_id = facility_id
        self.user_id = user_id
        self.full_name = full_name
        self.price = price
        self.start = start
        self.finish = finish
        self.payment_date = payment_date

    def json(self):
        return {"booking_id": self.booking_id, "schedule_id":self.schedule_id, "facility_id": self.facility_id,"user_id": self.user_id, "full_name":self.full_name, "price": self.price, "start":self.start, "finish": self.finish, "payment_date": self.payment_date}

@app.route("/payment")
def get_all():
    paymentlist = Payment.query.all()  # select * from
    if len(paymentlist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "payments": [payment.json() for payment in paymentlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no payments."
        }
    ), 404


@app.route("/payment/<string:booking_id>")
def find_by_payment_id(booking_id):
    payment = Payment.query.filter_by(payment_id=payment_id).first()
    if payment:
        return jsonify(
            {
                "code": 200,
                "data": payment.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Payment not found."
        }
    ), 404

@app.route("/payment/<string:booking_id>", methods=['POST'])
def create_payment_local(booking_id):
    if (Payment.query.filter_by(payment_id=payment_id).first()):
        return jsonify(
            {
                "code": 400,
                "data": {
                    "payment_id": payment_id
                },
                "message": "Payment already exists."
            }
        ), 400

    data = request.get_json()
    payment = Payment(payment_id, **data)

    try:
        db.session.add(payment)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "payment_id": payment_id
                },
                "message": "An error occurred creating the payment."
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": payment.json()
        }
    ), 201

@app.route("/payment/<string:booking_id>", methods=['POST'])
def create_payment(booking_id):
    if (Payment.query.filter_by(payment_id=payment_id).first()):
        return jsonify(
            {
                "code": 400,
                "data": {
                    "payment_id": payment_id
                },
                "message": "Payment already exists."
            }
        ), 400

    data = request.get_json()
    payment = Payment(payment_id, **data)

    try:
        db.session.add(payment)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "data": {
                    "payment_id": payment_id
                },
                "message": "An error occurred creating the payment."
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": payment.json()
        }
    ), 201

##############################################################
stripe.api_key = "sk_test_51IVv9fK8z0TITG8fImYZYZ995I9zpYdFUJQi8ewEQIUqRitQfKgNBKphDg7E2r7uyiH3MtSCVdq3BxS2xAFTaBL900NbcdKis5"


@app.route('/makePayment/<string:booking_id>', methods=['POST'])
def makePayment(booking_id):
    data=request.get_json()
    print(data)
    ccnum = data['creditCard']
    exp_month = data['expMonth']
    exp_year = data['expYear']
    cvc = data['cvv']
    price_orig = data['price']
    price = int(str(data['price']) + "00")
    user_id = data['user_id']
    schedule_id = data['schedule_id']
    facility_id = data['facility_id']
    full_name = data['full_name']
    start = data['start']
    finish = data['finish']
    # print(ccnum)
    try:
        token = stripe.Token.create(
            card={
                "number": ccnum,
                "exp_month": exp_month,
                "exp_year": exp_year,
                "cvc": cvc,
            },
        )
        response = stripe.Charge.create(
            amount=price,
            currency="sgd",
            source=token,
            description=booking_id,
            receipt_email='hyong.2019@sis.smu.edu.sg' # Testing Email
        )
    except:
        return jsonify(
            {
                "code": 500,
                "data": "Stripe API could not be called due to invalid input."
            }
        ),500
    print(response['status'])
    if response['status'] == "succeeded":
        payment = Payment(booking_id,schedule_id,facility_id,user_id,full_name,price_orig,start,finish,today)
        print(payment)
        try:
            db.session.add(payment)
            db.session.commit()
        except:
            return jsonify(
                {
                    "code": 500,
                    "data": {
                        "booking_id": booking_id
                    },
                    "message": "An error occurred when inserting into table"
                }
            ), 500
    else:
        return jsonify(
            {
                "code": 404,
                "error": "Unable to make payment"
            }
        )


    return jsonify(
        {
            "code": 201,
            "data": {
                "ccnum": ccnum,
                "expire": exp_month + exp_year,
                "cvc": cvc,
                "token": token,
                "response": response,
                "status": response.status
            }
        }
    ), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004, debug=True)
