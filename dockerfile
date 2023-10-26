# Development stage
FROM node:18 as development
WORKDIR /comunidad-frontend

# Copia el archivo package.json
COPY package*.json ./
RUN npm install

# Copia la carpeta de código fuente
COPY . .

# Define el comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"," --host"]
