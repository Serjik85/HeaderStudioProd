# Инструкции по настройке Raspberry Pi

## Проблема с PM2 и отправкой писем

Судя по логам, есть две основные проблемы:
1. PM2 запускается из неправильной директории (`/home/serhii/` вместо `/home/serhii/www/`)
2. Проблемы с отправкой писем через SMTP-сервер mail.zzz.com.ua

## Решение проблемы с PM2

1. Подключитесь к Raspberry Pi по SSH:
```bash
ssh serhii@192.168.0.144
```

2. Создайте скрипт для перезапуска PM2:
```bash
cat > /home/serhii/www/restart_pm2.sh << 'EOL'
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
EOL

chmod +x /home/serhii/www/restart_pm2.sh
```

3. Запустите скрипт:
```bash
cd /home/serhii/www
./restart_pm2.sh
```

## Решение проблемы с отправкой писем

1. Создайте скрипт для тестирования отправки писем (с расширением .cjs для поддержки CommonJS):
```bash
cat > /home/serhii/www/test_email.cjs << 'EOL'
// Скрипт для тестирования отправки писем
const nodemailer = require('nodemailer');
require('dotenv').config();

// Вывод текущих настроек
console.log('Текущие настройки:');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_SECURE:', process.env.SMTP_SECURE);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***' : 'не указан');
console.log('NOTIFICATION_EMAIL:', process.env.NOTIFICATION_EMAIL);

// Создаем транспорт для отправки писем
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  // Явно указываем использование STARTTLS
  requireTLS: true,
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false // Позволяет использовать самоподписанные сертификаты
  },
  debug: true, // Включаем отладку
  logger: true // Включаем логирование
});

// Функция для проверки настроек транспорта
async function verifyTransport() {
  try {
    console.log('Проверяем соединение с почтовым сервером...');
    await transporter.verify();
    console.log('Соединение установлено успешно!');
    return true;
  } catch (error) {
    console.error('Ошибка соединения с почтовым сервером:', error);
    return false;
  }
}

// Функция для отправки тестового письма
async function sendTestEmail() {
  try {
    console.log('Отправляем тестовое письмо...');
    
    // Формирование текста письма
    const emailText = `
      Это тестовое письмо для проверки работы почтового сервера.
      Время отправки: ${new Date().toLocaleString()}
    `;
    
    // Формирование HTML-версии письма
    const emailHtml = `
      <h2>Тестовое письмо</h2>
      <p>Это тестовое письмо для проверки работы почтового сервера.</p>
      <p>Время отправки: ${new Date().toLocaleString()}</p>
    `;
    
    // Отправка письма
    const info = await transporter.sendMail({
      from: `"Test" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      subject: 'Тестовое письмо',
      text: emailText,
      html: emailHtml
    });
    
    console.log('Письмо отправлено успешно!');
    console.log('ID письма:', info.messageId);
    
    if (info.messageId && (info.response || '').includes('250')) {
      console.log('Статус отправки: OK');
    } else {
      console.log('Статус отправки: Неизвестно');
      console.log('Ответ сервера:', info.response);
    }
    
    return true;
  } catch (error) {
    console.error('Ошибка отправки письма:', error);
    return false;
  }
}

// Запускаем проверку и отправку
(async () => {
  const isConnected = await verifyTransport();
  
  if (isConnected) {
    await sendTestEmail();
  } else {
    console.log('Отправка тестового письма отменена из-за ошибки соединения.');
  }
})();
EOL
```

2. Проверьте настройки файла `.env`:
```bash
cat > /home/serhii/www/.env << 'EOL'
# Email configuration
# ==================
# Настройки почтового сервера для отправки писем с формы обратной связи

# Настройки для mail.zzz.com.ua с STARTTLS
SMTP_HOST=mail.zzz.com.ua
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=hello@header.studio
SMTP_PASS=ваш_пароль

# Email для получения уведомлений о новых заявках
NOTIFICATION_EMAIL=hello@header.studio

# Server configuration
# ===================
PORT=3001
HOST=0.0.0.0
EOL
```

3. Запустите тест отправки писем:
```bash
cd /home/serhii/www
node test_email.cjs
```

## Важные замечания по настройке SMTP

Для mail.zzz.com.ua с STARTTLS:
- Используйте `SMTP_SECURE=false` (это важно для STARTTLS)
- Порт должен быть 587
- Убедитесь, что пароль указан правильно

Если это не поможет, попробуйте:
1. Изменить `SMTP_SECURE=true`
2. Использовать порт 465 вместо 587
3. Проверить, не блокирует ли ваш провайдер порты 587/465

## Проверка логов

После внесения изменений проверьте логи:
```bash
pm2 logs webstudio
```
