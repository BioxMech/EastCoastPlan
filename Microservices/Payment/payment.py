import json
import os
import stripe

# This is a sample test API key. Sign in to see examples pre-filled with your key.
stripe.api_key = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/eastcoastplan'
# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#to fix the kong bug
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)


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

def calculate_order_amount(items):
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    return 1400


@app.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data['items']),
            currency='usd'
        )

        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403

@app.route("/payment")
def get_all():
    paymentlist = Payment.query.all() # select * from
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


# @app.route("/payment/<int:payment_id>", methods=['POST'])
# def create_payment(payment_id):
#     if (Payment.query.filter_by(payment_id=payment_id).first()):
#         return jsonify(
#             {
#                 "code": 400,
#                 "data": {
#                     "payment_id": payment_id
#                 },
#                 "message": "Payment already exists."
#             }
#         ), 400

#     data = request.get_json()
#     payment = Payment(payment_id, **data)

#     try:
#         db.session.add(payment)
#         db.session.commit()
#     except:
#         return jsonify(
#             {
#                 "code": 500,
#                 "data": {
#                     "payment_id": payment_id
#                 },
#                 "message": "An error occurred creating the payment."
#             }
#         ), 500

#     return jsonify(
#         {
#             "code": 201,
#             "data": payment.json()
#         }
#     ), 201

stripe.api_key = 'sk_test_51IcQMUByiT0qnKrjFsWLFbNHVoYiV3GsSW0guzLHAj4sWrURtKhHQ3fhoyksHdalREvbLmY72kyqsnw8z3AykwXU00aMUSjBtS'

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    session = stripe.checkout.Session.create(
    payment_method_types=['card'],
    line_items=[{
        'price_data': {
        'currency': 'usd',
        'product_data': {
            'name': 'T-shirt',
        },
        'unit_amount': 2000,
        },
        'quantity': 1,
    }],
    mode='payment',
    success_url='https://example.com/success',
    cancel_url='https://example.com/cancel',
    )

    return jsonify(id=session.id)

    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004, debug=True)

