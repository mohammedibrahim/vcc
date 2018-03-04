FROM node:8.9.4-alpine

RUN apk update

RUN apk add yarn

RUN yarn global add statik

WORKDIR /app

CMD yarn install && yarn run build && statik ./build --port 3000 --compress --redirect --verbose

# dev
# CMD yarn install && yarn start