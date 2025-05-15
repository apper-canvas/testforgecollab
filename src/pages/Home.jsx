import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';
import { toast } from 'react-toastify';

const Home = () => {
  const [testSuites, setTestSuites] = useState(() => {
    const saved = localStorage.getItem('testSuites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const FolderPlusIcon = getIcon('FolderPlus');
  const BeakerIcon = getIcon('Beaker');
  const CheckCircleIcon = getIcon('CheckCircle');
  const ClockIcon = getIcon('Clock');
  const BriefcaseIcon = getIcon('Briefcase');
  
  useEffect(() => {
    localStorage.setItem('testSuites', JSON.stringify(testSuites));
  }, [testSuites]);

  const addTestSuite = (newSuite) => {
    setTestSuites([...testSuites, newSuite]);
    toast.success("Test suite created successfully!");
  };

  const deleteTestSuite = (id) => {
    setTestSuites(testSuites.filter(suite => suite.id !== id));
    toast.success("Test suite deleted successfully!");
  };

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
      </section>

      <MainFeature onAddTestSuite={addTestSuite} />

      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Your Test Suites</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => document.getElementById('create-test-suite').scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-primary"
            >
              <FolderPlusIcon className="w-5 h-5 mr-2" />
              <span>New Suite</span>
            </button>
          </div>
        </div>

        {testSuites.length === 0 ? (
          <div className="bg-surface-50 dark:bg-surface-800/50 border border-dashed border-surface-300 dark:border-surface-700 rounded-xl p-8 text-center">
            <BeakerIcon className="w-12 h-12 mx-auto text-surface-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No test suites yet</h3>
            <p className="text-surface-500 dark:text-surface-400 mb-4">
              Create your first test suite to start automating your testing process.
            </p>
            <button
              onClick={() => document.getElementById('create-test-suite').scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-outline"
            >
              Create Test Suite
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testSuites.map((suite) => (
              <motion.div
                key={suite.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card hover:shadow-soft transition-shadow group relative overflow-hidden"
              >
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => deleteTestSuite(suite.id)}
                    className="p-1.5 rounded-full bg-red-50 text-red-500 hover:bg-red-100"
                    aria-label="Delete test suite"
                  >
                    {getIcon('Trash2')({ className: "w-4 h-4" })}
                  </button>
                </div>
                <div className="flex items-start mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary-light/20 dark:bg-primary-dark/30 flex items-center justify-center mr-3 flex-shrink-0">
                    <BriefcaseIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 pr-8">{suite.name}</h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400">{suite.description}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-surface-200 dark:border-surface-700 flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-sm text-surface-500 dark:text-surface-400">
                    <ClockIcon className="w-4 h-4" />
                    <span>Created {new Date(suite.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center text-sm px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                      <CheckCircleIcon className="w-3.5 h-3.5 mr-1" />
                      <span>{suite.testCases.length} Tests</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default Home;