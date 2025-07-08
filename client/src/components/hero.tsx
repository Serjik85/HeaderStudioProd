import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              We Build <span className="text-primary-blue">Exceptional</span> Websites That Drive Results
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Transform your business with custom web solutions that captivate your audience and accelerate growth. We craft digital experiences that convert.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary-blue hover:bg-secondary-blue">
                <a href="#contact">Start Your Project</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white">
                <a href="#portfolio">View Our Work</a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Modern web design workspace"
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">20+ Projects</p>
                  <p className="text-slate-600 text-sm">Successfully Delivered</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
