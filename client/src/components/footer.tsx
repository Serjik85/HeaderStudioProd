import { Code, Twitter, Linkedin, Dribbble, Github } from "lucide-react";

export function Footer() {
  const serviceLinks = [
    { name: "Web Development", href: "#services" },
    { name: "UI/UX Design", href: "#services" },
    { name: "E-commerce", href: "#services" },
    { name: "Mobile Apps", href: "#services" },
    { name: "SEO & Analytics", href: "#services" }
  ];

  const companyLinks = [
    { name: "About Us", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#contact" },
    { name: "Blog", href: "#" }
  ];

  const resourceLinks = [
    { name: "Documentation", href: "#" },
    { name: "Support", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "FAQ", href: "#" }
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
              Creating exceptional web experiences that drive business growth and user engagement.
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
            <h3 className="text-lg font-semibold mb-4">Services</h3>
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
            <h3 className="text-lg font-semibold mb-4">Company</h3>
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
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
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
            © 2024 header.studio. All rights reserved. Built with ❤️ for amazing businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}
