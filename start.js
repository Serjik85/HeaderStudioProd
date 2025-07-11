#!/usr/bin/env node

// Этот файл должен быть обычным JavaScript файлом (не ES модуль)
// Он будет использоваться для запуска TypeScript приложения

// Регистрируем ts-node для обработки .ts файлов
try {
  console.log('Регистрация ts-node для обработки TypeScript файлов...');
  
  // Загружаем dotenv для переменных окружения
  require('dotenv').config();
  
  // Регистрируем ts-node
  require('ts-node').register({
    transpileOnly: true,
    compilerOptions: {
      module: 'commonjs'
    }
  });
  
  console.log('ts-node успешно зарегистрирован');
  
  // Запускаем основной файл приложения
  console.log('Запуск server/index.ts...');
  require('./server/index.ts');
} catch (error) {
  console.error('Ошибка при запуске приложения:', error);
  process.exit(1);
}
