import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight, Star, Users, Download, Zap } from "lucide-react";

const LandingPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animations
    const tl = gsap.timeline();
    tl.from(".hero-title", {
      duration: 1,
      y: 50,
      opacity: 1,
      ease: "power3.out",
      immediateRender: false,
    })
      .from(
        ".hero-subtitle",
        {
          duration: 0.8,
          y: 50,
          opacity: 1,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        ".hero-cta",
        {
          duration: 0.8,
          y: 50,
          opacity: 1,
          ease: "power3.out",
        },
        "-=0.3"
      );

    // Stats animation
    gsap.from(".stat-item", {
      duration: 0.8,
      y: 50,
      opacity: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
      },
    });
  }, []);

  const stats = [
    { icon: Users, value: "100+", label: "Happy Customers" },
    { icon: Download, value: "50+", label: "Templates Sold" },
    { icon: Star, value: "4.9", label: "Average Rating" },
    { icon: Zap, value: "24/7", label: "Support" },
  ];

  const features = [
    {
      title: "Professional Design",
      description:
        "Every template is crafted with attention to detail, looks standard, and follows modern design principles.",
      icon: "🎨",
    },
    {
      title: "Mobile Responsive",
      description:
        "All templates are fully responsive and look great on any device—mobile, tablet, or desktop.",
      icon: "📱",
    },
    {
      title: "Easy Customization",
      description:
        "Fully customizable with clean code, no copyrights issues, and simple setup for your needs.",
      icon: "⚡",
    },
    {
      title: "Fast Loading",
      description:
        "Optimized for performance with fast loading times for a smooth browsing experience.",
      icon: "🚀",
    },
    {
      title: "Fresher Friendly",
      description:
        "All templates are specially designed for fresh graduates and job seekers, making your profile stand out.",
      icon: "🎓",
    },
    {
      title: "GitHub & Deployment",
      description:
        "I will deploy your portfolio and provide a link. If you want, I’ll guide you to set it up on GitHub in just 3 simple steps.",
      icon: "🌐",
    },
    {
      title: "Boost Your Career",
      description:
        "Add your portfolio link to resumes, LinkedIn, Naukri, Internshala, and job applications to increase visibility.",
      icon: "📌",
    },
    {
      title: "Full Support",
      description:
        "Not just sold—I’ll provide full support and assistance to make sure your portfolio works perfectly.",
      icon: "🤝",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22%2F%3E%3Ccircle%20cx%3D%2213%22%20cy%3D%2213%22%20r%3D%223%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40"></div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              🚀 Launch Your Career Today
            </div>
          </motion.div>

          <h1 className="hero-title text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Build Your Dream
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent">
              {" "}
              Portfolio
            </span>
            <br />
            in Minutes
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Choose from ready-made professional portfolio templates designed for
            fresh graduates and job seekers. Stand out from the crowd with
            stunning designs.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/templates"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Templates
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="text-sm text-gray-500">
              ⭐ Over 100+ satisfied customers
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Templates?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We create premium portfolio templates that help you land your
              dream job.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Your Portfolio?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who've launched their careers with
            our templates.
          </p>
          <Link
            to="/templates"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Building Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
