import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <motion.main 
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="max-w-6xl mx-auto p-4 md:p-8"
      >
        {/* Hero Section */}
        <motion.div 
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            About VoteNow
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Revolutionizing the way communities make decisions through secure and accessible voting
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Content */}
          <motion.div 
            variants={staggerChildren}
            className="space-y-8"
          >
            {/* Mission Section */}
            <motion.section 
              variants={fadeInUp}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                VoteNow is dedicated to transforming the voting experience through innovation and accessibility. 
                We believe every voice matters and strive to make the democratic process seamless and secure.
              </p>
            </motion.section>

            {/* Features Section */}
            <motion.section 
              variants={fadeInUp}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Key Features</h2>
              </div>
              <ul className="space-y-3">
                {['Secure & Anonymous Voting', 'Real-time Results', 'Custom Poll Creation', 'Mobile-friendly Interface'].map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-gray-600"
                  >
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.section>
          </motion.div>

          {/* Right Column - QR Code */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col items-center space-y-6"
          >
            <div className="relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-xl opacity-20"
                animate={{ scale: [1, 1.02, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="relative bg-white p-8 rounded-2xl shadow-xl">
                <img src="QR.png" alt="QR Code" className="w-64 h-64" />
              </div>
            </div>
            <p className="text-gray-600 font-medium">Scan to visit our website</p>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div 
          variants={fadeInUp}
          className="mt-12 text-center"
        >
          <motion.button 
            onClick={() => navigate('/home')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Return to Home
          </motion.button>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default AboutUs;