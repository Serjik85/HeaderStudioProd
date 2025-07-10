import nodemailer from 'nodemailer';
import { log } from './vite';
import { type InsertContactSubmission } from '@shared/schema';

// Создаем транспорт для отправки писем
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
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
    // Адрес, на который будут приходить уведомления
    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'admin@example.com';
    
    // Формирование текста письма
    const emailText = `
      Новая заявка с сайта:
      
      Имя: ${submission.name}
      Email: ${submission.email}
      Компания: ${submission.company || 'Не указана'}
      
      Сообщение:
      ${submission.message}
    `;
    
    // Формирование HTML-версии письма
    const emailHtml = `
      <h2>Новая заявка с сайта</h2>
      <p><strong>Имя:</strong> ${submission.name}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Компания:</strong> ${submission.company || 'Не указана'}</p>
      <h3>Сообщение:</h3>
      <p>${submission.message.replace(/\n/g, '<br>')}</p>
    `;
    
    // Отправка письма
    const info = await transporter.sendMail({
      from: `"Web Studio" <${process.env.SMTP_USER || 'webstudio@example.com'}>`,
      to: recipientEmail,
      subject: 'Новая заявка с сайта Web Studio',
      text: emailText,
      html: emailHtml
    });
    
    log('Email sent:', info.messageId);
    return true;
  } catch (error) {
    log('Error sending email:', String(error));
    return false;
  }
}

// Функция для отправки автоответа клиенту
export async function sendAutoReply(submission: InsertContactSubmission): Promise<boolean> {
  try {
    // Формирование текста письма
    const emailText = `
      Здравствуйте, ${submission.name}!
      
      Спасибо за ваше обращение в Web Studio. Мы получили ваше сообщение и свяжемся с вами в ближайшее время.
      
      С уважением,
      Команда Web Studio
    `;
    
    // Формирование HTML-версии письма
    const emailHtml = `
      <h2>Здравствуйте, ${submission.name}!</h2>
      <p>Спасибо за ваше обращение в Web Studio.</p>
      <p>Мы получили ваше сообщение и свяжемся с вами в ближайшее время.</p>
      <p>С уважением,<br>Команда Web Studio</p>
    `;
    
    // Отправка письма
    const info = await transporter.sendMail({
      from: `"Web Studio" <${process.env.SMTP_USER || 'webstudio@example.com'}>`,
      to: submission.email,
      subject: 'Спасибо за ваше обращение',
      text: emailText,
      html: emailHtml
    });
    
    log('Auto-reply sent:', info.messageId);
    return true;
  } catch (error) {
    log('Error sending auto-reply:', String(error));
    return false;
  }
}
