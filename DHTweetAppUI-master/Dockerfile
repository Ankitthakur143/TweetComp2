# Stage 1
FROM node:latest as node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

# Stage 2

FROM nginx:alpine

COPY --from=node /usr/src/app/dist/DHTweetApp /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf