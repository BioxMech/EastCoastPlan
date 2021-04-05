FROM python:3-slim
WORKDIR /usr/src/app
COPY ./Microservices/Users/requirements.txt ./Microservices/Users/
RUN pip install --no-cache-dir -r ./Microservices/Users/requirements.txt
COPY ./editFacilities.py ./invokes.py ./amqp_setup.py ./
CMD [ "python", "editFacilities.py" ]
