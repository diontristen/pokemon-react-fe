import {
    Box,
    Flex,
    Text,
    Image,
    Anchor,
} from '@mantine/core';
import LoginForm from '@/components/Login/LoginForm';
import { PUBLIC_ROUTES } from '@/routes/routes';
import Theme from '@/components/ThemeAction/Theme';
import cx from 'clsx';
import classes from '@/styles/components/Login/Login.module.css';
import utilClasses from '@/styles/Util.module.css';
const LoginFormContainer = () => {
    return (
        <Flex className={classes.contentContainer}>
            <Theme/>
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
                Unlock Your Card Collection with us
            </Text>
            <Box className={classes.form}>
                <Text className={classes.message}>Start saving your collection</Text>
                <LoginForm />
            </Box>
            <Text className={classes.footer}>Don't have an account yet? <Anchor href={PUBLIC_ROUTES.signUp}> Sign up now!</Anchor></Text>
        </Flex>
    );
};

export default LoginFormContainer;