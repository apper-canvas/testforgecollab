import { toast } from 'react-toastify';

// Fetch test cases for a specific test suite
export const fetchTestCasesForSuite = async (testSuiteId) => {
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
        { Field: { Name: "test_suite" } },
        { Field: { Name: "priority" } },
        { Field: { Name: "status" } }
      ],
      where: [
        {
          fieldName: "IsDeleted",
          Operator: "ExactMatch",
          values: [false]
        },
        {
          fieldName: "test_suite",
          Operator: "ExactMatch",
          values: [testSuiteId]
        }
      ],
      orderBy: [
        {
          field: "CreatedOn",
          direction: "desc"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords("test_case", params);
    
    if (!response || !response.data) {
      return [];
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching test cases for suite ${testSuiteId}:`, error);
    throw new Error("Failed to fetch test cases");
  }
};

// Get test case by ID
export const getTestCaseById = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.getRecordById("test_case", id);
    
    if (!response || !response.data) {
      throw new Error("Test case not found");
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching test case with ID ${id}:`, error);
    throw new Error("Failed to fetch test case details");
  }
};

// Create a new test case
export const createTestCase = async (testCaseData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Map data to match the required fields
    const record = {
      Name: testCaseData.name,
      description: testCaseData.description,
      test_suite: testCaseData.testSuiteId,
      priority: testCaseData.priority,
      status: testCaseData.status || 'active',
      Tags: testCaseData.tags || []
    };
    
    const params = {
      records: [record]
    };
    
    const response = await apperClient.createRecord("test_case", params);
    
    if (!response || !response.success) {
      throw new Error(response?.message || "Failed to create test case");
    }
    
    // Check if we have results and if the first one was successful
    if (!response.results || !response.results[0] || !response.results[0].success) {
      const errorMessage = response.results?.[0]?.message || "Unknown error creating test case";
      throw new Error(errorMessage);
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error("Error creating test case:", error);
    throw new Error("Failed to create test case");
  }
};

// Update a test case
export const updateTestCase = async (id, testCaseData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    // Map data to match the required fields
    const record = {
      Id: id,
      Name: testCaseData.name,
      description: testCaseData.description,
      test_suite: testCaseData.testSuiteId,
      priority: testCaseData.priority,
      status: testCaseData.status,
      Tags: testCaseData.tags || []
    };
    
    const params = {
      records: [record]
    };
    
    const response = await apperClient.updateRecord("test_case", params);
    
    if (!response || !response.success) {
      throw new Error(response?.message || "Failed to update test case");
    }
    
    return response.results[0].data;
  } catch (error) {
    console.error(`Error updating test case with ID ${id}:`, error);
    throw new Error("Failed to update test case");
  }
};

// Delete a test case
export const deleteTestCase = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      RecordIds: [id]
    };
    
    const response = await apperClient.deleteRecord("test_case", params);
    
    if (!response || !response.success) {
      throw new Error(response?.message || "Failed to delete test case");
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting test case with ID ${id}:`, error);
    throw new Error("Failed to delete test case");
  }
};