import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const getTestimonials = (t: (key: string) => string) => [
  {
    name: t("testimonial1Name"),
    position: t("testimonial1Position"),
    content: t("testimonial1Content"),
    initials: "SM",
    color: "bg-primary-blue/10 text-primary-blue"
  },
  {
    name: t("testimonial2Name"),
    position: t("testimonial2Position"),
    content: t("testimonial2Content"),
    initials: "MJ",
    color: "bg-accent-orange/10 text-accent-orange"
  },
  {
    name: t("testimonial3Name"),
    position: t("testimonial3Position"),
    content: t("testimonial3Content"),
    initials: "ER",
    color: "bg-green-100 text-green-600"
  }
];

export function Testimonials() {
  const { t } = useLanguage();
  
  // Get translated testimonials
  const testimonials = getTestimonials(t);
  
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">{t("testimonialsTitle")}</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t("testimonialsSubtitle")}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${testimonial.color}`}>
                  <span className="font-bold">{testimonial.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{testimonial.name}</p>
                  <p className="text-slate-600 text-sm">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
