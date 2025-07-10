import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Mail, MapPin, Twitter, Linkedin, Dribbble, Github } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t("messageSuccess"),
        description: t("messageSuccessDesc"),
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        message: ""
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("messageError"),
        description: error.message || t("messageErrorDesc"),
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t("fillRequired"),
        description: t("fillRequiredDesc"),
        variant: "destructive",
      });
      return;
    }
    mutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t("email"),
      value: "hello@header.studio",
      color: "text-primary-blue bg-primary-blue/10"
    },
    {
      icon: MapPin,
      title: t("location"),
      value: "Aarhus, Denmark",
      color: "text-green-600 bg-green-100"
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", color: "hover:bg-primary-blue hover:text-white" },
    { icon: Linkedin, href: "#", color: "hover:bg-primary-blue hover:text-white" },
    { icon: Dribbble, href: "#", color: "hover:bg-primary-blue hover:text-white" },
    { icon: Github, href: "#", color: "hover:bg-primary-blue hover:text-white" }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">{t("contactTitle")}</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t("contactSubtitle")}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-6">{t("getInTouch")}</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${info.color}`}>
                    <info.icon size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{info.title}</p>
                    <p className="text-slate-600">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">{t("followUs")}</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`w-10 h-10 bg-primary-blue/10 rounded-lg flex items-center justify-center transition-colors ${social.color}`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-slate-800 mb-6">{t("sendMessage")}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">{t("nameLabel")} *</label>
                  <Input
                    type="text"
                    placeholder={t("namePlaceholder")}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-2">{t("emailLabel")} *</label>
                  <Input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-slate-700 font-medium mb-2">{t("companyLabel")}</label>
                <Input
                  type="text"
                  placeholder={t("companyPlaceholder")}
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                />
              </div>
              

              
              <div>
                <label className="block text-slate-700 font-medium mb-2">{t("messageLabel")} *</label>
                <Textarea
                  rows={4}
                  placeholder={t("messagePlaceholder")}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-primary-blue hover:bg-secondary-blue"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? t("sending") : t("sendMessageBtn")}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
