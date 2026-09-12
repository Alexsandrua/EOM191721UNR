# Етап 1: Збірка проєкту
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Етап 2: Роздача через Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Додаємо базовий конфіг для підтримки React Router (try_files)
RUN echo 'server { \
    listen 8000; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]
