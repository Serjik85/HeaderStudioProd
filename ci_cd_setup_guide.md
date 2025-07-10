# Руководство по настройке CI/CD для Web Studio на Raspberry Pi

Это руководство поможет вам настроить простой CI/CD процесс для автоматического обновления вашего сайта на Raspberry Pi при пуше в GitHub.

## Базовая настройка с использованием cron

### 1. Создайте скрипт обновления

```bash
nano /home/serhii/update_webstudio.sh
```

Добавьте следующий код:

```bash
#!/bin/bash

# Переход в директорию проекта
cd /home/serhii/WebStudioMarketer

# Запись времени начала обновления в лог
echo "=== Update started at $(date) ===" >> /home/serhii/update_log.txt

# Получение последних изменений из GitHub
git fetch origin
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

# Проверка наличия изменений
if [ "$LOCAL" != "$REMOTE" ]; then
    echo "Changes detected, updating..." >> /home/serhii/update_log.txt
    
    # Получение изменений
    git pull origin main
    
    # Установка новых зависимостей
    npm install
    
    # Перезапуск приложения
    pm2 restart webstudio
    
    echo "Update completed successfully!" >> /home/serhii/update_log.txt
else
    echo "No changes detected." >> /home/serhii/update_log.txt
fi

echo "=== Update finished at $(date) ===" >> /home/serhii/update_log.txt
echo "" >> /home/serhii/update_log.txt
```

### 2. Сделайте скрипт исполняемым

```bash
chmod +x /home/serhii/update_webstudio.sh
```

### 3. Настройте cron для регулярного запуска скрипта

```bash
crontab -e
```

Добавьте строку для проверки обновлений каждые 5 минут:

```
*/5 * * * * /home/serhii/update_webstudio.sh
```

## Расширенная настройка с использованием webhook

Для более быстрого обновления можно настроить webhook, который будет запускать обновление сразу после пуша в GitHub.

### 1. Установите необходимые пакеты

```bash
sudo apt install -y nodejs npm
sudo npm install -g pm2 webhook-relay
```

### 2. Создайте скрипт для webhook

```bash
nano /home/serhii/webhook.js
```

Добавьте код:

```javascript
const http = require('http');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        
        // Проверка, что это пуш в ветку main
        if (payload.ref === 'refs/heads/main') {
          console.log('Push to main detected, updating...');
          
          // Запуск скрипта обновления
          exec('/home/serhii/update_webstudio.sh', (error, stdout, stderr) => {
            if (error) {
              console.error(`Error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
          });
        }
        
        res.statusCode = 200;
        res.end('Webhook received');
      } catch (e) {
        console.error('Error parsing webhook payload:', e);
        res.statusCode = 400;
        res.end('Invalid payload');
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});
```

### 3. Запустите webhook-сервер через PM2

```bash
pm2 start /home/serhii/webhook.js --name "github-webhook"
pm2 save
```

### 4. Настройте порт в роутере (если нужен доступ извне)

- Перенаправьте порт 9000 на ваш Raspberry Pi

### 5. Добавьте webhook в GitHub

1. Перейдите в настройки вашего репозитория на GitHub
2. Выберите "Webhooks" -> "Add webhook"
3. В поле "Payload URL" введите `http://ваш-ip-или-домен:9000/webhook`
4. Выберите "Content type": `application/json`
5. Выберите "Just the push event"
6. Нажмите "Add webhook"

## Проверка работы CI/CD

После настройки, проверьте работу CI/CD:

1. Внесите изменения в проект на вашем компьютере
2. Отправьте изменения в GitHub:
   ```bash
   git add .
   git commit -m "Test CI/CD"
   git push
   ```
3. Проверьте лог обновлений на Raspberry Pi:
   ```bash
   cat /home/serhii/update_log.txt
   ```

## Устранение неполадок

### Проблема: Скрипт не запускается по расписанию

Проверьте журнал cron:
```bash
grep CRON /var/log/syslog
```

### Проблема: Webhook не получает уведомления от GitHub

1. Проверьте, что порт 9000 открыт и перенаправлен правильно
2. Проверьте логи webhook-сервера:
   ```bash
   pm2 logs github-webhook
   ```
3. Проверьте настройки webhook в GitHub (раздел "Recent Deliveries")

### Проблема: Обновление не применяется

1. Проверьте права доступа к директории проекта:
   ```bash
   ls -la /home/serhii/WebStudioMarketer
   ```
2. Проверьте, что пользователь имеет права на запуск git и npm:
   ```bash
   sudo -u serhii git --version
   sudo -u serhii npm --version
   ```

## Дополнительные настройки

### Ротация логов

Чтобы лог-файл не становился слишком большим:

```bash
nano /home/serhii/rotate_logs.sh
```

Добавьте:
```bash
#!/bin/bash
if [ -f /home/serhii/update_log.txt ] && [ $(stat -c%s /home/serhii/update_log.txt) -gt 1048576 ]; then
  mv /home/serhii/update_log.txt /home/serhii/update_log.txt.old
  touch /home/serhii/update_log.txt
fi
```

Сделайте исполняемым и добавьте в cron:
```bash
chmod +x /home/serhii/rotate_logs.sh
crontab -e
```

Добавьте:
```
0 0 * * * /home/serhii/rotate_logs.sh
```

### Уведомления об обновлениях (опционально)

Если вы хотите получать уведомления об успешных обновлениях, можно настроить отправку email или уведомлений через Telegram бота.
