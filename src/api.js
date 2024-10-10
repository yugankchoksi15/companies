import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.recruitly.io/api',
});

export const getCompanies = async () => {
  const response = await api.get('company/list?apiKey=HIRE840770DDB2F381CA41BA84AA6A9ABE68B0EE');
  const companyData = {
    id: "c1fb131af7a543e090b03ba00b490ade",
    client: true,
    createdBySystem: false,
    description: "it works in financial service domain",
    domain: "Finance",
    email: "test@mail.com",
    employees: "150+",
    facebook: "https://www.facebook.com/",
    faxNo: "9999999999",
    headOffice: {
      address: {
        addressLine: "B - 1002",
        addressLine2: "walking street",
        cityName: "ahmedabad",
        countryCode: "101",
        countryName: "India",
        latitude: 48,
        longitude: 0,
        postCode: "380015",
        regionName: "Gujarat",
      },
      name: "Head office",
    },
    imageUrl: "https://static.vecteezy.com/system/resources/previews/019/091/650/large_2x/link-chain-url-connection-link-business-logo-template-flat-color-free-vector.jpg",
    industries: [
      {
        id: "e239175b-a5a6-4ea4-949e-1e3ee87df570",
        name: "Pharmaceutical",
        category: null,
        tenantId: null,
        type: null,
        position: 0,
        createdBy: null,
      },
    ],
    labels: [],
    languages: ["English", "Hindi", "Spanish"],
    linkedIn: "https://www.linkedin.com/",
    logoUrl: "https://static.vecteezy.com/system/resources/previews/019/091/650/large_2x/link-chain-url-connection-link-business-logo-template-flat-color-free-vector.jpg",
    name: "Zess4",
    openJobs: true,
    otherOffices: [
      {
        address: {
          addressLine: "B - 100456002",
          addressLine2: "running street",
          cityName: "ahmedabad",
          countryCode: "101",
          countryName: "India",
          latitude: 78,
          longitude: 5,
          postCode: "380015",
          regionName: "Gujarat",
        },
        name: "finance sub office - 1",
      },
    ],
    ownerId: "e86dbb54-030a-4701-879e-bec35655106d",
    ownerName: "Andy Barnes",
    phone: "9999999999",
    placements: true,
    rating: 4,
    reference: "CY-2933",
    sectors: [
      {
        id: "e3f8a771-eec4-4728-b447-fc38d790b739",
        name: "Electrical",
        category: null,
        tenantId: null,
        type: null,
        position: 0,
        createdBy: null,
      },
      {
        id: "ef679719-00df-4a8d-932b-f303c84bad5c",
        name: "Engineering",
        category: null,
        tenantId: null,
        type: null,
        position: 0,
        createdBy: null,
      },
    ],
    skills: ["Engineering", "Drawing", "Accounting"],
    statusId: "aae634ef-2157-4372-b5ae-d44ca0e9a7ab",
    type: "ACTIVE_FILTER",
    website: "https://www.wix.com/blog/hobby-website",
  };
  response.data.data.push(companyData)
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
export const getStatus = async () => {
  const response = await api.get('/company/status?apiKey=HIRE840770DDB2F381CA41BA84AA6A9ABE68B0EE');
  return response.data;
};

