#
# Build stage React
#
FROM node:14.16.0 as build-deps
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

#
# Serve stage React
#
FROM httpd
COPY ./.htaccess /usr/local/apache2/htdocs/
COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=build-deps /usr/src/app/build/ /usr/local/apache2/htdocs/
EXPOSE 80
