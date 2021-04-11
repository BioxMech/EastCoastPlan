FROM python:3-slim
WORKDIR /usr/src/app
COPY ./Microservices/Notifications/amqp.reqs.txt ./Microservices/Notifications/
RUN pip install --no-cache-dir -r ./Microservices/Notifications/amqp.reqs.txt
COPY ./Microservices/Notifications/receiver.py ./amqp_setup.py ./Microservices/Notifications/invokes.py ./
CMD [ "python", "receiver.py" ]


