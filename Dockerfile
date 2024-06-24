FROM node:alpine3.19 as BUILD

WORKDIR /app

COPY package*.json  .

COPY vite.config.js .

RUN npm ci

COPY . .

RUN npm run build

FROM node:alpine3.19 as PRODUCTION

WORKDIR /app

RUN npm install -g serve

COPY --from=BUILD /app/dist/ /app/dist/

COPY package.json .

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]

