FROM python:3-slim
WORKDIR /usr/src/app
COPY ./Microservices/Facilities/requirements.txt ./Microservices/Facilities/
RUN pip install --no-cache-dir -r ./Microservices/Facilities/requirements.txt
COPY ./complex_book_facility.py ./invokes.py ./
CMD [ "python", "./complex_book_facility.py" ]