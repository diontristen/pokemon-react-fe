import {
    Image,
    Box,
    Text
} from '@mantine/core';
import cx from 'clsx';
import classes from '@/styles/components/Backdrop/Backdrop.module.css';
import utilClasses from '@/styles/Util.module.css';

const Backdrop = () => {
    return (
        <>
            <Image
                src='/assets/images/realistic-bulbasaur.png'
                alt='Realistic Bulbasaur'
                className={classes.bulbasaur}
            />
            <Box className={classes.company}>
                <Text component='h1' className={cx(classes.companyName , utilClasses.companyName)}>
                    Pokêsaur
                </Text>
                <Text className={classes.companySlogan}>
                    Virtual card binder
                </Text>
            </Box>
            <Box className={classes.boxOne} />
            <Box className={classes.boxTwo} />
        </>
    );
};

export default Backdrop;