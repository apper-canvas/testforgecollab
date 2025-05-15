import { toast } from 'react-toastify';

// Fetch all test suites
export const fetchTestSuites = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "Name" } },
        { Field: { Name: "Tags" } },
        { Field: { Name: "Owner" } },
        { Field: { Name: "CreatedOn" } },
        { Field: { Name: "description" } },
        { Field: { Name: "environment" } },
        { Field: { Name: "priority" } }
      ],
      where: [
        {
          fieldName: "IsDeleted",
          Operator: "ExactMatch",
          values: [false]
        }
      ],
      orderBy: [
        {
          field: "CreatedOn",
          direction: "desc"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords("test_suite", params);
    
    if (!response || !response.data) {
      return [];
    }
    
    return response.data;
  } catch (error) {
    console.error("Error fetching test suites:", error);
    throw new Error("Failed to fetch test suites");
  }
};

// Get test suite by ID
export const getTestSuiteById = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.getRecordById("test_suite", id);
    
    if (!response || !response.data) {
      throw new Error("Test suite not found");
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching test suite with ID ${id}:`, error);
    throw new Error("Failed to fetch test suite details");
  }
};

// Create a new test suite
export const createTestSuite = async (testSuiteData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Map data to match the required fields
    const record = {
      Name: testSuiteData.name,
      description: testSuiteData.description,
      environment: testSuiteData.environment,
      priority: testSuiteData.priority,
      Tags: testSuiteData.tags || []
    };
    
    const params = {
      records: [record]
    };
    
    const response = await apperClient.createRecord("test_suite", params);
    
    if (!response || !response.success) {
      throw new Error(response?.message || "Failed to create test suite");
    }
    
    // Check if we have results and if the first one was successful
    if (!response.results || !response.results[0] || !response.results[0].success) {
      const errorMessage = response.results?.[0]?.message || "Unknown error creating test suite";
      throw new Error(errorMessage);
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error("Error creating test suite:", error);
    throw new Error("Failed to create test suite");
  }
};

// Update a test suite
export const updateTestSuite = async (id, testSuiteData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Map data to match the required fields
    const record = {
      Id: id,
      Name: testSuiteData.name,
      description: testSuiteData.description,
      environment: testSuiteData.environment,
      priority: testSuiteData.priority,
      Tags: testSuiteData.tags || []
    };
    
    const params = {
      records: [record]
    };
    
    const response = await apperClient.updateRecord("test_suite", params);
    
    if (!response || !response.success) {
      throw new Error(response?.message || "Failed to update test suite");
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error(`Error updating test suite with ID ${id}:`, error);
    throw new Error("Failed to update test suite");
  }
};

// Delete a test suite
export const deleteTestSuite = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      RecordIds: [id]
    };
    
    const response = await apperClient.deleteRecord("test_suite", params);
    
    if (!response || !response.success) {
      throw new Error(response?.message || "Failed to delete test suite");
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting test suite with ID ${id}:`, error);
    throw new Error("Failed to delete test suite");
  }
};