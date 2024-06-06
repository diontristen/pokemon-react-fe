import Backdrop from "@/components/Backdrop/Backdrop";
import { Box } from "@mantine/core";
import cx from 'clsx';
import LoginFormContainer from "@/components/Login/LoginFormContainer";
import utilClasses from '@/styles/Util.module.css';
import classes from '@/styles/components/Login/Login.module.css';
import Circles from "@/components/Backdrop/Circles";
const Login = () => {
    return (
        <Box className={cx(utilClasses.container, classes.container)} data-overflow={true}>
            <Backdrop/>
            <Circles/>
            <LoginFormContainer/>
        </Box>
    );
};

export default Login;