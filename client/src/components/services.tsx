import { motion } from "framer-motion";
import { 
  Code, 
  Palette, 
  ShoppingCart, 
  Rocket, 
  BarChart3,
  Check
} from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Custom Web Development",
    description: "Bespoke websites built with modern technologies, optimized for performance and scalability.",
    features: [
      "Modern Web Technologies",
      "Mobile-First Design",
      "SEO Optimization"
    ],
    color: "text-primary-blue bg-primary-blue/10"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design that creates intuitive experiences and drives conversions.",
    features: [
      "User Research & Testing",
      "Prototyping & Wireframing",
      "Brand Identity Design"
    ],
    color: "text-accent-orange bg-accent-orange/10"
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions",
    description: "Powerful online stores that maximize sales and provide seamless shopping experiences.",
    features: [
      "Custom E-commerce Solutions",
      "Payment Integration",
      "Inventory Management"
    ],
    color: "text-secondary-blue bg-secondary-blue/10"
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    description: "Lightning-fast websites that rank higher and convert better through advanced optimization.",
    features: [
      "Speed Optimization",
      "Core Web Vitals",
      "CDN Integration"
    ],
    color: "text-green-500 bg-green-500/10"
  },

  {
    icon: BarChart3,
    title: "Analytics & SEO",
    description: "Data-driven insights and search engine optimization to grow your online presence.",
    features: [
      "Google Analytics Setup",
      "Keyword Research",
      "Content Strategy"
    ],
    color: "text-red-500 bg-red-500/10"
  }
];

export function Services() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Our Services</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We offer comprehensive web solutions tailored to your business needs and goals
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
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
                {service.features.map((feature) => (
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
