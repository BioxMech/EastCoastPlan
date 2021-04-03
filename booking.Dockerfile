FROM python:3-slim
WORKDIR /usr/src/app
COPY ./Microservices/Booking/requirements.txt ./Microservices/Booking/
RUN pip install --no-cache-dir -r ./Microservices/Booking/requirements.txt
COPY ./Microservices/Booking/booking.py .
CMD [ "python", "./booking.py" ]
