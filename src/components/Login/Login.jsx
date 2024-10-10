import React, { useState } from 'react';
import { Button, Checkbox, Group, TextInput, Title, Paper, Container, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom'; 
import '@mantine/core/styles.css';
import styles from './Login.module.css';
import { usersdata } from '../../assets/sample-data';

function Login() {
  const [errorMessage, setErrorMessage] = useState('');
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      termsOfService: false,
    },
    
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => value.length < 6 
        ? 'Password must be at least 6 characters long' 
        : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value) 
        ? null 
        : 'Password must include at least one uppercase letter, one lowercase letter, and one number',
    },
  });

  const navigate = useNavigate(); 
  const handleSubmit = (values) => {
    const { email, password } = values; 
    const user = usersdata.find(user => user.email === email);

    if (user) {
      if (user.password === password) {
        setErrorMessage('');

        localStorage.setItem('userEmail', user.email); 
        
        navigate('/companies'); 
      } else {
        setErrorMessage("Invalid password"); 
      }
    } else {
      setErrorMessage("This user does not exist"); 
    }
  };

  return (
    <Container className={styles.container}>
      <Paper className={styles.paper}>
        <Title className={styles.title}>Login</Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email"
            placeholder="Enter Your Email."
            key={form.key('email')}
            {...form.getInputProps('email')}
            className={styles.input}
          />
          <TextInput
            label="Password"
            placeholder="Enter Your Password."
            type="password"
            key={form.key('password')}
            {...form.getInputProps('password')}
            className={styles.input}
          />
          {errorMessage && (
            <Text color="red" className={styles.error}>
              {errorMessage}
            </Text>
          )}

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
