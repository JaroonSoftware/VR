import { requestService as api } from "./Request.service"  

const API_URL = {
  API_MANAGE: `/itemtype/manage.php`,
  API_SEARCH: `/itemtype/search.php`,
};



const ItemsService = () => { 
 
  const create = (parm = {}) => api.post(`${API_URL.API_MANAGE}`, parm);
  const update = (parm = {}) => api.put(`${API_URL.API_MANAGE}`, parm);
  const deleted = (code) => api.delete(`${API_URL.API_MANAGE}?typecode=${code}`);
  const get = (code) => api.get(`${API_URL.API_MANAGE}?typecode=${code}`);
  const search = (parm = {}, config = {}) => api.post(`${API_URL.API_SEARCH}`, parm, {...config, cancle: true});

  return {
    create,
    update,
    deleted,
    get,
    search,

  };
};

export default ItemsService;