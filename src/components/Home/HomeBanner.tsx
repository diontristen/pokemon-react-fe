import {
    Image,
    Box,
    Text
} from '@mantine/core';
import cx from 'clsx';
import classes from '@/styles/components/Home/HomeBanner.module.css';
import utilClasses from '@/styles/Util.module.css';
import { useUser } from '@/hooks/useUser';

const HomeBanner = () => {
    const { user } = useUser();

    return (
        <Box
            className={classes.container}
        >
            <Text className={classes.tag}>Collector</Text>
            <Text className={cx(classes.name, utilClasses.companyName)}>{user?.first_name} {user?.last_name}</Text>
            <Text className={classes.username}>@{user?.username}</Text>
            <Image
                src='/assets/images/banner.jpeg'
                className={classes.imageBackground} />
        </Box>
    );
};

export default HomeBanner;