FROM node:16-alpine3.11

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY index.js .

EXPOSE 8081

CMD [ "node", "index.js" ]