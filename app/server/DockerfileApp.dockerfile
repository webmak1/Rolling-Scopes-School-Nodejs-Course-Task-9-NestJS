FROM node:lts-alpine3.13

RUN apk --update add postgresql-client

WORKDIR /app
COPY package.json ./

RUN yarn install --silent
# COPY ./ ./

CMD ["yarn", "start:dev"]

