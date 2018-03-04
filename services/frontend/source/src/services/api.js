import apisauce from 'apisauce';
import HTTPMiddleware from './middleware/http';

const create = () => {
  const configs = {
    headers: { Accept: 'application/json' },
    timeout: 5000
  };

  const api = apisauce.create({
    ...configs,
    baseURL: '/api'
  });

  // Global error handling
  HTTPMiddleware.handleResponse(api);

  return {
    // The one and only API for searching products
    search: keyword => api.get(`/search/quick/${keyword}`)
  };
};

export default { create };
