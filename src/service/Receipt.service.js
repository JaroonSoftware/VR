import { requestService as api } from "./Request.service"  
const API_URL = { 
  API_MANAGE: `/receipt/manage.php`, 
  API_PRINT: `/receipt/print.php`, 
  API_GETMASTER: `/receipt/search.php`, 

  API_GETCODE: `/receipt/get-recode.php`, 
};
  
const QuotationService = () => { 
  
  const create = (parm = {}) => api.post(`${API_URL.API_MANAGE}`, parm);
  const update = (parm = {}) => api.put(`${API_URL.API_MANAGE}`, parm);
  const deleted = (code) => api.delete(`${API_URL.API_MANAGE}?code=${code}`);
  const get = (code) => api.get(`${API_URL.API_MANAGE}?code=${code}`);

  const code = () => api.get(`${API_URL.API_GETCODE}`);
  const getprint = (code) => api.get(`${API_URL.API_PRINT}?code=${code}`);
  
  const search = (parm = {}) => api.post(`${API_URL.API_GETMASTER}`, parm);
  

  return {
    create,
    update,
    deleted,
    get, 

    code,
    getprint,
    search,
  };
};

export default QuotationService;