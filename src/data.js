// Basic stepper field
const data = [
  {
    label: "Name",
    apikey: "name",
    value: "",
    type: "TextInput",
    required: true, // Required field
  },
  {
    label: "Reference",
    apikey: "reference",
    value: "",
    type: "TextInput",
    required: true, // Required field
  },
  {
    label: "Employees",
    apikey: "employees",
    value: null,
    type: "TextInput",
    required: true, // Required field
  },
  {
    label: "Description",
    apikey: "description",
    value: null,
    type: "TextInput",
  },
  {
    label: "Client",
    apikey: "client",
    value: false,
    type: "Switch",
    required: true, // Required field
  },
  {
    label: "Domain",
    apikey: "domain",
    value: null,
    type: "TextInput",
    required: true, // Required field
  },
  {
    label: "Logo URL",
    apikey: "logoUrl",
    value: null,
    type: "TextInput",
  },
  {
    label: "Industries",
    apikey: "industries",
    value: [],
    type: "MultiSelect",
    required: true, // Required field
  },
  {
    label: "Sectors",
    apikey: "sectors",
    value: [],
    type: "MultiSelect",
    required: true, // Required field
  },
  {
    label: "Image URL",
    apikey: "imageUrl",
    value: null,
    type: "TextInput",
  },

  // contact stepper field
  {
    label: "Fax No",
    apikey: "faxNo",
    value: "",
    type: "TextInput",
  },
  {
    label: "Phone",
    apikey: "phone",
    value: "",
    type: "TextInput",
    required: true, // Required field
  },
  {
    label: "Twitter",
    apikey: "twitter",
    value: null,
    type: "TextInput",
  },
  {
    label: "Email",
    apikey: "email",
    value: "",
    type: "TextInput",
    required: true, // Required field
  },
  {
    label: "Facebook",
    apikey: "facebook",
    value: null,
    type: "TextInput",
  },
  {
    label: "LinkedIn",
    apikey: "linkedIn",
    value: null,
    type: "TextInput",
  },
  {
    label: "Website",
    apikey: "website",
    value: "",
    type: "TextInput",
  },
  // job details stepper
  {
    label: "Labels",
    apikey: "labels",
    value: [],
    type: "TextInput",
    addKey: true,
  },
  {
    label: "Languages",
    apikey: "languages",
    value: null,
    type: "TextInput",
    addKey: true,
  },
  {
    label: "Placements",
    apikey: "placements",
    value: false,
    type: "Switch",
  },
  {
    label: "Tags",
    apikey: "tags",
    value: [],
    type: "TextInput",
    addKey: true,
  },
  {
    label: "Open Jobs",
    apikey: "openJobs",
    value: false,
    type: "Switch",
  },
  // Head office information
  {
    label: "Skills",
    apikey: "skills",
    value: [],
    type: "TextInput",
    addKey: true,
  },
  {
    label: "Head Office Name",
    apikey: "name",
    value: "",
    type: "TextInput",
    required: true, // Required field
  },
  {
    label: "Address Line",
    apikey: "addressLine",
    value: null,
    type: "TextInput",
  },
  {
    label: "Address Line 2",
    apikey: "addressLine2",
    value: null,
    type: "TextInput",
  },
  {
    label: "City Name",
    apikey: "cityName",
    value: "",
    type: "TextInput",
    required: true, // Required field
  },
  {
    label: "Region Name",
    apikey: "regionName",
    value: "",
    type: "TextInput",
  },
  {
    label: "Post Code",
    apikey: "postCode",
    value: null,
    type: "TextInput",
  },
  {
    label: "Country Code",
    apikey: "countryCode",
    value: "",
    type: "TextInput",
    required: true, // Required field
  },
  {
    label: "Latitude",
    apikey: "latitude",
    value: null,
    type: "TextInput",
  },
  {
    label: "Longitude",
    apikey: "longitude",
    value: null,
    type: "TextInput",
  },
  {
    label: "Country Name",
    apikey: "countryName",
    value: "",
    type: "TextInput",
    required: true, // Required field
  },
  {
    label: "City or Region and Post Code",
    apikey: "cityOrRegionAndPostCode",
    value: "",
    type: "TextInput",
  },
  {
    label: "Country",
    apikey: "country",
    value: "",
    type: "TextInput",
  },
  {
    label: "City Region",
    apikey: "cityRegion",
    value: "",
    type: "TextInput",
  },
  {
    label: "Address Label",
    apikey: "addressLabel",
    value: "",
    type: "TextInput",
  },

  //Add  information
  {
    label: "Created by System",
    apikey: "createdBySystem",
    value: false,
    type: "Switch",
  },
  {
    label: "Owner Name",
    apikey: "ownerName",
    value: "",
    type: "TextInput",
    required: true, // Required field
  },
  {
    label: "Rating",
    apikey: "rating",
    value: null,
    type: "TextInput",
  },
  {
    label: "Status Position",
    apikey: "position",
    value: null,
    type: "TextInput",
  },
  {
    label: "Status",
    apikey: "status",
    value: "",
    type: "Select",
    required: true, // Required field
  },
];

export default data;
