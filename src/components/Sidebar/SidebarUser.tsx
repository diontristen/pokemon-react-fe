import {
    Flex,
    Menu,
    Text,
    Image
} from '@mantine/core';
import { IconDotsVertical } from '@tabler/icons-react';
import { useLogout } from '@/hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import classes from '@/styles/components/Sidebar/Sidebar.module.css';
const SidebaUser = () => {
    const navigate = useNavigate();
    const { logout } = useLogout();
    const { user } = useUser();

    const onLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <Menu
            position='top-end'
            classNames={{
                dropdown: classes.userDropdown
            }}
        >
            <Menu.Target>
                <Flex className={classes.user}>
                    <Flex>
                        <Image
                            className={classes.userIcon}
                            src={user?.avatar}
                            alt='User icon'
                        />
                    </Flex>
                    <Flex className={classes.userDetails}>
                        <Text className={classes.name}>{user?.first_name} {user?.last_name}</Text>
                        <Text className={classes.username}>@{user?.username}</Text>
                    </Flex>
                    <IconDotsVertical />
                </Flex>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item onClick={onLogout}>
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default SidebaUser;