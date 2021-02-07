#Dockerfile for building Smart Banking App production image

FROM node:10.23 as builder

LABEL maintainer="Marko Perajica"
LABEL version="1.0"

RUN mkdir /opt/agile

WORKDIR "/opt/agile"

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./yarn.lock ./

RUN yarn upgrade
RUN yarn install

COPY ./ ./

RUN yarn build

FROM nginx:latest
EXPOSE 3000
COPY ./nginx/agile.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /opt/agile/build /usr/share/nginx/html
