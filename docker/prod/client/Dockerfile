FROM node:alpine as build
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install --silent
COPY . /app/
RUN yarn run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html