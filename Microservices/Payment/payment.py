from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, request, jsonify
import json
import os
import stripe


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/eastcoastplan'
# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# to fix the kong bug
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)
CORS(app)


class Payment(db.Model):
    __tablename__ = 'payment'

    payment_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    facility_id = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float(precision=2), nullable=False)
    status = db.Column(db.String(11), nullable=False, default="pending")
    payment_date = db.Column(db.DateTime)

    def __init__(self, payment_id, user_id, facility_id, status, payment_date):
        self.payment_id = payment_id
        self.user_id = user_id
        self.facility_id = facility_id
        self.price = price
        self.status = status
        self.payment_date = payment_date

    def json(self):
        return {"payment_id": self.payment_id, "user_id": self.user_id, "facility_id": self.facility_id, "status": self.status, "payment_date": self.payment_date}

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


@app.route("/payment/<int:payment_id>")
def find_by_payment_id(payment_id):
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

@app.route("/payment/<int:payment_id>", methods=['POST'])
def create_payment_local(payment_id):
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

@app.route("/payment/<int:payment_id>", methods=['POST'])
def create_payment(payment_id):
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


@app.route('/test', methods=['POST'])
def test():
    ccnum = request.form['ccnum']
    expire = request.form['exp']
    cvc = request.form['cvc']
    token = stripe.Token.create(
        card={
            "number": ccnum,
            "exp_month": 4,
            "exp_year": 2022,
            "cvc": "314",
        },
    )
    response = stripe.Charge.create(
        amount=5644,
        currency="sgd",
        source=token,
        description="My First Test Charge (created for API docs)",
        receipt_email='hyong.2019@sis.smu.edu.sg' # Testing Email
    )
    return jsonify(
        {
            "code": 201,
            "data": {
                "ccnum": ccnum,
                "expire": expire,
                "cvc": cvc,
                "token": token,
                "response": response,
                "status": response.status
            }
        }
    ), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004, debug=True)
