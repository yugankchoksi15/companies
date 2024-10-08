import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { Button} from '@mantine/core';


function Header() {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    navigate('/'); 
  };

  return (
    < div className={styles.header1}>
      {userEmail ? (
        <>
          <p>Logged in as: {userEmail}</p>
          <div className={styles.header} >
        <Button className={styles.button} onClick={handleLogout}>
          Logout
        </Button>
      </div>
        </>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
}

export default Header;
