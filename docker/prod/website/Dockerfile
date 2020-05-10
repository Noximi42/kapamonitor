FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY webpack*.js ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "server.prod.js" ]