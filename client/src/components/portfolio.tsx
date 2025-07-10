import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Database, 
  Zap, 
  Shield, 
  Smartphone, 
  Globe,
  CheckCircle,
  ArrowRight,
  Clock,
  Users
} from "lucide-react";

const capabilities = [
  {
    icon: Code2,
    title: "Modern Technologies",
    description: "We use cutting-edge frameworks and tools to build robust, scalable applications.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    color: "text-primary-blue bg-primary-blue/10"
  },
  {
    icon: Database,
    title: "Database Design",
    description: "Expert database architecture and optimization for high-performance applications.",
    technologies: ["PostgreSQL", "MySQL", "Redis", "MongoDB"],
    color: "text-green-600 bg-green-100"
  },
  {
    icon: Zap,
    title: "Performance Focus",
    description: "Lightning-fast websites optimized for speed and user experience.",
    technologies: ["CDN", "Caching", "Optimization", "Core Web Vitals"],
    color: "text-accent-orange bg-accent-orange/10"
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Built-in security measures to protect your business and users.",
    technologies: ["SSL", "Authentication", "Data Protection", "GDPR"],
    color: "text-red-500 bg-red-100"
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Perfect experience across all devices and screen sizes.",
    technologies: ["Mobile-First", "Responsive", "Touch-Friendly", "PWA"],
    color: "text-purple-500 bg-purple-100"
  },
  {
    icon: Globe,
    title: "SEO Optimized",
    description: "Built for search engines to maximize your online visibility.",
    technologies: ["Meta Tags", "Structured Data", "Sitemap", "Analytics"],
    color: "text-blue-500 bg-blue-100"
  }
];

const workProcess = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "We understand your business goals, target audience, and technical requirements.",
    icon: Users,
    color: "text-primary-blue"
  },
  {
    step: "02",
    title: "Design & Prototype",
    description: "Create wireframes and interactive prototypes to visualize your solution.",
    icon: Code2,
    color: "text-accent-orange"
  },
  {
    step: "03",
    title: "Development",
    description: "Build your website using modern technologies and best practices.",
    icon: Zap,
    color: "text-green-600"
  },
  {
    step: "04",
    title: "Testing & Launch",
    description: "Thorough testing, optimization, and seamless deployment to production.",
    icon: CheckCircle,
    color: "text-blue-600"
  }
];

export function Portfolio() {
  return (
    <>
      {/* Our Capabilities Section */}
      <section id="capabilities" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Our Capabilities</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We leverage the latest technologies and best practices to deliver exceptional web solutions
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${capability.color}`}>
                  <capability.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{capability.title}</h3>
                <p className="text-slate-600 mb-6">{capability.description}</p>
                <div className="flex flex-wrap gap-2">
                  {capability.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">How We Work</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our proven process ensures successful delivery of every project
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workProcess.map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className={`w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 ${process.color}`}>
                  <process.icon size={28} />
                </div>
                <div className={`text-6xl font-bold opacity-10 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 ${process.color}`}>
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{process.title}</h3>
                <p className="text-slate-600">{process.description}</p>
                {index < workProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-8 h-0.5 bg-slate-200 transform -translate-y-1/2"></div>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="bg-primary-blue hover:bg-secondary-blue">
              <a href="#contact">Start Your Project Today</a>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
