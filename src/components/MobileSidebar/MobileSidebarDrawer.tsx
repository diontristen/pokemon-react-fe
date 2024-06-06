import {
    Drawer,
    Flex,
 } from '@mantine/core';
import cx from 'clsx';
import SidebarMenu from '@/components/Sidebar/SidebarMenu';
import SidebaUser from '@/components/Sidebar/SidebarUser';
import classes from '@/styles/components/MobileSidebar/MobileSidebar.module.css';
import utilClasses from '@/styles/Util.module.css';

interface Props {
    opened: boolean;
    onToggle: () => void;
}

const MobileSidebarDrawer = ({ opened, onToggle }: Props) => {
    return (
        <Drawer
        position='left'
        title='Pokêsaur'
        opened={opened}
        onClose={onToggle}
        classNames={{
            body: classes.drawerBody,
            title: cx(classes.drawerTitle, utilClasses.companyName)
        }}
    >
        <Flex className={classes.drawerContainer}>
            <SidebarMenu/>
            <SidebaUser/>
        </Flex>
    </Drawer>
    );
};

export default MobileSidebarDrawer;