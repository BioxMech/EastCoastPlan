FROM python:3-slim
WORKDIR /usr/src/app
COPY ./Microservices/Report/http.reqs.txt ./Microservices/Report/
RUN pip install --no-cache-dir -r ./Microservices/Report/http.reqs.txt
COPY ./Microservices/Report/report.py .
CMD [ "python", "report.py" ]