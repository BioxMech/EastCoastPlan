# pull official base image
FROM node:alpine

# set working directory
WORKDIR /usr/src/app

# install app dependencies
COPY ./frontend/package.json ./
# ADD ./frontend/package-lock.json ./
# RUN npm install 
# RUN npm install react-scripts@3.4.1 -g 

RUN yarn install

# add app
COPY ./frontend/ ./

# start app
CMD ["yarn", "run", "start"]