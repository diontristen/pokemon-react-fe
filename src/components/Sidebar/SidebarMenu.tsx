
import { IconHome, IconSettings, IconBook2 } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import classes from '@/styles/components/Sidebar/Sidebar.module.css';
import type { ISidebarMenuItem } from '@/types/menu';
import { PRIVATE_ROUTES } from '@/routes/routes';
import SidebarMenuItem from '@/components/Sidebar/SidebarMenuItem';

const MENUS: ISidebarMenuItem[] = [
    {
        key: 'home',
        icon: IconHome,
        name: 'Home',
        link: PRIVATE_ROUTES.home,
    },
    {
        key: 'colleciton',
        icon: IconBook2,
        name: 'Collection',
        link: PRIVATE_ROUTES.collection,
    },
    {
        key: 'settings',
        icon: IconSettings,
        name: 'Settings',
        link: PRIVATE_ROUTES.settings,
    }
]

const SidebarMenu = () => {
    return (
        <Flex className={classes.menu}>
            {MENUS && MENUS.map((menu: ISidebarMenuItem) => (
                <SidebarMenuItem
                    key={menu.key}
                    menu={menu}
                />
            ))}
        </Flex>
    );
};

export default SidebarMenu;