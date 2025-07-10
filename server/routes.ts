import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactNotification, sendAutoReply, verifyEmailTransport } from "./emailService";
import { log } from "./vite";

export async function registerRoutes(app: Express): Promise<Server> {
  // Проверяем настройки email при запуске сервера
  try {
    log('Проверка настроек почтового сервера...');
    const isEmailConfigured = await verifyEmailTransport();
    if (isEmailConfigured) {
      log('Почтовый сервер настроен корректно и готов к отправке писем');
    } else {
      log('ПРЕДУПРЕЖДЕНИЕ: Не удалось подключиться к почтовому серверу. Отправка писем может не работать.');
    }
  } catch (err) {
    log('ОШИБКА: Не удалось проверить настройки почтового сервера:', String(err));
  }

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      log('Форма успешно сохранена в базе, ID:', submission.id);
      
      // Отправляем уведомление администратору
      try {
        log('Пытаемся отправить уведомление администратору...');
        const notificationSent = await sendContactNotification(validatedData);
        if (notificationSent) {
          log('Уведомление администратору успешно отправлено');
        } else {
          log('Ошибка: Уведомление администратору не отправлено');
        }
      } catch (err) {
        log('Критическая ошибка при отправке уведомления:', String(err));
      }
      
      // Отправляем автоответ клиенту
      try {
        log('Пытаемся отправить автоответ клиенту...');
        const autoReplySent = await sendAutoReply(validatedData);
        if (autoReplySent) {
          log('Автоответ клиенту успешно отправлен');
        } else {
          log('Ошибка: Автоответ клиенту не отправлен');
        }
      } catch (err) {
        log('Критическая ошибка при отправке автоответа:', String(err));
      }
      
      res.json({ success: true, id: submission.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
