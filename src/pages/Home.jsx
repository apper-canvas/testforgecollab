import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const Home = () => {
  const BriefcaseIcon = getIcon('Briefcase');
  const ArrowRightIcon = getIcon('ArrowRight');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <section className="text-center mb-8 md:mb-12">
        <motion.h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          Welcome to <span className="text-primary">Test</span><span className="text-secondary">Forge</span>
        </motion.h1>
        <p className="text-surface-600 dark:text-surface-400 text-lg max-w-2xl mx-auto">
          Create, manage, and run automated test suites without advanced coding knowledge. 
          Get started by creating your first test suite below.
        </p>
        <div className="mt-6">
          <Link 
            to="/login" 
            className="btn btn-primary mx-2"
          >
            Sign In
          </Link>
          <Link 
            to="/signup" 
            className="btn btn-outline mx-2"
          >
            Create Account
          </Link>
        </div>
      </section>
      
      <section className="my-16 py-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Streamline Your Testing Process</h2>
          <p className="text-lg mb-8">TestForge helps teams create and manage automated tests without requiring advanced coding knowledge.</p>
          <Link to="/signup" className="btn btn-primary">
            Get Started <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;