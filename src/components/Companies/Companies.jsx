import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Flex,
  TextInput,
  Avatar,
  Group,
  ScrollArea,
  Tooltip,
  ActionIcon,
  Pagination,
  Badge,
} from "@mantine/core";
import {
  getCompanies,
  createCompany,
  getIndustries,
  getSectors,
  getStatus,
} from "../../api";
import styles from "./Companies.module.css";
import { useNavigate } from "react-router-dom";
import AddModal from "../../modals/AddModal";
import Cookies from "js-cookie";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [status, setStatus] = useState([]);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyEmail, setNewCompanyEmail] = useState("");
  const [newCompanyReference, setNewCompanyReference] = useState("");
  const [newCompanyWebsite, setNewCompanyWebsite] = useState("");
  const [inputWords, setInputWords] = useState({}); // Track new input values
  const [opened, setOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15; // Adjust items per page as needed

  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);
  const fetchCompanies = async () => {
    try {
      // Fetch data from API
      const response = await getCompanies();
      const apiCompanies = response.data || [];
  
      // Retrieve and parse saved company data from cookies
      const savedCompanyData = Cookies.get("companyData");
      const parsedSavedCompanies = savedCompanyData
        ? JSON.parse(savedCompanyData) // Assume saved data is an array
        : [];
  
      // Combine API data and cookie data (if exists)
      const combinedCompanies = [...apiCompanies, ...parsedSavedCompanies]; // Combine arrays
  
      // Set the combined data into the state
      setCompanies(combinedCompanies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setCompanies([]); // Set empty state on error
    }
  };
  

  const fetchIndustries = async () => {
    try {
      const response = await getIndustries();
      setIndustries(response.data || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setIndustries([]);
    }
  };
  const fetchSectors = async () => {
    try {
      const response = await getSectors();
      setSectors(response.data || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setSectors([]);
    }
  };
  const fetchStatus = async () => {
    try {
      const response = await getStatus();
      setStatus(response.data || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setStatus([]);
    }
  };
  const handleAdd = () => {
    setOpened(true);
    fetchIndustries();
    fetchSectors();
    fetchStatus();
  };

  const handleAddCompany = (inputWords,form,setActiveStep) => {
    // Mapping the inputWords to the required payload format
    const newCompany = {
      id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
      client: inputWords.client,
      createdBySystem: inputWords.createdBySystem,
      description: inputWords.description || "",
      domain: inputWords.domain || "",
      email: inputWords.email || "",
      employees: inputWords.employees || "",
      facebook: inputWords.facebook || "",
      faxNo: inputWords.faxNo || "",
      headOffice: inputWords.addressLine
        ? {
            address: {
              addressLine: inputWords.addressLine,
              addressLine2: inputWords.addressLine2 || "",
              cityName: inputWords.cityName || "",
              countryCode: inputWords.countryCode || "",
              countryName: inputWords.countryName || "",
              latitude: parseFloat(inputWords.latitude) || 0,
              longitude: parseFloat(inputWords.longitude) || 0,
              postCode: inputWords.postCode || "",
              regionName: inputWords.regionName || "",
            },
            name: inputWords.headOfficeName || "Head office",
          }
        : null,
      imageUrl: inputWords.imageUrl || "",
      industries: inputWords.industries
        ? inputWords.industries.map((industry) => ({
            id: industry,
            name: industry,
          }))
        : [],
      labels: inputWords.labels || [],
      languages: Array.isArray(inputWords.languages)
        ? inputWords.languages
        : inputWords.languages
        ? inputWords.languages.split(",").map((lang) => lang.trim())
        : [],
      linkedIn: inputWords.linkedIn || "",
      logoUrl: inputWords.logoUrl || "",
      name: inputWords.name || "",
      openJobs: inputWords.openJobs,
      otherOffices: inputWords.otherOffices
        ? [
            {
              address: {
                addressLine: inputWords.addressLine || "",
                addressLine2: inputWords.addressLine2 || "",
                cityName: inputWords.cityName || "",
                countryCode: inputWords.countryCode || "",
                countryName: inputWords.countryName || "",
                latitude: parseFloat(inputWords.latitude) || 0,
                longitude: parseFloat(inputWords.longitude) || 0,
                postCode: inputWords.postCode || "",
                regionName: inputWords.regionName || "",
              },
              name: inputWords.name || "",
            },
          ]
        : [],
      ownerId: inputWords.ownerId || "",
      ownerName: inputWords.ownerName || "",
      phone: inputWords.phone || "",
      placements: inputWords.placements,
      rating: inputWords.rating ? parseInt(inputWords.rating) : 0,
      reference: inputWords.reference || "",
      sectors: inputWords.sectors
        ? inputWords.sectors.map((sector) => ({ id: sector, name: sector }))
        : [],
      skills: Array.isArray(inputWords.skills)
        ? inputWords.skills
        : inputWords.skills
        ? inputWords.skills.split(",").map((skill) => skill.trim())
        : [],
      statusId: inputWords.status || "",
      type: inputWords.type || "",
      website: inputWords.website || "",
    };

    // Retrieve existing company data from cookies
    const savedCompanyData = Cookies.get("companyData");
    const existingCompanies = savedCompanyData
      ? JSON.parse(savedCompanyData)
      : [];

    // Ensure existingCompanies is always an array
    const updatedCompanies = Array.isArray(existingCompanies)
      ? [...existingCompanies, newCompany]
      : [newCompany]; // If it was not an array, initialize with the new company

    // Save updated company data to cookies
    Cookies.set("companyData", JSON.stringify(updatedCompanies), {
      expires: 7,
    });

    // Update the companies state
    setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
    form.reset();
    // Clear input words and close modal after successful addition
    setInputWords({});
    setActiveStep(0);
    setOpened(false);
  };

  // Calculate current companies based on pagination
  const indexOfLastCompany = currentPage * itemsPerPage;
  const indexOfFirstCompany = indexOfLastCompany - itemsPerPage;
  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

  return (
    <div className="container">
      <div className={styles.table}>
        <Flex justify="flex-end">
          <Button className={styles.button} onClick={handleAdd}>
            Add Company
          </Button>
        </Flex>
        <div>
          <ScrollArea style={{ height: "75vh" }}>
            <Table
              highlightOnHover
              onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
            >
              <Table.Thead>
                <Table.Tr>
                  <th>Logo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Reference</th>
                  <th>Website</th>
                  <th>Status</th>
                  <th>Actions</th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {Array.isArray(currentCompanies) &&
                  currentCompanies.map((company) => (
                    <Table.Tr key={company.id}>
                      <Avatar
                        src={company.logoUrl}
                        alt={company.name}
                        radius="xl"
                        size={40}
                      />
                      <td>{company.name}</td>
                      <td>{company.email}</td>
                      <td>{company.reference}</td>
                      <td>
                        {company.website ? (
                          <Tooltip label={company.website} position="top">
                            <ActionIcon
                              onClick={() =>
                                window.open(company.website, "_blank")
                              }
                              variant="outline"
                              size="lg"
                            >
                              Go
                            </ActionIcon>
                          </Tooltip>
                        ) : (
                          "N/A" // Or any fallback text if the website is not available
                        )}
                      </td>
                      <td>
                        {company.status && company.status.name && company.status.color ? (
                            <Badge style={{ backgroundColor: company.status.color }}
                          onClick={() => {
                          }} color="lime.4" variant="filled">
                          {company.status.name}{" "} </Badge>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td>
                        <Group>
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => navigate(`/company/${company.id}`)}>
                            View
                          </Button>
                        </Group>
                      </td>
                    </Table.Tr>
                  ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>
          {/* Pagination */}
          <Pagination
            total={Math.ceil(companies.length / itemsPerPage)}
            page={currentPage}
            onChange={setCurrentPage}
            styles={{ pagination: { marginTop: '1rem', justify: 'end' } }} // Adjust as needed
          />
        </div>
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
          status={status}
        />
      </div>
    </div>
  );
}

export default Companies;
