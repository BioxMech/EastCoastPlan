from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ
import requests, time
from datetime import datetime, date
today = str(date.today().strftime("%Y-%m-%d"))
now = datetime.now()
current_time = now.strftime("%H:%M:%S")


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://is213@localhost:3306/facility'
# app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('dbURL')
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
    internal_name = db.Column(db.String(64), nullable=False)
    location = db.Column(db.String(64), nullable=False)
    availability = db.Column(db.String(64), nullable=True)
    price = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(64), nullable=True)

    def __init__(self, facility_id, schedule_id, facility_name, internal_name, location, availability, price, image_url):
        self.facility_id = facility_id
        self.schedule_id = schedule_id
        self.facility_name = facility_name
        self.internal_name = internal_name
        self.location = location
        self.availability = availability
        self.price = price
        self.image_url = image_url

    def json(self):
        return {"facility_id": self.facility_id, "schedule_id":self.schedule_id, "facility_name": self.facility_name, "internal_name": self.internal_name, "location": self.location, "availability": self.availability, "price": self.price, "image_url":self.image_url}


# List all schedules
@app.route("/facilities")
def retrieveFacilities():
    #     url = 'https://www.supersaas.com/api/schedules.json?account=Petras_SMU&api_key=jZf9H2V1AtNvTKRwzWaLBw'
    schedulelist = Schedule.query.all()
    print(schedulelist)
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

@app.route("/facilities/<string:schedule_id>/<string:facility_name>")
def getFacility(schedule_id,facility_name):
    # url = "https://www.supersaas.com/api/resources.json?schedule_id=" + schedule_id + "&account=Petras_SMU&api_key=jZf9H2V1AtNvTKRwzWaLBw"
    resource_list = Facility.query.filter_by(schedule_id = schedule_id, facility_name = facility_name).all()
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
            "message": "There are no facility available."
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
            print(resource_list)
            for resource in resource_list:
                resource_id = resource['id']
                internal_name = resource['name']
                resource_name = resource['name'].split("_")
                resource_name = " ".join(resource_name)
                # print(resource_name)
                facility = Facility(resource_id, schedule_id, resource_name, internal_name,"", "Yes", "")
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


# Retrieve available timeslots for each resource
@app.route("/getSlots/<string:schedule_id>/<string:internal_name>", methods=["GET","POST"])
def getTimeSlots(schedule_id, internal_name, date=None):
    if date == None:
        date = today
    data = request.get_json()
    if data != None:
        date = data['from']
    url = "https://www.supersaas.com/api/free/" + schedule_id + ".json?from=" + date + "%2000:00:00" + "&api_key=jZf9H2V1AtNvTKRwzWaLBw&resource=" + internal_name +"&max_results=20"
    slots_list = requests.get(url).json()
    # print(slots_list)
    if len(slots_list):
        return jsonify(
            {
                "code": 200,
                "data": slots_list['slots']
            }
        ), 200
    return jsonify(
        {
            "code": 404,
            "message": "No slots available"
        }
    ), 404


# Make booking in api using url
# @app.route("")

# Make booking in api using http
# @app.route("/booking/<string:schedule_id>/<string:internal_name>")
# def create_booking(schedule_id, internal_name):
#     data = request.json()

        

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)

