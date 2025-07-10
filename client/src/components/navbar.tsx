import { useState, useEffect } from "react";
import { Code, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#services", label: t("services") },
    { href: "#capabilities", label: t("capabilities") },
    { href: "#about", label: t("about") },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white/95 backdrop-blur-md"
    } border-b border-slate-200`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-blue to-secondary-blue rounded-lg flex items-center justify-center">
              <Code className="text-white text-sm" />
            </div>
            <span className="text-xl font-bold text-slate-800">header.studio</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-600 hover:text-primary-blue transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'da' : 'en')}
              className="text-slate-600 hover:text-primary-blue"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === 'en' ? 'DA' : 'EN'}
            </Button>
            <Button asChild className="bg-primary-blue hover:bg-secondary-blue">
              <a href="#contact">{t("getStarted")}</a>
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-slate-600 hover:text-primary-blue transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button
                variant="ghost"
                onClick={() => setLanguage(language === 'en' ? 'da' : 'en')}
                className="text-slate-600 hover:text-primary-blue justify-start"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Switch to Danish' : 'Switch to English'}
              </Button>
              <Button asChild className="bg-primary-blue hover:bg-secondary-blue w-full">
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  {t("getStarted")}
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
