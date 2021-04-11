FROM python:3-slim
WORKDIR /usr/src/app
COPY ./Microservices/Notifications/requirements.txt ./Microservices/Notifications/
RUN pip install --no-cache-dir -r ./Microservices/Notifications/requirements.txt
COPY ./Microservices/Notifications/notifications.py ./amqp_setup.py ./Microservices/Notifications/invokes.py ./
CMD [ "python", "notifications.py" ]


