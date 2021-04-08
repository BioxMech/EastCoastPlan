from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/report'
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)

CORS(app)


class Report(db.Model):
    __tablename__ = 'report'

    report_id = db.Column(db.Integer, primary_key=True, AUTO_INCREMENT=True)
    date = db.Column(db.String(10), nullable=False)
    time = db.Column(db.String(10), nullable=False)
    message = db.Column(db.String(300), nullable=False)
    facility_id = db.Column(db.String(10), nullable=False)
    facility_name = db.Column(db.String(20), nullable=False)

    def __init__(self, date, time, message, facility_id, facility_name):
        self.date = date
        self.time = time
        self.message = message
        self.facility_id = facility_id
        self.facility_name = facility_name

    def json(self):
        return {"report_id": self.report_id, "date": self.date, "time": self.time, "message": self.message, "facility_id": self.facility_id, "facility_name": self.facility_name}


@app.route("/reports")
def get_all():
    reportlist = Report.query.all()
    if len(reportlist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "reports": [report.json() for report in reportlist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no reports."
        }
    ), 404


@app.route("/report/<string:report_id>")
def find_by_report_id(report_id):
    report = Report.query.filter_by(report_id=report_id).first()
    if report:
        return jsonify(
            {
                "code": 200,
                "data": report.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Report not found."
        }
    ), 404


@app.route("/createReport", methods=['POST'])
def createReport():

    data = request.get_json()
    print(data)

    print("DATA HERE: " + str(data))
    reports = Report(**data)
    
    try:
        db.session.add(reports)
        db.session.commit()

    except:

        return jsonify(
            {
                "code": 500,
                "data": {
                    "email": "xxxxxx"
                },
                "message": "An error occurred creating the report."
            }
        ), 500

    return jsonify(
        {
            "code": 201,
            "data": reports.json()
        }
    ), 201


@app.route("/report/<string:report_id>", methods=['PUT'])
def update_report(report_id):
    report = Report.query.filter_by(report_id=report_id).first()
    if report:
        data = request.get_json()
        if data['title']:
            report.title = data['title']
        if data['price']:
            report.price = data['price']
        if data['availability']:
            report.availability = data['availability']
        db.session.commit()
        return jsonify(
            {
                "code": 200,
                "data": report.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "data": {
                "report_id": report_id
            },
            "message": "Report not found."
        }
    ), 404


@app.route("/report/<string:report_id>", methods=['DELETE'])
def delete_report(report_id):
    report = Report.query.filter_by(report_id=report_id).first()
    if report:
        db.session.delete(report)
        db.session.commit()
        return jsonify(
            {
                "code": 200,
                "data": {
                    "report_id": report_id
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "data": {
                "report_id": report_id
            },
            "message": "Book not found."
        }
    ), 404


if __name__ == '__main__':
    # app.run(host='0.0.0.0', debug=True)
    app.run(host='0.0.0.0', port=5000, debug=True)
