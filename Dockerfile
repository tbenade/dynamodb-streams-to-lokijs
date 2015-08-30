FROM node:0.12.5

RUN mkdir -p /var/app/current
COPY package.json /var/app/current/

WORKDIR /var/app/current
RUN npm install

COPY . /var/app/current/

CMD node index.js
