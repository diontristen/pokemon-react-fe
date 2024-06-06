import {
    Box,
    Flex,
    Text,
    Image,
    Anchor,
} from '@mantine/core';
import { PUBLIC_ROUTES } from '@/routes/routes';
import Theme from '@/components/ThemeAction/Theme';
import RegisterForm from '@/components/Register/RegisterForm';
import cx from 'clsx';
import classes from '@/styles/components/Register/Register.module.css';
import utilClasses from '@/styles/Util.module.css';
const RegisterFormContainer = () => {
    return (
        <Flex className={classes.contentContainer}>
            <Theme />
            <Image
                src='/pokesaur.svg'
                alt='Company Logo'
                data-theme='dark'
                className={classes.logo}
            />
            <Image
                src='/pokesaur-white.svg'
                alt='Company Logo'
                data-theme='light'
                className={classes.logo}
            />
            <Text component='h6' className={cx(classes.companyName, utilClasses.companyName)}>Pokêsaur</Text>
            <Text className={classes.slogan}>
                Where Every Card Finds Its Perfect Spot
            </Text>
            <Box className={classes.form}>
                <Text className={classes.message}>Join and share your hidden gems</Text>
                <RegisterForm />
            </Box>
            <Text className={classes.footer}>Already have an account yet? <Anchor href={PUBLIC_ROUTES.login}> Sign in here!</Anchor></Text>
        </Flex>
    );
};

export default RegisterFormContainer;