import { requestService as api, getParmeter } from "./Request.service"  
const API_URL = {
  OPTION_ITEMS: `/common/options-items.php`, 
  OPTION_SUPPLIER: `/common/options-supplier.php`,
  OPTION_CUSTOMER: `/common/options-customer.php`,
  OPTION_QUOTATION: `/common/options-quotation.php`,
  OPTION_ITEMSTYPE: `/common/options-itemstype.php`,
  OPTION_UNIT: `/common/options-unit.php`,
};
 

const OptionService = () => {
  const optionsItems = (parm = {}) => api.get(`${API_URL.OPTION_ITEMS}?${getParmeter(parm)}`, { ignoreLoading : true });
  const optionsSupplier = () => api.get(`${API_URL.OPTION_SUPPLIER}`, { ignoreLoading : true });
  const optionsCustomer = () => api.get(`${API_URL.OPTION_CUSTOMER}`, { ignoreLoading : true });
  const optionsQuotation = (parm = {}) => api.get(`${API_URL.OPTION_QUOTATION}?${getParmeter(parm)}`, { ignoreLoading : true });
  const optionsItemstype = (parm = {}) => api.get(`${API_URL.OPTION_ITEMSTYPE}?${getParmeter(parm)}`, { ignoreLoading : true });
  const optionsUnit = (parm = {}) => api.get(`${API_URL.OPTION_UNIT}?${getParmeter(parm)}`, { ignoreLoading : true });

  return {
    optionsItems,
    optionsSupplier,
    optionsCustomer,
    optionsQuotation,
    optionsItemstype,
    optionsUnit,
  };
};

export default OptionService;