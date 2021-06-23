FROM node:lts-alpine3.13

RUN apk --update add postgresql-client

WORKDIR /app
COPY package.json ./

RUN npm install --silent
# COPY ./ ./


CMD ["npm", "run", "dev"]

# CMD ["npm", "run", "dev"]
