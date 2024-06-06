import { ReactNode } from 'react';
import {
    Flex,
    Box
} from '@mantine/core';
import Sidebar from '@/components/Sidebar/Sidebar';
import classes from '@/styles/components/Layout/Layout.module.css';
import MobileSidebar from '@/components/MobileSidebar/MobileSidebar';
import Theme from '@/components/ThemeAction/Theme';

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <Flex className={classes.container}>
            <Box className={classes.sidebar}>
                <Sidebar />
            </Box>
            <Box className={classes.page} id="page">
                <Box className={classes.theme}>
                    <Theme />
                </Box>
                <MobileSidebar />
                <Box className={classes.pageContent}>
                    {children}
                </Box>
            </Box>

        </Flex>
    );
};

export default Layout;