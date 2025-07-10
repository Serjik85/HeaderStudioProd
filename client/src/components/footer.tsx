import { Code, Twitter, Linkedin, Dribbble, Github } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { t } = useLanguage();
  
  const serviceLinks = [
    { name: t("customWebDev"), href: "#services" },
    { name: t("uiUxDesign"), href: "#services" },
    { name: t("ecommerceSolutions"), href: "#services" },
    { name: t("performanceOptimization"), href: "#services" },
    { name: t("analyticsSeo"), href: "#services" }
  ];

  const companyLinks = [
    { name: t("aboutUs"), href: "#about" },
    { name: t("capabilities"), href: "#capabilities" },
    { name: t("careers"), href: "#" },
    { name: t("contact"), href: "#contact" },
    { name: t("blog"), href: "#" }
  ];

  const resourceLinks = [
    { name: t("documentation"), href: "#" },
    { name: t("support"), href: "#" },
    { name: t("privacyPolicy"), href: "#" },
    { name: t("termsOfService"), href: "#" },
    { name: t("faq"), href: "#" }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Dribbble, href: "#" },
    { icon: Github, href: "#" }
  ];

  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-blue to-secondary-blue rounded-lg flex items-center justify-center">
                <Code className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold">header.studio</span>
            </div>
            <p className="text-slate-400 mb-4">
              {t("footerDescription")}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("servicesFooter")}</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("company")}</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("resources")}</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            {t("footerCopyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
