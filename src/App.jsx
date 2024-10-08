import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login/Login';
import Companies from '../src/components/Companies/Companies';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Company from '../src/components/Company/Company';
import Header from '../src/components/Header/Header';

function App() {
  return (
  <MantineProvider>{
    <Router>
      <div>
      <Header />    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/company/:id" element={<Company />} />
      </Routes>
      </div>
    </Router>
  }</MantineProvider>
);
}

export default App;
