FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
# Встановлюємо абсолютно всі залежності (включаючи devDependencies для Webpack)
RUN npm install
COPY . .
EXPOSE 8000
# Запускаємо сервер розробки (команда має збігатися зі скриптом у package.json, наприклад, "npm run start")
CMD ["npm", "start"]
