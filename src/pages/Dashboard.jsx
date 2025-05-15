import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import getIcon from '../utils/iconUtils';
import { fetchTestSuites, deleteTestSuite } from '../services/testSuiteService';
import MainFeature from '../components/MainFeature';

const Dashboard = () => {
  const [testSuites, setTestSuites] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  
  const FolderPlusIcon = getIcon('FolderPlus');
  const BeakerIcon = getIcon('Beaker');
  const CheckCircleIcon = getIcon('CheckCircle');
  const ClockIcon = getIcon('Clock');
  const BriefcaseIcon = getIcon('Briefcase');
  
  // Fetch test suites from backend
  useEffect(() => {
    const loadTestSuites = async () => {
      try {
        setLoading(true);
        const data = await fetchTestSuites();
        setTestSuites(data);
      } catch (error) {
        toast.error("Failed to load test suites: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadTestSuites();
  }, []);
  
  const handleAddTestSuite = (newSuite) => {
    setTestSuites([...testSuites, newSuite]);
  };
  
  const handleDeleteTestSuite = async (id) => {
    try {
      await deleteTestSuite(id);
      setTestSuites(testSuites.filter(suite => suite.Id !== id));
      toast.success("Test suite deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete test suite: " + error.message);
    }
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
          Welcome, {user?.firstName || 'User'}
        </motion.h1>
        <p className="text-surface-600 dark:text-surface-400 text-lg max-w-2xl mx-auto">
          Create, manage, and run automated test suites without advanced coding knowledge. 
          Get started by creating your first test suite below.
        </p>
      </section>

      <MainFeature onAddTestSuite={handleAddTestSuite} />

      <TestSuiteList 
        testSuites={testSuites} 
        loading={loading} 
        onDeleteTestSuite={handleDeleteTestSuite} 
      />
    </motion.div>
  );
};

export default Dashboard;

const TestSuiteList = ({ testSuites, loading, onDeleteTestSuite }) => {
  const FolderPlusIcon = getIcon('FolderPlus');
  const BeakerIcon = getIcon('Beaker');
  const ClockIcon = getIcon('Clock');
  const BriefcaseIcon = getIcon('Briefcase');
  const CheckCircleIcon = getIcon('CheckCircle');
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-surface-600 dark:text-surface-400">Loading test suites...</p>
      </div>
    );
  }
  
  return (
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
              key={suite.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card hover:shadow-soft transition-shadow group relative overflow-hidden"
            >
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onDeleteTestSuite(suite.Id)}
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
                  <h3 className="text-lg font-semibold mb-1 pr-8">{suite.Name}</h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400">{suite.description}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-surface-200 dark:border-surface-700 flex justify-between items-center">
                <div className="flex items-center space-x-2 text-sm text-surface-500 dark:text-surface-400">
                  <ClockIcon className="w-4 h-4" />
                  <span>Created {new Date(suite.CreatedOn).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex items-center text-sm px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      suite.priority === 'low' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 
                      suite.priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400' : 
                      'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                    }`}>
                      {suite.priority?.charAt(0).toUpperCase() + suite.priority?.slice(1) || 'Medium'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};