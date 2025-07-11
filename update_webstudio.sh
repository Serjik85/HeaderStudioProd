#!/bin/bash

# Скрипт для обновления Web Studio Marketer с GitHub
# Должен быть расположен в директории проекта

# Директория проекта
PROJECT_DIR="/home/serhii/www"

# Переходим в директорию проекта
cd $PROJECT_DIR

# Сохраняем важные локальные файлы
echo "Сохраняем локальные настройки..."

# Сохраняем .env файл, если он существует
if [ -f ".env" ]; then
  cp .env .env.backup
  echo "- Сохранена резервная копия .env -> .env.backup"
fi

# Проверяем наличие локальных изменений
if [ -n "$(git status --porcelain)" ]; then
  echo "Обнаружены локальные изменения. Сохраняем их во временное хранилище..."
  git stash save "Local changes before update $(date)"
  echo "- Локальные изменения сохранены в stash"
fi

# Получаем последние изменения из репозитория
echo "Обновление кода из GitHub..."
git fetch origin
git reset --hard origin/main

# Восстанавливаем .env файл
if [ -f ".env.backup" ]; then
  cp .env.backup .env
  echo "- Восстановлен файл .env из резервной копии"
fi

# Устанавливаем зависимости
echo "Установка зависимостей..."
npm install

# Перезапускаем приложение через PM2
echo "Перезапуск приложения..."

# Проверяем, запущено ли приложение в PM2
if pm2 list | grep -q "webstudio"; then
  pm2 restart webstudio
else
  # Если приложение не запущено, запускаем его
  pm2 start start.cjs --name "webstudio"
  pm2 save
fi

echo "Обновление завершено!"
echo "Приложение запущено и доступно по адресу: http://$(hostname -I | awk '{print $1}'):3001"
