import {
    Flex,
    Text
} from '@mantine/core';
import classes from '@/styles/components/Sidebar/Sidebar.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ISidebarMenuItem } from '@/types/menu';


interface Props {
    menu: ISidebarMenuItem
}

const SidebarMenuItem = ({ menu }: Props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const onClick = () => {
        navigate(menu.link);
    }

    return (
        <Flex 
        className={classes.menuItem}
        data-active={menu.link === currentPath}
        onClick={onClick}
        >
            <menu.icon className={classes.menuItemIcon} />
            <Text>{menu.name}</Text>
        </Flex>
    );
};

export default SidebarMenuItem;