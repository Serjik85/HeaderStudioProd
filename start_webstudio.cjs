// Скрипт для запуска TypeScript приложения через PM2
// Этот файл должен иметь расширение .cjs, чтобы использовать синтаксис CommonJS

// Загружаем ts-node для поддержки TypeScript
require('ts-node/register');

// Загружаем dotenv для поддержки переменных окружения из .env файла
require('dotenv').config();

// Запускаем основной файл приложения
require('./server/index.ts');
