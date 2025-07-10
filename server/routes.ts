import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactNotification, sendAutoReply, verifyEmailTransport } from "./emailService";
import { log } from "./vite";

export async function registerRoutes(app: Express): Promise<Server> {
  // Проверяем настройки email при запуске сервера
  verifyEmailTransport().catch(err => {
    log('Warning: Email service not configured properly:', err);
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      
      // Отправляем уведомление администратору
      sendContactNotification(validatedData).catch(err => {
        log('Error sending notification email:', err);
      });
      
      // Отправляем автоответ клиенту
      sendAutoReply(validatedData).catch(err => {
        log('Error sending auto-reply email:', err);
      });
      
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
