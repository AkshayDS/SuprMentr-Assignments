// ============================================================
// pages/About.jsx — Animated About Page
// ============================================================
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const About = () => {
  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="pt-10 pb-20 overflow-hidden">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 pb-16">
        <motion.div variants={fadeUp} className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-accent/10 text-accent font-bold text-sm tracking-widest uppercase mb-6 border border-accent/20">
          Our Story
        </motion.div>
        <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight max-w-4xl mx-auto">
          Elevating Your Game, <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dark">One Match at a Time.</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          At AeroSports, we believe that premium gear shouldn't be out of reach. We combine performance, design, and affordability to help athletes push their boundaries.
        </motion.p>
      </section>

      {/* Value Props Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white border-y border-slate-200/60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div variants={fadeUp} className="text-center group">
            <div className="w-20 h-20 mx-auto bg-slate-50 rounded-3xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300">
               <span className="text-3xl text-slate-400 group-hover:text-accent transition-colors">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Premium Quality</h3>
            <p className="text-slate-500 leading-relaxed">We source top-tier materials to ensure our equipment withstands the toughest of matches.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center group">
            <div className="w-20 h-20 mx-auto bg-slate-50 rounded-3xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300">
               <span className="text-3xl text-slate-400 group-hover:text-accent transition-colors">🌍</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Sustainable Reach</h3>
            <p className="text-slate-500 leading-relaxed">Partnering with ethical manufacturers globally to bring you gear you can feel good about playing in.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center group">
            <div className="w-20 h-20 mx-auto bg-slate-50 rounded-3xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-accent/10 group-hover:border-accent/20 transition-all duration-300">
               <span className="text-3xl text-slate-400 group-hover:text-accent transition-colors">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Community First</h3>
            <p className="text-slate-500 leading-relaxed">We are more than a store. We are a community of athletes helping each other grow.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-24 text-center">
        <motion.div variants={fadeUp} className="bg-slate-900 rounded-[2.5rem] p-12 md:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-accent/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-accent/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">Ready to Upgrade Your Gear?</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-10 text-lg relative z-10">
            Join thousands of athletes who trust AeroSports for their complete sporting needs.
          </p>
          <Link to="/products" className="relative z-10 inline-flex items-center px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent-light shadow-lg shadow-accent/20 transition-all hover:-translate-y-1">
            Shop the Collection
            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </motion.div>
      </section>

    </motion.div>
  );
};

export default About;
