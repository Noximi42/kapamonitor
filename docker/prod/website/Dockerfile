FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY webpack*.js ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "server.prod.js" ]