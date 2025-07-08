import { motion } from "framer-motion";
import { Users, Clock, Headphones } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Our skilled developers and designers bring years of experience and stay current with the latest technologies.",
    color: "text-primary-blue bg-primary-blue/10"
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "We deliver projects on time without compromising quality, using agile methodologies for efficient development.",
    color: "text-accent-orange bg-accent-orange/10"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Ongoing support and maintenance to ensure your website continues to perform at its best.",
    color: "text-green-600 bg-green-100"
  }
];

export function About() {
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
              Why Choose header.studio?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              We're not just developers – we're your digital partners committed to transforming your vision into reality with cutting-edge technology and creative excellence.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
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
