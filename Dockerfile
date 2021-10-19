FROM node:16.4.2

WORKDIR /app
ADD package*.json ./
ADD yarn.lock ./
ADD .sequelizerc ./
ADD .babelrc ./
RUN yarn
COPY . .