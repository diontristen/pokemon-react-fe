import {
    Anchor,
    Burger,
    Flex,
    Image,
    Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import cx from 'clsx';
import Theme from '@/components/ThemeAction/Theme';
import classes from '@/styles/components/MobileSidebar/MobileSidebar.module.css';
import utilClasses from '@/styles/Util.module.css';
import MobileSidebarDrawer from './MobileSidebarDrawer';

const MobileSidebar = () => {
    const [opened, { toggle }] = useDisclosure();
    return (
        <>
            <Flex className={classes.container}>
                <Anchor href='/'>
                    <Flex className={classes.company}>
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
                        <Text component='h6' inherit className={cx(classes.name, utilClasses.companyName)}>Pokêsaur</Text>
                    </Flex>
                </Anchor>
                <Flex
                    className={classes.action}
                >
                    <Theme />
                    <Burger
                        size="sm"
                        opened={opened}
                        onClick={toggle}
                        aria-label="Toggle sidebar"
                    />
                </Flex>
            </Flex>
            <MobileSidebarDrawer
                opened={opened}
                onToggle={toggle}
            />
        </>
    );
};

export default MobileSidebar;