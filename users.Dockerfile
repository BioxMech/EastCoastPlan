FROM python:3-slim
WORKDIR /usr/src/app
COPY ./Microservices/Users/requirements.txt ./Microservices/Users/
RUN pip install --no-cache-dir -r ./Microservices/Users/requirements.txt
COPY ./Microservices/Users/users.py .
CMD [ "python", "users.py" ]
# COPY ./invokes.py ./test_invoke_http.py ./
# CMD [ "python", "./test_invoke_http.py" ]
COPY ./Microservices/Report/http.reqs.txt ./Microservices/Report/

