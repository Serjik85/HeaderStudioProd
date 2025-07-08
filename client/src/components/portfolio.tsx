import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "TechFlow E-commerce",
    description: "Modern e-commerce platform with seamless user experience and advanced analytics.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    tags: ["React", "Shopify", "SEO"],
    link: "#"
  },
  {
    title: "ProLegal Services",
    description: "Professional law firm website with client portal and case management system.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    tags: ["Next.js", "CMS", "Portal"],
    link: "#"
  },
  {
    title: "Bistro Deluxe",
    description: "Elegant restaurant website with online reservations and menu management.",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975cd51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    tags: ["Vue.js", "Booking", "Menu"],
    link: "#"
  },
  {
    title: "CloudSync Dashboard",
    description: "Advanced SaaS platform with real-time analytics and team collaboration tools.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    tags: ["React", "Dashboard", "Analytics"],
    link: "#"
  }
];

const tagColors = {
  "React": "bg-primary-blue/10 text-primary-blue",
  "Shopify": "bg-accent-orange/10 text-accent-orange",
  "SEO": "bg-green-100 text-green-600",
  "Next.js": "bg-primary-blue/10 text-primary-blue",
  "CMS": "bg-purple-100 text-purple-600",
  "Portal": "bg-blue-100 text-blue-600",
  "Vue.js": "bg-primary-blue/10 text-primary-blue",
  "Booking": "bg-green-100 text-green-600",
  "Menu": "bg-orange-100 text-orange-600",
  "Dashboard": "bg-purple-100 text-purple-600",
  "Analytics": "bg-blue-100 text-blue-600"
};

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Our Portfolio</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover some of our recent projects that showcase our expertise and creativity
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className={tagColors[tag as keyof typeof tagColors]}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="text-primary-blue font-semibold hover:text-secondary-blue transition-colors flex items-center"
                >
                  View Project <ArrowRight className="ml-1" size={16} />
                </a>
              </div>
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
  );
}
