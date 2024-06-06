FROM node:14 as base

WORKDIR /app

RUN npm install -g typescript

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install

COPY src/server .

RUN npm run build

EXPOSE 8085

CMD ["npx", "nodemon", "/app/src/server.ts"]