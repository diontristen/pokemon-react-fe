import {
    Flex,
    Anchor,
    Image,
    Text,
} from '@mantine/core';
import cx from 'clsx';
import utilClasses from '@/styles/Util.module.css';
import classes from '@/styles/components/Sidebar/Sidebar.module.css';
import SidebarMenu from '@/components/Sidebar/SidebarMenu';
import SidebaUser from '@/components/Sidebar/SidebarUser';
const Sidebar = () => {
    return (
        <Flex className={classes.container}>
            <Anchor className={classes.header} href='/'>
                <Image
                    src='/pokesaur.svg'
                    alt='Company Logo'
                    data-theme='dark'
                    className={classes.companyLogo}
                />
                <Image
                    src='/pokesaur-white.svg'
                    alt='Company Logo'
                    data-theme='light'
                    className={classes.companyLogo}
                />
                <Text component='h6' className={cx(classes.companyName, utilClasses.companyName)}>Pokêsaur</Text>
            </Anchor>
            <SidebarMenu />
            <SidebaUser />
        </Flex>
    );
};

export default Sidebar;