# Etapa 1: Construcción
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servidor de producción
FROM nginx:stable-alpine
# Copia los archivos del build de Vite (carpeta dist) al directorio de Nginx
COPY --from:build /app/dist /usr/share/nginx/html
# Copia una configuración personalizada si la tienes, o usa la de por defecto
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]