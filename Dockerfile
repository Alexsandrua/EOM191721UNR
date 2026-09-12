# Етап 1: Збірка статичних файлів
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Етап 2: Запуск стабільного вебсервера Nginx
FROM nginx:alpine
# Копіюємо згенеровані файли з папки dist (куди Webpack склав білд)
COPY --from=build /app/dist /usr/share/nginx/html

# Записуємо конфіг для Nginx на порт 8000 із підтримкою React Router
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
