import cx from 'clsx';
import { useState, useEffect } from 'react';
import {
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    useMantineTheme,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './Header.module.css';
import { usersdata } from '../../assets/sample-data';

export function Header() {
    const userEmail = localStorage.getItem('userEmail');
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const theme = useMantineTheme();

    useEffect(() => {
        if (userEmail) {
            const foundUser = usersdata.find(user => user.email === userEmail);
            setUser(foundUser || null);
        } else {
            setUser(null);
        }
    }, [userEmail]);

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        setUser(null); // Update state to reflect the user is logged out
        navigate('/'); // Redirect to the login page or homepage
    };

    if (!user) {
        return null; // Optionally, you could return a loading indicator here or a placeholder
    }

    return (
        <div className={classes.header}>
            <Container fluid size='responsive' h={80} className={classes.mainSection}>
                <Group gap={0} justify='space-between'>
                    <h1>Recruity</h1>
                    <Menu
                        width={260}
                        position="bottom-end"
                        transitionProps={{ transition: 'pop-top-right' }}
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                        withinPortal
                    >
                        <Menu.Target>
                            <UnstyledButton
                                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                            >
                                <Group gap={10}>
                                    <Avatar src={user.image} alt={user.email} radius="xl" size={40} />
                                    <Text fw={500} size="lg" lh={1} mr={3}>
                                        {user.email}
                                    </Text>
                                </Group>
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                onClick={handleLogout}
                                color="red"
                            >
                                LogOut
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Container>
        </div>
    );
}

export default Header;
