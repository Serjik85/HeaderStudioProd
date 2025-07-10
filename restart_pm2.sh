#!/bin/bash

# Скрипт для правильного перезапуска приложения на Raspberry Pi

# Путь к проекту
PROJECT_DIR="/home/serhii/www"

# Остановка всех процессов PM2
echo "Останавливаем все процессы PM2..."
pm2 stop all
pm2 delete all

# Переход в директорию проекта
echo "Переходим в директорию проекта: $PROJECT_DIR"
cd $PROJECT_DIR

# Запуск приложения
echo "Запускаем приложение..."
pm2 start server/index.ts --name "webstudio" --interpreter=node -- --require ts-node/register

# Сохранение конфигурации PM2
echo "Сохраняем конфигурацию PM2..."
pm2 save

echo "Готово! Приложение запущено."
echo "Проверьте статус: pm2 list"
echo "Проверьте логи: pm2 logs webstudio"
