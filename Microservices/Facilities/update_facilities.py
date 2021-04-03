from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
# from invokes import invoke_http
import requests
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/facility'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app)  

class Schedule(db.Model):
    __tablename__ = 'schedule'

    schedule_id = db.Column(db.Integer, primary_key=True)
    schedule_name = db.Column(db.String(64), nullable=False)
    availability = db.Column(db.String(64))
    image_url = db.Column(db.String(64))

    def __init__(self, schedule_id, schedule_name, availability, image_url):
        self.schedule_id = schedule_id
        self.schedule_name = schedule_name
        self.availability = availability
        self.image_url = image_url

    def json(self):
        return {"schedule_id": self.schedule_id, "schedule_name": self.schedule_name, "availability": self.availability, "image_url": self.image_url}


class Facility(db.Model):
    __tablename__ = 'facility'

    facility_id = db.Column(db.Integer, primary_key=True)
    schedule_id = db.Column(db.Integer, nullable=False)
    facility_name = db.Column(db.String(64), nullable=False)
    location = db.Column(db.String(64), nullable=False)
    availability = db.Column(db.String(64))
    image_url = db.Column(db.String(64))

    def __init__(self, facility_id, schedule_id, facility_name, location, availability, image_url):
        self.facility_id = facility_id
        self.schedule_id = schedule_id
        self.facility_name = facility_name
        self.location = location
        self.availability = availability
        self.image_url = image_url

    def json(self):
        return {"facility_id": self.facility_id, "schedule_id":self.schedule_id, "facility_name": self.facility_name, "location": self.location, "availability": self.availability, "image_url":self.image_url}

@app.route("/update")
def update():
    url = 'https://www.supersaas.com/api/schedules.json?account=Petras_SMU&api_key=jZf9H2V1AtNvTKRwzWaLBw'
    schedule_list = requests.get(url).json()
    schedule_list = sorted(schedule_list, key = lambda i: i['id'])
    schedule_db = [schedule.json() for schedule in Schedule.query.all()]
    # print('schedule_list:'+ str(schedule_list))
    # print('schedule_db:' + str(schedule_db))
    if len(schedule_db) != len(schedule_list):
        new_schedules = schedule_list[len(schedule_db):]
        print(new_schedules)
        for ele in new_schedules:
            id = ele['id']
            name = ele['name']
            print(name)
            schedule = Schedule(id, name, "Yes", "")
            try:
                db.session.add(schedule)
                db.session.commit()
            except:
                return jsonify(
                    {
                        "code": 500,
                        "data": {
                            "schedule_id": id
                        },
                        "message": "Error"
                    }
                ),500
        return jsonify(
            {
                "code": 201,
                "data": schedule.json()
            }
        ), 201


if __name__ == '__main__':
    app.run(port=5001, debug=True)