FROM python:3-slim
WORKDIR /usr/src/app
COPY ./Microservices/Payment/requirements.txt ./Microservices/Payment/
RUN pip install --no-cache-dir -r ./Microservices/Payment/requirements.txt
COPY ./Microservices/Payment/payment.py .
CMD [ "python", "./payment.py" ]
