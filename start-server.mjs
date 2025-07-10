// Скрипт для запуска TypeScript приложения через PM2
// Этот файл использует расширение .mjs для явного указания, что это ES модуль

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawnSync } from 'child_process';
import * as fs from 'fs';

// Создаем функцию require для ES модуля
const require = createRequire(import.meta.url);

// Получаем текущую директорию
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Запуск start-server.mjs...');

try {
  // Загружаем dotenv для переменных окружения
  console.log('Загрузка dotenv...');
  require('dotenv').config();
  
  // Проверяем наличие ts-node
  console.log('Проверка наличия ts-node...');
  try {
    require.resolve('ts-node');
    console.log('ts-node найден');
  } catch (e) {
    console.log('ts-node не найден, устанавливаем...');
    spawnSync('npm', ['install', '-g', 'ts-node'], { stdio: 'inherit' });
  }
  
  // Проверяем наличие основного файла приложения
  const serverIndexPath = join(__dirname, 'server', 'index.ts');
  console.log(`Проверка наличия файла: ${serverIndexPath}`);
  
  if (fs.existsSync(serverIndexPath)) {
    console.log('Файл найден, запускаем приложение...');
    
    // Запускаем TypeScript файл через ts-node
    const tsNode = spawnSync('npx', ['ts-node', serverIndexPath], { 
      stdio: 'inherit',
      env: { ...process.env, NODE_OPTIONS: '--experimental-specifier-resolution=node' }
    });
    
    if (tsNode.error) {
      console.error('Ошибка при запуске ts-node:', tsNode.error);
    }
    
    console.log('Код завершения ts-node:', tsNode.status);
  } else {
    console.error(`ОШИБКА: Файл ${serverIndexPath} не найден!`);
    console.log('Текущая директория:', __dirname);
    console.log('Содержимое директории:', fs.readdirSync(__dirname));
    
    if (fs.existsSync(join(__dirname, 'server'))) {
      console.log('Содержимое директории server:', fs.readdirSync(join(__dirname, 'server')));
    } else {
      console.error('Директория server не найдена!');
    }
  }
} catch (error) {
  console.error('Критическая ошибка при запуске:', error);
  console.error('Стек вызовов:', error.stack);
}
