// Скрипт для запуска TypeScript приложения через PM2
// Этот файл должен иметь расширение .cjs, чтобы использовать синтаксис CommonJS

console.log('Запуск start_webstudio.cjs...');

try {
  // Проверяем наличие необходимых модулей
  console.log('Загрузка ts-node/register...');
  require('ts-node/register');
  
  console.log('Загрузка dotenv...');
  require('dotenv').config();
  
  // Проверяем наличие основного файла приложения
  const fs = require('fs');
  const path = require('path');
  
  const serverIndexPath = path.join(__dirname, 'server', 'index.ts');
  console.log(`Проверка наличия файла: ${serverIndexPath}`);
  
  if (fs.existsSync(serverIndexPath)) {
    console.log('Файл найден, запускаем приложение...');
    require(serverIndexPath);
  } else {
    console.error(`ОШИБКА: Файл ${serverIndexPath} не найден!`);
    console.log('Текущая директория:', __dirname);
    console.log('Содержимое директории:', fs.readdirSync(__dirname));
    
    if (fs.existsSync(path.join(__dirname, 'server'))) {
      console.log('Содержимое директории server:', fs.readdirSync(path.join(__dirname, 'server')));
    } else {
      console.error('Директория server не найдена!');
    }
  }
} catch (error) {
  console.error('Критическая ошибка при запуске:', error);
  console.error('Стек вызовов:', error.stack);
}
