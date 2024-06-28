FROM node:20.15.0-alpine3.20 AS base

ENV DIR /app

WORKDIR $DIR

FROM base AS build

COPY package*.json ./
COPY vite.config.js ./

RUN npm ci

COPY . .

RUN npm run build && \
    npm prune --production

FROM base AS production

ENV USER node

RUN npm install -g serve

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY package.json .

EXPOSE $VITE_PORT

USER $USER

CMD ["serve", "-s", "dist", "-l", "8080"]

