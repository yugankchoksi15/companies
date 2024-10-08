import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompanies } from '../../api';
import { Modal, Table, Grid, Container, Paper, Avatar, Flex } from '@mantine/core';
import styles from '../Company/Company.module.css';
import leftArrow from '../../assets/left-arrow-button.svg';


function Company() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    fetchCompanyDetails();
  }, [id]);

  const fetchCompanyDetails = async () => {
    try {
      const response = await getCompanies();
      const companies = response.data || [];
      const companyData = companies.find(company => company.id.toString() === id);
      if (!companyData) {
        throw new Error('Company not found');
      }
      setCompany(companyData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching company details:', error);
      setError('Failed to load company details');
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpened(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div>
        <Grid>
          <Grid.Col span={{ base: 12, xs: 5 }}>
            <Paper h={'100%'} radius="lg" withBorder p="lg" bg="var(--mantine-color-body)">
              <Flex>
                <Avatar src={company.logoUrl} alt={company.name} radius="xl" size={250} />
                <div className={styles.container}>
              <h2>{company.name || '-'}</h2>
              <h4>{company.reference || '-'}</h4>
                </div>
              </Flex>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, xs: 7 }}>
            <Paper radius="lg" withBorder p="lg" bg="var(--mantine-color-body)">
              <h2>Head Office Information</h2>
              <Table striped highlightOnHover>
                <tbody>
                  <tr>
                    <td>Address Line:</td>
                    <td>{company.headOffice.address.addressLine || '-'}</td>
                  </tr>
                  <tr>
                    <td>Address Line2:</td>
                    <td>{company.headOffice.address.addressLine2 || '-'}</td>
                  </tr>
                  <tr>
                    <td>City Name:</td>
                    <td>{company.headOffice.address.cityName || '-'}</td>
                  </tr>
                  <tr>
                    <td>Region Name:</td>
                    <td>{company.headOffice.address.regionName || '-'}</td>
                  </tr>
                  <tr>
                    <td>Post Code:</td>
                    <td>{company.headOffice.address.postCode || '-'}</td>
                  </tr>
                  <tr>
                    <td>Country Code:</td>
                    <td>{company.headOffice.address.countryCode || '-'}</td>
                  </tr>
                  <tr>
                    <td>Country Name:</td>
                    <td>{company.headOffice.address.countryName || '-'}</td>
                  </tr>
                </tbody>
              </Table>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, xs: 8 }}>
            <Paper radius="lg" withBorder p="lg" bg="var(--mantine-color-body)">
              <h2>Company Status & Details</h2>
              <Table striped highlightOnHover>
                <tbody>
                  <tr>
                    <td>Owner Name:</td>
                    <td>{company.ownerName || '-'}</td>
                  </tr>
                  <tr>
                    <td>Company Size Code:</td>
                    <td>{company.companySizeCode || '-'}</td>
                  </tr>
                  <tr>
                    <td>Client:</td>
                    <td>{company.client ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr>
                    <td>Rating:</td>
                    <td>{company.rating || '-'}</td>
                  </tr>
                  <tr>
                    <td>Created By System:</td>
                    <td>{company.createdBySystem ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr>
                    <td>Open Jobs:</td>
                    <td>{company.openJobs ? 'Yes' : 'No'}</td>
                  </tr>
                  <tr>
                    <td>Placements:</td>
                    <td>{company.placements ? 'Yes' : 'No'}</td>
                  </tr>
                </tbody>
              </Table>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, xs: 4 }}>
            <Paper radius="lg" withBorder p="lg" bg="var(--mantine-color-body)">
              <h2>Company Additional Details</h2>
              <Table striped highlightOnHover>
                <tbody>
                  <tr>
                    <td>Benefits Package:</td>
                    <td>{company.benefitsPackage || '-'}</td>
                  </tr>
                  <tr>
                    <td>Terms Agreed:</td>
                    <td>{company.termsAgreed || '-'}</td>
                  </tr>
                  <tr>
                    <td>Status ID:</td>
                    <td>{company.statusId || '-'}</td>
                  </tr>
                  <tr>
                    <td>Owner ID:</td>
                    <td>{company.ownerId || '-'}</td>
                  </tr>
                  <tr>
                    <td>Owner Name:</td>
                    <td>{company.ownerName || '-'}</td>
                  </tr>
                  <tr>
                    <td>Status Color:</td>
                    <td style={{ backgroundColor: company.status.color }}>{company.status.color || '-'}</td>
                  </tr>
                  <tr>
                    <td>Status Position:</td>
                    <td>{company.status.position || '-'}</td>
                  </tr>
                </tbody>
              </Table>
            </Paper>
          </Grid.Col>

        </Grid>
        {/* </Container> */}
      </div>
      <Modal opened={opened} onClose={handleClose} title="More Details"></Modal>
    </div>
  );
}

export default Company;
