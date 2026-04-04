import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Activity, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const features = [
    { icon: <ShieldCheck className="w-6 h-6 text-green-600" />, title: 'Secure & Private', desc: 'Compliant with medical data standards and secure hospital-only access.' },
    { icon: <Activity className="w-6 h-6 text-blue-600" />, title: 'Real-time Updates', desc: 'Instant notifications for organ availability and equipment sharing matches.' },
    { icon: <Users className="w-6 h-6 text-primary-600" />, title: 'Hospital Network', desc: 'Connect with hundreds of hospitals to save lives more effectively.' },
  ];

  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-8 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary-600 animate-pulse"></span>
          Trusted by 500+ Hospitals Globally
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight"
        >
          Bridge the Gap <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800">
            Save a Life
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-600 max-w-2xl"
        >
          LifeShare is the leading platform for verified hospitals to share organs, equipment, and medical resources in real-time. Fast, secure, and life-saving.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/signup" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
            Register Hospital <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/login" className="btn-secondary text-lg px-8 py-4">
            Login
          </Link>
        </motion.div>
      </section>

      {/* Stats/Image Showcase */}
      <section className="relative px-4">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card max-w-5xl mx-auto aspect-video bg-gradient-to-br from-slate-900 to-slate-800 p-8 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute inset-0 bg-[url('/logo.jpg')] bg-center bg-no-repeat bg-[length:250px] md:bg-[length:400px] opacity-20 grayscale invert mix-blend-screen pointer-events-none"></div>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full text-center">
            <div>
              <p className="text-4xl font-bold text-white mb-2">1.2K</p>
              <p className="text-slate-400 text-sm">Organs Matched</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">850+</p>
              <p className="text-slate-400 text-sm">Hospitals</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">24/7</p>
              <p className="text-slate-400 text-sm">Real-time Support</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">15m</p>
              <p className="text-slate-400 text-sm">Avg. Match Time</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="card p-8 flex flex-col gap-4 text-center items-center group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{feature.title}</h3>
            <p className="text-slate-600">{feature.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Home;
