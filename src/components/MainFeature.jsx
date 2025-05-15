import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = ({ onAddTestSuite }) => {
  const [formStep, setFormStep] = useState(1);
  const [suiteName, setSuiteName] = useState('');
  const [suiteDescription, setSuiteDescription] = useState('');
  const [environment, setEnvironment] = useState('web');
  const [priority, setPriority] = useState('medium');
  const [testCases, setTestCases] = useState([
    { id: crypto.randomUUID(), name: '', description: '', steps: [] }
  ]);

  // Define icons
  const PlusIcon = getIcon('Plus');
  const SaveIcon = getIcon('Save');
  const ArrowRightIcon = getIcon('ArrowRight');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const CirclePlayIcon = getIcon('Play');
  const MonitorIcon = getIcon('Monitor');
  const SmartphoneIcon = getIcon('Smartphone');
  const ServerIcon = getIcon('Server');
  const FlagIcon = getIcon('Flag');
  const LayoutIcon = getIcon('Layout');
  const TrashIcon = getIcon('Trash');
  const PlusCircleIcon = getIcon('PlusCircle');
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    if (suiteName.trim() === '') {
      toast.error('Please enter a test suite name');
      return;
    }
    
    if (testCases.some(tc => tc.name.trim() === '')) {
      toast.error('All test cases must have a name');
      return;
    }
    
    // Create new test suite
    const newSuite = {
      id: crypto.randomUUID(),
      name: suiteName,
      description: suiteDescription,
      environment,
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Current User',
      testCases: testCases.map(tc => ({
        ...tc,
        priority,
        status: 'active',
        tags: [environment]
      }))
    };
    
    // Call parent handler
    onAddTestSuite(newSuite);
    
    // Reset form
    setSuiteName('');
    setSuiteDescription('');
    setEnvironment('web');
    setPriority('medium');
    setTestCases([{ id: crypto.randomUUID(), name: '', description: '', steps: [] }]);
    setFormStep(1);
  };

  const addTestCase = () => {
    setTestCases([
      ...testCases,
      { id: crypto.randomUUID(), name: '', description: '', steps: [] }
    ]);
  };

  const removeTestCase = (id) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter(tc => tc.id !== id));
    } else {
      toast.error("You must have at least one test case");
    }
  };

  const updateTestCase = (id, field, value) => {
    setTestCases(testCases.map(tc => 
      tc.id === id ? { ...tc, [field]: value } : tc
    ));
  };

  const nextStep = () => {
    if (suiteName.trim() === '') {
      toast.error('Please enter a test suite name');
      return;
    }
    setFormStep(2);
  };

  const previousStep = () => setFormStep(1);

  return (
    <section id="create-test-suite" className="relative">
      <div className="absolute top-0 -left-4 w-1 h-full bg-gradient-to-b from-primary to-secondary hidden lg:block"></div>
      
      <motion.div 
        className="card overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-surface-200 dark:border-surface-700">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center">
              <LayoutIcon className="mr-2 text-primary" />
              <span>Create New Test Suite</span>
            </h2>
            <p className="text-surface-600 dark:text-surface-400">
              Set up your test environment and define test cases
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="flex space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${formStep >= 1 ? 'border-primary bg-primary text-white' : 'border-surface-300 dark:border-surface-600'}`}>
                1
              </div>
              <div className="w-8 h-0.5 bg-surface-300 dark:bg-surface-700 self-center"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${formStep >= 2 ? 'border-primary bg-primary text-white' : 'border-surface-300 dark:border-surface-600'}`}>
                2
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {formStep === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="suiteName" className="block text-sm font-medium mb-2">
                  Test Suite Name*
                </label>
                <input
                  type="text"
                  id="suiteName"
                  value={suiteName}
                  onChange={(e) => setSuiteName(e.target.value)}
                  placeholder="Enter a descriptive name for your test suite"
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="suiteDescription" className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  id="suiteDescription"
                  value={suiteDescription}
                  onChange={(e) => setSuiteDescription(e.target.value)}
                  placeholder="What will this test suite verify?"
                  className="input-field min-h-[100px]"
                  rows="3"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Environment
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${environment === 'web' ? 'border-primary bg-primary/10 dark:bg-primary/20' : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'}`}
                      onClick={() => setEnvironment('web')}
                    >
                      <MonitorIcon className={`w-5 h-5 mb-1 ${environment === 'web' ? 'text-primary' : 'text-surface-500 dark:text-surface-400'}`} />
                      <span className="text-sm font-medium">Web</span>
                    </button>
                    
                    <button
                      type="button"
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${environment === 'mobile' ? 'border-primary bg-primary/10 dark:bg-primary/20' : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'}`}
                      onClick={() => setEnvironment('mobile')}
                    >
                      <SmartphoneIcon className={`w-5 h-5 mb-1 ${environment === 'mobile' ? 'text-primary' : 'text-surface-500 dark:text-surface-400'}`} />
                      <span className="text-sm font-medium">Mobile</span>
                    </button>
                    
                    <button
                      type="button"
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${environment === 'api' ? 'border-primary bg-primary/10 dark:bg-primary/20' : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'}`}
                      onClick={() => setEnvironment('api')}
                    >
                      <ServerIcon className={`w-5 h-5 mb-1 ${environment === 'api' ? 'text-primary' : 'text-surface-500 dark:text-surface-400'}`} />
                      <span className="text-sm font-medium">API</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Priority
                  </label>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className={`flex-1 py-2.5 px-3 rounded-lg border flex items-center justify-center space-x-2 transition-all ${priority === 'low' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'}`}
                      onClick={() => setPriority('low')}
                    >
                      <FlagIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">Low</span>
                    </button>
                    
                    <button
                      type="button"
                      className={`flex-1 py-2.5 px-3 rounded-lg border flex items-center justify-center space-x-2 transition-all ${priority === 'medium' ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400' : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'}`}
                      onClick={() => setPriority('medium')}
                    >
                      <FlagIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">Medium</span>
                    </button>
                    
                    <button
                      type="button"
                      className={`flex-1 py-2.5 px-3 rounded-lg border flex items-center justify-center space-x-2 transition-all ${priority === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'}`}
                      onClick={() => setPriority('high')}
                    >
                      <FlagIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">High</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <button 
                  type="button" 
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  <span>Next: Add Test Cases</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          )}
          
          {formStep === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Test Cases</h3>
                  <button
                    type="button"
                    onClick={addTestCase}
                    className="text-primary hover:text-primary-dark flex items-center text-sm"
                  >
                    <PlusCircleIcon className="w-4 h-4 mr-1" />
                    <span>Add Test Case</span>
                  </button>
                </div>
                
                <div className="space-y-5">
                  {testCases.map((testCase, index) => (
                    <div 
                      key={testCase.id}
                      className="p-4 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-50 dark:bg-surface-800/50 relative"
                    >
                      <div className="absolute -top-3 left-3 px-2 py-0.5 bg-primary text-white text-xs font-semibold rounded">
                        Test #{index + 1}
                      </div>
                      
                      {testCases.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTestCase(testCase.id)}
                          className="absolute top-2 right-2 p-1 text-surface-500 hover:text-red-500"
                          aria-label="Remove test case"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      )}
                      
                      <div className="mb-4 mt-2">
                        <label htmlFor={`testCase-${testCase.id}-name`} className="block text-sm font-medium mb-1">
                          Test Case Name*
                        </label>
                        <input
                          type="text"
                          id={`testCase-${testCase.id}-name`}
                          value={testCase.name}
                          onChange={(e) => updateTestCase(testCase.id, 'name', e.target.value)}
                          placeholder="What are you testing?"
                          className="input-field"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`testCase-${testCase.id}-description`} className="block text-sm font-medium mb-1">
                          Description
                        </label>
                        <textarea
                          id={`testCase-${testCase.id}-description`}
                          value={testCase.description}
                          onChange={(e) => updateTestCase(testCase.id, 'description', e.target.value)}
                          placeholder="Describe the expected behavior"
                          className="input-field"
                          rows="2"
                        ></textarea>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center space-x-1 text-xs">
                          <span className={`px-2 py-1 rounded-full font-medium ${priority === 'low' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'}`}>
                            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                          </span>
                          
                          <span className="px-2 py-1 rounded-full bg-surface-200 dark:bg-surface-700 font-medium">
                            {environment.charAt(0).toUpperCase() + environment.slice(1)}
                          </span>
                        </div>
                        
                        <button
                          type="button"
                          className="text-sm text-primary hover:text-primary-dark flex items-center"
                          disabled // This would be enabled in a more complete implementation
                        >
                          <PlusIcon className="w-3.5 h-3.5 mr-1" />
                          <span>Add Steps</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between pt-4 border-t border-surface-200 dark:border-surface-700">
                <button 
                  type="button" 
                  onClick={previousStep}
                  className="btn btn-outline"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  <span>Back</span>
                </button>
                
                <div className="flex space-x-3">
                  <button 
                    type="submit"
                    className="btn btn-primary"
                  >
                    <SaveIcon className="w-4 h-4 mr-2" />
                    <span>Save Test Suite</span>
                  </button>
                  
                  <button 
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => toast.info("This would run your test in a real implementation!")}
                  >
                    <CirclePlayIcon className="w-4 h-4 mr-2" />
                    <span>Create & Run</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
      
      <div className="absolute -bottom-16 right-0 opacity-5 w-64 h-64 bg-primary rounded-full blur-3xl hidden lg:block"></div>
    </section>
  );
};

export default MainFeature;