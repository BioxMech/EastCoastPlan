from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
# from invokes import invoke_http
import requests, time
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
    availability = db.Column(db.String(64), nullable=True)
    image_url = db.Column(db.String(64), nullable=True)

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
    availability = db.Column(db.String(64), nullable=True)
    image_url = db.Column(db.String(64), nullable=True)

    def __init__(self, facility_id, schedule_id, facility_name, location, availability, image_url):
        self.facility_id = facility_id
        self.schedule_id = schedule_id
        self.facility_name = facility_name
        self.location = location
        self.availability = availability
        self.image_url = image_url

    def json(self):
        return {"facility_id": self.facility_id, "schedule_id":self.schedule_id, "facility_name": self.facility_name, "location": self.location, "availability": self.availability, "image_url":self.image_url}


# List all schedules
@app.route("/facilities")
def retrieve():
    #     url = 'https://www.supersaas.com/api/schedules.json?account=Petras_SMU&api_key=jZf9H2V1AtNvTKRwzWaLBw'
    schedulelist = Schedule.query.all()
    print([schedule.json() for schedule in schedulelist])
    if len(schedulelist):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "schedules": [schedule.json() for schedule in schedulelist]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no schedules."
        }
    ), 404


# Filter by schedule_id to see the different resources
@app.route("/facilities/<string:schedule_id>")
def filter_by_schedule(schedule_id):
    # url = "https://www.supersaas.com/api/resources.json?schedule_id=" + schedule_id + "&account=Petras_SMU&api_key=jZf9H2V1AtNvTKRwzWaLBw"
    resource_list = Facility.query.filter_by(schedule_id = schedule_id).all()
    # print([resource.json() for resource in resource_list])
    if len(resource_list):
        return jsonify(
            {
                "code": 200,
                "data": {
                    "resources": [resource.json() for resource in resource_list]
                }
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "There are no resources available."
        }
    ), 404


# Update local db 
@app.route("/update")
def update():
    # update schedule table
    schedule_url = 'https://www.supersaas.com/api/schedules.json?account=Petras_SMU&api_key=jZf9H2V1AtNvTKRwzWaLBw'
    schedule_list = requests.get(schedule_url).json()
    schedule_list = sorted(schedule_list, key = lambda i: i['id'])
    schedule_db = [schedule.json() for schedule in Schedule.query.all()]


    if len(schedule_db) != len(schedule_list):
        new_schedules = schedule_list[len(schedule_db):]
        print(new_schedules)
        for ele in new_schedules:
            schedule_id = ele['id']
            schedule_name = ele['name']
            # print(schedule_name)
            schedule = Schedule(schedule_id, schedule_name, "Yes", "")

            try:
                db.session.add(schedule)
                db.session.commit()
            except:
                return jsonify(
                    {
                        "code": 500,
                        "data": {
                            "schedule_id": schedule_id
                        },
                        "message": "Error"
                    }
                ),500

            resource_url = 'https://www.supersaas.com/api/resources.json?schedule_id='+str(schedule_id)+'&account=Petras_SMU&api_key=jZf9H2V1AtNvTKRwzWaLBw'
            resource_list = requests.get(resource_url).json()
            # print(resource_list)
            for resource in resource_list:
                resource_id = resource['id']
                resource_name = resource['name'].split("_")
                resource_name = " ".join(resource_name)
                # print(resource_name)
                facility = Facility(resource_id, schedule_id, resource_name, "", "Yes", "")
                try:
                    db.session.add(facility)
                    db.session.commit()
                except:
                    return jsonify(
                        {
                            "code": 500,
                            "data": {
                                "resource_id": resource_id
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


# Make booking in api
# app.route("/booking")

if __name__ == '__main__':
    app.run(port=5000, debug=True)

