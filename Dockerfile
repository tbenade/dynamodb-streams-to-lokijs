FROM node:0.12.5

RUN mkdir -p /var/app
COPY . /var/app

WORKDIR /var/app
RUN npm install

CMD node index.js
