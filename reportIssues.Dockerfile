FROM python:3-slim
WORKDIR /usr/src/app
COPY ./Microservices/Notifications/requirements.txt ./Microservices/Notifications/
RUN pip install --no-cache-dir -r ./Microservices/Notifications/requirements.txt
COPY ./complex_reportIssues.py ./invokes.py ./amqp_setup.py ./
CMD [ "python", "complex_reportIssues.py" ]