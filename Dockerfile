FROM node:20.15.0-alpine3.20 AS build

WORKDIR /app

COPY package*.json vite.config.js ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

RUN npm run build

FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración de Nginx Opcional
#COPY nginx.conf /etc/nginx/nginx.conf
 
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]