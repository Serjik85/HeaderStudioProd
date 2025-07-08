import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    position: "CEO, TechFlow Solutions",
    content: "header.studio completely transformed our online presence. The new website increased our conversions by 300% and the team was incredibly professional throughout the process.",
    initials: "SM",
    color: "bg-primary-blue/10 text-primary-blue"
  },
  {
    name: "Michael Johnson",
    position: "Founder, ProLegal Services",
    content: "Working with header.studio was a game-changer for our business. They delivered exactly what we needed, on time and within budget. Highly recommended!",
    initials: "MJ",
    color: "bg-accent-orange/10 text-accent-orange"
  },
  {
    name: "Emma Rodriguez",
    position: "Marketing Director, Bistro Deluxe",
    content: "The attention to detail and creative approach from header.studio exceeded our expectations. Our new website perfectly represents our brand and drives real results.",
    initials: "ER",
    color: "bg-green-100 text-green-600"
  }
];

export function Testimonials() {
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
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">What Our Clients Say</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Don't just take our word for it – hear from businesses that have transformed their digital presence with us
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
