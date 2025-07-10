# Руководство по настройке Web Studio на Raspberry Pi

## 1. Обновление системы

Сначала обновите систему:

```bash
sudo apt update
sudo apt upgrade -y
```

## 2. Установка Node.js

Установите Node.js (рекомендуется версия 20 LTS):

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Проверьте установку:

```bash
node -v
npm -v
```

## 3. Установка Git (если еще не установлен)

```bash
sudo apt install git -y
```

## 4. Перенос проекта на Raspberry Pi

Есть несколько способов:

### Вариант 1: Клонирование из репозитория (если проект в Git)
```bash
git clone [URL-вашего-репозитория] /home/pi/WebStudioMarketer
```

### Вариант 2: Копирование с вашего компьютера через SCP
На вашем компьютере (не на Raspberry Pi):
```bash
scp -r /Users/serhii/Downloads/WebStudioMarketer pi@[IP-адрес-raspberry]:~/
```

### Вариант 3: Использование USB-накопителя
- Скопируйте проект на USB-накопитель
- Подключите к Raspberry Pi
- Скопируйте файлы:
  ```bash
  mkdir -p ~/WebStudioMarketer
  cp -r /media/pi/[имя-накопителя]/WebStudioMarketer/* ~/WebStudioMarketer/
  ```

## 5. Настройка проекта

Перейдите в директорию проекта и установите зависимости:

```bash
cd ~/WebStudioMarketer
npm install
```

## 6. Настройка порта и IP-адреса

Отредактируйте файл server/index.ts, чтобы сервер слушал на всех интерфейсах:

```bash
nano server/index.ts
```

Найдите строку с настройкой сервера и измените host с "localhost" на "0.0.0.0":

```typescript
server.listen({
  port,
  host: "0.0.0.0",
});
```

## 7. Установка PM2 для управления процессами

PM2 - это менеджер процессов для Node.js приложений, который поможет держать ваше приложение запущенным:

```bash
sudo npm install -g pm2
```

## 8. Запуск приложения через PM2

```bash
cd ~/WebStudioMarketer
pm2 start npm --name "webstudio" -- run dev
```

Настройка автозапуска при перезагрузке:

```bash
pm2 startup
# Выполните команду, которую выдаст предыдущая команда
pm2 save
```

## 9. Настройка доступа извне (опционально)

Если вы хотите, чтобы ваш сайт был доступен из интернета:

1. Настройте переадресацию портов на вашем роутере (порт 3001)
2. Рассмотрите использование сервиса динамического DNS, например, No-IP или DuckDNS

### Настройка динамического DNS (пример с DuckDNS):

1. Зарегистрируйтесь на [DuckDNS](https://www.duckdns.org/)
2. Создайте поддомен и получите токен
3. Установите клиент DuckDNS на Raspberry Pi:

```bash
mkdir -p ~/duckdns
cd ~/duckdns
nano duck.sh
```

Добавьте в файл:
```bash
echo url="https://www.duckdns.org/update?domains=YOUR_DOMAIN&token=YOUR_TOKEN&ip=" | curl -k -o ~/duckdns/duck.log -K -
```

Сделайте скрипт исполняемым:
```bash
chmod 700 duck.sh
```

Добавьте в cron для автоматического обновления:
```bash
crontab -e
```

Добавьте строку:
```
*/5 * * * * ~/duckdns/duck.sh >/dev/null 2>&1
```

## 10. Настройка Nginx (опционально, для продакшн)

Для более профессиональной настройки можно установить Nginx как прокси:

```bash
sudo apt install nginx -y
```

Создайте конфигурационный файл:

```bash
sudo nano /etc/nginx/sites-available/webstudio
```

Добавьте конфигурацию:

```nginx
server {
    listen 80;
    server_name your-domain.com; # или IP-адрес

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Активируйте конфигурацию:

```bash
sudo ln -s /etc/nginx/sites-available/webstudio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 11. Настройка HTTPS с Let's Encrypt (опционально)

Если у вас есть домен и вы хотите настроить HTTPS:

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

## Проверка работы

После настройки ваш сайт должен быть доступен по адресу:
- Локально на Raspberry Pi: http://localhost:3001
- С других устройств в вашей сети: http://[IP-адрес-raspberry]:3001

Для проверки IP-адреса Raspberry Pi выполните:

```bash
hostname -I
```

## Полезные команды для управления приложением

```bash
# Посмотреть статус приложения
pm2 status

# Перезапустить приложение
pm2 restart webstudio

# Остановить приложение
pm2 stop webstudio

# Посмотреть логи
pm2 logs webstudio

# Посмотреть использование ресурсов
pm2 monit
```

## Решение проблем

### Проблема с доступом к порту
Если возникает ошибка EACCES при попытке запустить приложение на порту ниже 1024:
```bash
sudo setcap 'cap_net_bind_service=+ep' $(which node)
```

### Проблема с памятью
Если Raspberry Pi работает медленно из-за нехватки памяти:
```bash
# Создайте файл подкачки
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
# Добавьте в /etc/fstab для постоянного использования
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Автоматический перезапуск при сбое
PM2 уже настроен на автоматический перезапуск, но можно добавить дополнительный мониторинг:
```bash
pm2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u pi --hp /home/pi
pm2 save
```

## Обновление приложения

Когда вам нужно обновить приложение:

```bash
cd ~/WebStudioMarketer
git pull  # если используете Git
npm install  # если были добавлены новые зависимости
pm2 restart webstudio
```
