FROM node:8.9.4-alpine

RUN apk update

RUN apk add yarn

RUN yarn global add pm2

COPY processes.json /

WORKDIR /app

CMD yarn install && pm2 start /processes.json && pm2 logs