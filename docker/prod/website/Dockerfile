FROM klakegg/hugo:ext-alpine as build
WORKDIR /app
COPY . .
RUN hugo --config config-prod.toml

FROM nginx:1.17.9-alpine
COPY --from=build /target /usr/share/nginx/html/