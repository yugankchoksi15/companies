import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompanies } from '../../api';
import { Modal, Table, Grid, Container, Paper, Avatar, Flex } from '@mantine/core';
import styles from '../Company/Company.module.css';
import leftArrow from '../../assets/left-arrow-button.svg';
import facebook from '../../assets/facebook.svg';
import linkedin from '../../assets/linkedin.svg';
import twitter from '../../assets/twitter.svg';
import faxNo from '../../assets/printer.svg';
import email from '../../assets/mail.svg';
import { Tooltip, ActionIcon } from '@mantine/core';
import { Switch } from '@mantine/core';


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
  // const sectorOptions = company?.sectors?.map(sector => ({
  //   value: sector.id,
  //   label: sector.name || sector.id
  // })) || [];

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
                  <h4>{company.name || '-'}</h4>
                  <h5>{company.reference || '-'}</h5>
                  <div className={styles.icons}>
                    <Tooltip label="Facebook" disabled={!company.facebook}>

                      <ActionIcon size={42} variant="default" >
                        <a href={company.facebook} className={`${styles.actionIcon} ${!company.facebook ? styles.disabled : ''}`} target="_blank" rel="noopener noreferrer" disabled={true} >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                          // fill="#1877F2"
                          >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        </a>
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Twitter" disabled={!company.twitter}>
                      <span>
                        <ActionIcon
                          size={42}
                          variant="default"
                          className={`${styles.actionIcon} ${!company.twitter ? styles.disabled : ''}`}
                        >
                          <a href={company.twitter} target="_blank" rel="noopener noreferrer">
                            <img src={twitter} alt="Twitter" />
                          </a>
                        </ActionIcon>
                      </span>
                    </Tooltip>

                    <Tooltip label="Linkedin" disabled={!company.linkedin}>
                      <ActionIcon size={42} variant="default" className={`${styles.actionIcon} ${!company.twitter ? styles.disabled : ''}`}>
                        <a href={company.linkedin} target="_blank" rel="noopener noreferrer">
                          <img
                            src={linkedin}
                            alt="Linkedin"
                          />
                        </a>
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Email" disabled={!company.email}>
                      <ActionIcon size={42} variant="default" className={`${styles.actionIcon} ${!company.twitter ? styles.disabled : ''}`}>
                        <a href={company.email} target="_blank" rel="noopener noreferrer">
                          <img
                            src={email}
                            alt="Email"
                          />
                        </a>
                      </ActionIcon>
                    </Tooltip>
                    {/* <Tooltip label="Fax Number" disabled={!company.faxNo}>
                      <ActionIcon size={42} variant="default" className={`${styles.actionIcon} ${!company.faxNo ? styles.disabled : ''}`}>
                        <a href={company.faxNo} target="_blank" rel="noopener noreferrer">
                          <img
                            src={faxNo}
                            alt="Fax No"
                          />
                        </a>
                      </ActionIcon>
                    </Tooltip> */}
                  </div>
                </div>
              </Flex>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, xs: 7 }}>
            <Paper radius="lg" withBorder p="lg" bg="var(--mantine-color-body)">
              <h2>Head Office Information</h2>
              <Table striped highlightOnHover className={styles.table}>
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
                  <tr>
                    <td> City Or Region And Post Code:</td>
                    <td>{company.headOffice.address.cityOrRegionAndPostCode || '-'}</td>
                  </tr>
                </tbody>
              </Table>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 7 }}>
            <Paper radius="lg" withBorder p="lg" bg="var(--mantine-color-body)">
              <h2>Company Status & Details</h2>
              <Grid>
                <Grid.Col span={6}>
                  <div>
                    <Table striped highlightOnHover >
                      <tbody>
                        <tr className={styles.lable}>
                          <td>Owner Name:</td>
                          <td>{company.ownerName || '-'}</td>
                        </tr>
                        <tr className={styles.lable}>
                          <td>Rating:</td>
                          <td>{company.rating || '-'}</td>
                        </tr>
                        <tr className={styles.lable}>
                          <td>Employees:</td>
                          <td>{company.employees || '-'}</td>
                        </tr>
                        <tr>
                          <td>Client:</td>
                          <Switch className={styles.SwitchBody}
                            checked={company.client}
                            onChange={(event) => {
                            }}
                          />
                        </tr>
                        <tr>
                          <td>Created By System:</td>
                          <Switch className={styles.SwitchBody}
                            checked={company.createdBySystem}
                            onChange={(event) => {
                            }}
                          />
                        </tr>
                        <tr>
                          <td>Open Jobs:</td>
                          <Switch className={styles.SwitchBody}
                            checked={company.openJobs}
                            onChange={(event) => {
                            }}
                          />
                        </tr>
                        <tr >
                          <td>Placements:</td>
                          <Switch className={styles.SwitchBody}
                            checked={company.placements}
                            onChange={(event) => {
                            }}
                          />
                        </tr>
                        <tr className={styles.lable}>
                          <td>Short Address Line:</td>
                          <td>{company.shortAddressLine || '-'}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Grid.Col>
                <Grid.Col span={6}>
                  <div>
                    <Table striped highlightOnHover >
                      <tbody>
                        <tr className={styles.lable} >
                          <td>Labels:</td>
                          <td>
                            {company.labels && company.labels.length > 0
                              ? company.labels.map(label => label.id).join(', ')
                              : '-'}
                          </td>
                        </tr>
                        <tr className={styles.label}>
                          <td>Parent Labels:</td>
                          <td>
                            {company.labels && company.labels.length > 0
                              ? company.labels.map(label => label.parentLabelName).join(', ')
                              : '-'}
                          </td>
                        </tr>
                        <tr className={styles.lable}>
                          <td>Domain:</td>
                          <td>{company.domain || '-'}</td>
                        </tr>
                        <tr >
                          <td>Has City Or Region:</td>
                          <Switch className={styles.SwitchBody}
                            checked={company.hasCityOrRegion}
                            onChange={(event) => {
                            }}
                          />
                        </tr>
                        <tr className={styles.label}>
                          <td>Benefit Package:</td>
                          <td>{company.benefitsPackage || '-'}</td>
                        </tr>
                        <tr className={styles.label}>
                          <td>Skills:</td>
                          <td>
                            {company.skills && company.skills.length > 0
                              ? company.skills.join(', ')
                              : '-'}
                          </td>
                        </tr>
                        <tr className={styles.label}>
                          <td>Tags:</td>
                          <td>
                            {company.tags && company.tags.length > 0
                              ? company.tags.map(tag => `${tag.key}: ${tag.value}`).join(', ')
                              : '-'}
                          </td>
                        </tr>
                        <tr>
                          <td>Enable Sync:</td>
                          <Switch className={styles.SwitchBody}
                            checked={company.enableSync}
                            onChange={(event) => {
                            }}
                          />
                        </tr>
                        <tr className={styles.lable}>
                          <td>Country:</td>
                          <td>{company.country || '-'}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 5 }}>
            <Paper radius="lg" withBorder p="lg" bg="var(--mantine-color-body)">
              <h2>Company Additional Details</h2>
              <Table striped highlightOnHover >
                <tbody>
                  <tr className={styles.lable}>
                    <td>Benefit Package:</td>
                    <td>{company.benefitsPackage || '-'}</td>
                  </tr>
                  <tr className={styles.lable}>
                    <td>Terms Agreed:</td>
                    <td>{company.termsAgreed || '-'}</td>
                  </tr>
                  <tr className={styles.lable}>
                    <td>Phone:</td>
                    <td>{company.phone || '-'}</td>
                  </tr>
                  <tr className={styles.lable}>
                    <td>Industries:</td>
                    <td>
                      {company.industries && company.industries.length > 0
                        ? company.industries.map(industry => industry.id).join(', ')
                        : '-'}
                    </td>
                  </tr>
                  <tr>
                    <td>Domain:</td>
                    <td>{company.domain || '-'}</td>
                  </tr>
                  <tr className={styles.lable}>
                    <td>Languages:</td>
                    <td>
                      {company.languages && company.languages.length > 0
                        ? company.languages.join(', ')
                        : '-'}
                    </td>
                  </tr>
                  <tr className={styles.lable}>
                    <td>Description:</td>
                    <td>{company.description || '-'}</td>
                  </tr>
                  <tr>
                          <td>Has Valid Geo:</td>
                          <Switch className={styles.SwitchBody}
                            checked={company.hasValidGeo}
                            onChange={(event) => {
                            }}
                          />
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
