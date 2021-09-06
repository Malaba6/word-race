FROM node:15.14.0

WORKDIR /api
ADD package*.json ./
ADD yarn.lock ./
ADD .sequelizerc ./
ADD .babelrc ./
RUN yarn
COPY . .
