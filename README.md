# 🚀 EOM191721UNR

Двійковий калькулятор

## 🛠️ Стек технологій
* **Frontend:** React, Bootstrap 5
* **Backend:** Node.js 
* **База даних / Кешування:** Redis
* **Інше:** dotenv, Docker (опціонально)

## ⚙️ Встановлення та запуск
* **Frontend:** 
npm i, npm build, npm start

* **Backend:**
клонування
git clone https://github.com/Alexsandrua/mywebserver.git
cd mywebserver
Перехід на потрібну гілку:
git checkout EOM191721UNR
Встановлення та запуск
npm i, npm start

Запуск бази REDIS
cd docker, 
sudo docker compose up

### 1. Клонування репозиторію
\`\`\`bash
git clone https://github.com/Alexsandrua/EOM191721UNR.git
cd EOM191721UNR
\`\`\`

### 2. Налаштування змінних оточення
Створіть файл `.env` у корені проєкту та додайте:
\`\`\`env
REDIS_URL=redis://127.0.0.1:6379
PORT=3000
\`\`\`

### 3. Встановлення залежностей
\`\`\`bash
npm install
\`\`\`

### 4. Запуск проєкту
Переконайтеся, що ваш Redis сервер запущений (`docker ps`), а потім виконайте:
\`\`\`bash
npm start
\`\`\`

## 📂 Структура проєкту
* `/EOM191721UNR` - папка Frontend
* `/EOM191721UNR/src` — вихідний код React
* `/mywebserver` - папка Backend
* `/mywebserver/app` — серверна частина на Node.js

## 📝 Ліцензія
Цей проєкт поширюється під ліцензією ISC.
