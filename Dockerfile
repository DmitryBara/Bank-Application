FROM node:13.8-alpine

WORKDIR /app

EXPOSE 3000

COPY . .
RUN npm install --silent

CMD npm run run
