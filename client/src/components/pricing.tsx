import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Starter",
    price: "$2,499",
    period: "one-time",
    description: "Perfect for small businesses looking to establish their online presence",
    features: [
      "5-page custom website",
      "Mobile-responsive design",
      "Basic SEO setup",
      "Contact form integration",
      "3 months support"
    ],
    popular: false,
    buttonStyle: "bg-slate-200 text-slate-800 hover:bg-slate-300"
  },
  {
    name: "Professional",
    price: "$4,999",
    period: "one-time",
    description: "Ideal for growing businesses that need advanced features and functionality",
    features: [
      "10-page custom website",
      "Advanced UI/UX design",
      "CMS integration",
      "E-commerce functionality",
      "Analytics setup",
      "6 months support"
    ],
    popular: true,
    buttonStyle: "bg-white text-primary-blue hover:bg-slate-100"
  },
  {
    name: "Enterprise",
    price: "$9,999",
    period: "one-time",
    description: "Complete solution for large businesses with complex requirements",
    features: [
      "Unlimited pages",
      "Custom web application",
      "Advanced integrations",
      "Database design",
      "Performance optimization",
      "12 months support"
    ],
    popular: false,
    buttonStyle: "bg-slate-200 text-slate-800 hover:bg-slate-300"
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Choose Your Package</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Flexible pricing options designed to fit your business needs and budget
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-8 relative transition-all duration-300 ${
                plan.popular 
                  ? "bg-primary-blue text-white transform hover:scale-105 shadow-xl" 
                  : "bg-slate-50 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent-orange text-white">Most Popular</Badge>
                </div>
              )}
              
              <h3 className={`text-2xl font-bold mb-4 ${plan.popular ? "text-white" : "text-slate-800"}`}>
                {plan.name}
              </h3>
              
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-primary-blue"}`}>
                  {plan.price}
                </span>
                <span className={`ml-2 ${plan.popular ? "text-white/80" : "text-slate-600"}`}>
                  {plan.period}
                </span>
              </div>
              
              <p className={`mb-6 ${plan.popular ? "text-white/80" : "text-slate-600"}`}>
                {plan.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className={`mr-3 ${plan.popular ? "text-green-400" : "text-green-500"}`} size={16} />
                    <span className={plan.popular ? "text-white" : "text-slate-600"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Button asChild className={`w-full ${plan.buttonStyle}`}>
                <a href="#contact">Get Started</a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
