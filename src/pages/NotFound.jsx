import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const AlertCircleIcon = getIcon('AlertCircle');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
    >
      <div className="w-24 h-24 mb-8 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
        <AlertCircleIcon className="w-12 h-12 text-primary" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        404
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Page Not Found
      </h2>
      
      <p className="text-surface-600 dark:text-surface-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      
      <Link 
        to="/"
        className="btn btn-primary inline-flex items-center space-x-2 group"
      >
        <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </Link>
    </motion.div>
  );
};

export default NotFound;