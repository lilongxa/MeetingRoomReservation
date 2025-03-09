const config = {
  USE_MOCK_API: process.env.REACT_APP_USE_MOCK_API === 'true' || false,
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5089/api'
};

export default config;