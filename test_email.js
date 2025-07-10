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
