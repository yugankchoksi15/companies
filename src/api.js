import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.recruitly.io/api',
});

export const getCompanies = async () => {
  const response = await api.get('company/list?apiKey=HIRE840770DDB2F381CA41BA84AA6A9ABE68B0EE');
  return response.data;
};

export const createCompany = async (companyData) => {
  console.log("check companyData::",companyData);
  const response = await api.post('/company?apiKey=HIRE840770DDB2F381CA41BA84AA6A9ABE68B0EE', companyData); 
  console.log("check response::",response);
  
  return response.data; 
};


export const getIndustries = async () => {
  const response = await api.get('industry?apiKey=HIRE840770DDB2F381CA41BA84AA6A9ABE68B0EE');
  return response.data;
};

export const getSectors = async () => {
  const response = await api.get('sector?apiKey=HIRE840770DDB2F381CA41BA84AA6A9ABE68B0EE');
  return response.data;
};
