import { motion } from "framer-motion";
import { 
  Code, 
  Palette, 
  ShoppingCart, 
  Rocket, 
  BarChart3,
  Check
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const getServices = (t: (key: string) => string) => [
  {
    icon: Code,
    title: t("customWebDev"),
    description: t("customWebDevDesc"),
    features: [
      "Modern Web Technologies",
      "Mobile-First Design",
      "SEO Optimization"
    ],
    color: "text-primary-blue bg-primary-blue/10"
  },
  {
    icon: Palette,
    title: t("uiUxDesign"),
    description: t("uiUxDesignDesc"),
    features: [
      "User Research & Testing",
      "Prototyping & Wireframing",
      "Brand Identity Design"
    ],
    color: "text-accent-orange bg-accent-orange/10"
  },
  {
    icon: ShoppingCart,
    title: t("ecommerceSolutions"),
    description: t("ecommerceSolutionsDesc"),
    features: [
      "Custom E-commerce Solutions",
      "Payment Integration",
      "Inventory Management"
    ],
    color: "text-secondary-blue bg-secondary-blue/10"
  },
  {
    icon: Rocket,
    title: t("performanceOptimization"),
    description: t("performanceOptimizationDesc"),
    features: [
      "Speed Optimization",
      "Core Web Vitals",
      "CDN Integration"
    ],
    color: "text-green-500 bg-green-500/10"
  },
  {
    icon: BarChart3,
    title: t("analyticsSeo"),
    description: t("analyticsSeoDesc"),
    features: [
      "Google Analytics Setup",
      "Keyword Research",
      "Content Strategy"
    ],
    color: "text-red-500 bg-red-500/10"
  }
];

export function Services() {
  const { t } = useLanguage();
  const services = getServices(t);
  
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">{t("servicesTitle")}</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t("servicesSubtitle")}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any, index: number) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${service.color}`}>
                <service.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">{service.title}</h3>
              <p className="text-slate-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature: string) => (
                  <li key={feature} className="flex items-center text-slate-600">
                    <Check className="text-green-500 mr-3" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
