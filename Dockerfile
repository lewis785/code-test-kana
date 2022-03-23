FROM node:16

RUN mkdir /var/app
WORKDIR /var/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY src ./src