FROM node:14 AS build
WORKDIR /build

COPY /frontend/package.json package.json
COPY /frontend/package-lock.json package-lock.json
RUN npm ci

COPY /frontend/public/ public
COPY /frontend/src/ src
RUN npm run build

FROM httpd:alpine
WORKDIR /var/www/html
COPY --from=build /build/build/ .
