import { motion } from "framer-motion";
import { Users, Clock, Headphones } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const getFeatures = (t: (key: string) => string) => [
  {
    icon: Users,
    title: t("expertTeam"),
    description: t("expertTeamDesc"),
    color: "text-primary-blue bg-primary-blue/10"
  },
  {
    icon: Clock,
    title: t("fastDelivery"),
    description: t("fastDeliveryDesc"),
    color: "text-accent-orange bg-accent-orange/10"
  },
  {
    icon: Headphones,
    title: t("support247"),
    description: t("support247Desc"),
    color: "text-green-600 bg-green-100"
  }
];

export function About() {
  const { t } = useLanguage();
  const features = getFeatures(t);
  
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              {t("aboutTitle")}
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              {t("aboutSubtitle")}
            </p>
            
            <div className="space-y-6">
              {features.map((feature: any, index: number) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${feature.color}`}>
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Professional development team collaborating"
              className="rounded-2xl shadow-lg w-full h-auto"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150"
                alt="Developer working on laptop"
                className="w-24 h-18 object-cover rounded-lg"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=150"
                alt="Web development process"
                className="w-24 h-18 object-cover rounded-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
