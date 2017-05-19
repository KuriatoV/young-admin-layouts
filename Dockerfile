FROM mhart/alpine-node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . .

VOLUME /usr/src/app/node_modules

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "prod"]