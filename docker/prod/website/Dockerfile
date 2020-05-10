FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY webpack*.js ./

RUN npm install

COPY . .

RUN npm run start

CMD [ "node", "server.js" ]