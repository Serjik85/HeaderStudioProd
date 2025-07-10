import nodemailer from 'nodemailer';
import { log } from './vite';
import { type InsertContactSubmission } from '@shared/schema';

// Вывод текущих настроек в лог
log('Email настройки:');
log('SMTP_HOST:', process.env.SMTP_HOST);
log('SMTP_PORT:', process.env.SMTP_PORT);
log('SMTP_SECURE:', process.env.SMTP_SECURE);
log('SMTP_USER:', process.env.SMTP_USER);
log('SMTP_PASS:', process.env.SMTP_PASS ? '***' : 'не указан');
log('NOTIFICATION_EMAIL:', process.env.NOTIFICATION_EMAIL);

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
export async function verifyEmailTransport(): Promise<boolean> {
  try {
    await transporter.verify();
    log('Email service is ready to send messages');
    return true;
  } catch (error) {
    log('Email service error:', String(error));
    return false;
  }
}

// Функция для отправки уведомления о новой контактной форме
export async function sendContactNotification(submission: InsertContactSubmission): Promise<boolean> {
  try {
    log('Отправка уведомления о новой заявке...');
    
    // Адрес, на который будут приходить уведомления
    const recipientEmail = process.env.NOTIFICATION_EMAIL;
    
    if (!recipientEmail) {
      log('Ошибка: Не указан адрес для уведомлений (NOTIFICATION_EMAIL)');
      return false;
    }
    
    // Формирование текста письма
    const emailText = `
      Новая заявка с сайта:
      
      Имя: ${submission.name}
      Email: ${submission.email}
      Компания: ${submission.company || 'Не указана'}
      
      Сообщение:
      ${submission.message}
      
      Время отправки: ${new Date().toLocaleString()}
    `;
    
    // Формирование HTML-версии письма
    const emailHtml = `
      <h2>Новая заявка с сайта</h2>
      <p><strong>Имя:</strong> ${submission.name}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Компания:</strong> ${submission.company || 'Не указана'}</p>
      <h3>Сообщение:</h3>
      <p>${submission.message.replace(/\n/g, '<br>')}</p>
      <p><em>Время отправки: ${new Date().toLocaleString()}</em></p>
    `;
    
    // Отправка письма
    const info = await transporter.sendMail({
      from: `"Web Studio" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: 'Новая заявка с сайта Web Studio',
      text: emailText,
      html: emailHtml
    });
    
    log('Письмо отправлено успешно!');
    log('ID письма:', info.messageId);
    
    if (info.messageId && (info.response || '').includes('250')) {
      log('Статус отправки: OK');
    } else {
      log('Статус отправки: Неизвестно');
      log('Ответ сервера:', info.response);
    }
    
    return true;
  } catch (error) {
    log('Ошибка отправки письма:', String(error));
    return false;
  }
}

// Функция для отправки автоответа клиенту
export async function sendAutoReply(submission: InsertContactSubmission): Promise<boolean> {
  try {
    log('Отправка автоответа клиенту...');
    
    if (!submission.email) {
      log('Ошибка: Не указан email клиента для автоответа');
      return false;
    }
    
    // Формирование текста письма
    const emailText = `
      Здравствуйте, ${submission.name}!
      
      Спасибо за ваше обращение в Web Studio. Мы получили ваше сообщение и свяжемся с вами в ближайшее время.
      
      С уважением,
      Команда Web Studio
      
      Время отправки: ${new Date().toLocaleString()}
    `;
    
    // Формирование HTML-версии письма
    const emailHtml = `
      <h2>Здравствуйте, ${submission.name}!</h2>
      <p>Спасибо за ваше обращение в Web Studio.</p>
      <p>Мы получили ваше сообщение и свяжемся с вами в ближайшее время.</p>
      <p>С уважением,<br>Команда Web Studio</p>
      <p><em>Время отправки: ${new Date().toLocaleString()}</em></p>
    `;
    
    // Отправка письма
    const info = await transporter.sendMail({
      from: `"Web Studio" <${process.env.SMTP_USER}>`,
      to: submission.email,
      subject: 'Спасибо за ваше обращение',
      text: emailText,
      html: emailHtml
    });
    
    log('Автоответ отправлен успешно!');
    log('ID письма:', info.messageId);
    
    if (info.messageId && (info.response || '').includes('250')) {
      log('Статус отправки: OK');
    } else {
      log('Статус отправки: Неизвестно');
      log('Ответ сервера:', info.response);
    }
    
    return true;
  } catch (error) {
    log('Ошибка отправки автоответа:', String(error));
    return false;
  }
}
