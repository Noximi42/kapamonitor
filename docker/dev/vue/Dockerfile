FROM node:10.15.1
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . /app/

CMD ["yarn", "dev"]