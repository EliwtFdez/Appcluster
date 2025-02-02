FROM node:18-alpine AS build

WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Angular
RUN npm run build -- --configuration production

# Usar una imagen de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos de construcción de Angular a la carpeta de Nginx
COPY --from=build /app/dist/web-app-cluster/browser /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]