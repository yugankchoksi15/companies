import React, { useEffect, useState } from "react";
import { Button, Table, TextInput, Modal, Group } from "@mantine/core";
import { getCompanies, createCompany,getIndustries,getSectors } from "../../api";
import styles from "./Companies.module.css";
import { useNavigate } from "react-router-dom";
import AddModal from "../../modals/AddModal";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyEmail, setNewCompanyEmail] = useState("");
  const [newCompanyReference, setNewCompanyReference] = useState("");
  const [newCompanyWebsite, setNewCompanyWebsite] = useState("");
  const [inputWords, setInputWords] = useState({}); // Track new input values
  const [opened, setOpened] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies();
      console.log(response);
      setCompanies(response.data || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setCompanies([]);
    }
  };
  const fetchIndustries = async () => {
    try {
      const response = await getIndustries();
      console.log("show industries",response);
      setIndustries(response.data || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setIndustries([]);
    }
  };
  const fetchSectors = async () => {
    try {
      const response = await getSectors();
      console.log("show sectors",response);
      setSectors(response.data || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setSectors([]);
    }
  };
  const handleAdd = ()=>{
    setOpened(true);
    fetchIndustries();
    fetchSectors();
  }
  const handleAddCompany = async (inputWords) => {
    console.log("inputWords::", inputWords);
    
    // Mapping the inputWords to the required payload format
    const newCompany = {
      client: inputWords.client,  // Use value from inputWords
      createdBySystem: inputWords.createdBySystem,
      description: inputWords.description || "",
      domain: inputWords.domain || "",
      email: inputWords.email || "",
      employees: inputWords.employees || "",
      facebook: inputWords.facebook || "",
      faxNo: inputWords.faxNo || "",
      headOffice: inputWords.addressLine ? {
        address: {
          addressLine: inputWords.addressLine,
          addressLine2: inputWords.addressLine2 || "",
          cityName: inputWords.cityName || "",
          countryCode: inputWords.countryCode || "",
          countryName: inputWords.countryName || "",
          latitude: parseFloat(inputWords.latitude) || 0,
          longitude: parseFloat(inputWords.longitude) || 0,
          postCode: inputWords.postCode || "",
          regionName: inputWords.regionName || ""
        },
        name: "Head office"
      } : null,  // Only include if addressLine is provided
      imageUrl: inputWords.imageUrl || "",
      industries: inputWords.industries ? [{ id: "", name: inputWords.industries }] : [],
      labels: inputWords.labels || [],
      languages: inputWords.languages ? inputWords.languages.split(",").map(lang => lang.trim()) : [],
      linkedIn: inputWords.linkedIn || "",
      logoUrl: inputWords.logoUrl || "",
      name: inputWords.name || "",
      openJobs: inputWords.openJobs,
      otherOffices: inputWords.otherOffices ? [{
        address: {
          addressLine: inputWords.otherOffices.addressLine || "",
          addressLine2: inputWords.otherOffices.addressLine2 || "",
          cityName: inputWords.otherOffices.cityName || "",
          countryCode: inputWords.otherOffices.countryCode || "",
          countryName: inputWords.otherOffices.countryName || "",
          latitude: parseFloat(inputWords.otherOffices.latitude) || 0,
          longitude: parseFloat(inputWords.otherOffices.longitude) || 0,
          postCode: inputWords.otherOffices.postCode || "",
          regionName: inputWords.otherOffices.regionName || ""
        },
        name: inputWords.otherOffices.name || ""
      }] : [],
      ownerId: inputWords.ownerId || "",
      ownerName: inputWords.ownerName || "",
      phone: inputWords.phone || "",
      placements: inputWords.placements,
      rating: inputWords.rating ? parseInt(inputWords.rating) : 0,
      reference: inputWords.reference || "",
      sectors: inputWords.sectors ? [{ id: "", name: inputWords.sectors }] : [],
      skills: inputWords.skills ? inputWords.skills.split(",").map(skill => skill.trim()) : [],
      statusId: inputWords.statusId || "",
      type: inputWords.type || "",
      website: inputWords.website || ""
    };
  
    console.log("Payload to be sent:", newCompany);
  
    try {
      const response = await createCompany(newCompany);
      console.log("New Company Added:", response);
  
      setCompanies((prevCompanies) => [...prevCompanies, response]);
  
      // Reset inputWords to clear the modal fields
      setInputWords({});
      setOpened(false);
    } catch (error) {
      console.error("Error adding company:", error.message);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        console.error("Status code:", error.response.status);
      }
    }
  };
  
  

  // const handleAddCompany = async () => {
  //   const newCompany = {
  //     name: newCompanyName,
  //     email: newCompanyEmail,
  //     reference: newCompanyReference,
  //     website: newCompanyWebsite,
  //   };
  
  //   // Log the payload to debug
  //   console.log("Payload to be sent:", newCompany);
  //   try {

  //     const response = await createCompany(newCompany);
  //     console.log("New Company Added:", response); 

  //     setCompanies((prevCompanies) => [...prevCompanies, response]);

  //     setOpened(false);
  //     setNewCompanyName("");
  //     setNewCompanyEmail("");
  //     setNewCompanyReference("");
  //     setNewCompanyWebsite("");
  //   } catch (error) {
  //     console.error("Error adding company:", error);
  //   }
  // };

  return (
    <div className={styles.table}>
  
      <h1>Companies</h1>
      <Button className={styles.button} onClick={handleAdd}>
        Add Company
      </Button>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Reference</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(companies) &&
            companies.map((company) => (
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.reference}</td>
                <td>{company.website}</td>
                <td>
                  <Group>
                    <Button
                      className={styles.button}
                      variant="outline"
                      size="xs"
                      onClick={() => navigate(`/company/${company.id}`)}
                    >
                      View
                    </Button>
                  </Group>
                  
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <AddModal
        opened={opened}
        setOpened={setOpened}
        newCompanyName={newCompanyName}
        setNewCompanyName={setNewCompanyName}
        newCompanyEmail={newCompanyEmail}
        setNewCompanyEmail={setNewCompanyEmail}
        newCompanyReference={newCompanyReference}
        setNewCompanyReference={setNewCompanyReference}
        newCompanyWebsite={newCompanyWebsite}
        setNewCompanyWebsite={setNewCompanyWebsite}
        handleAddCompany={handleAddCompany}
        setInputWords={setInputWords} 
        industries={industries}
        sectors={sectors}
      />
    </div>
  );
}

export default Companies;