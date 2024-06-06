import Backdrop from "@/components/Backdrop/Backdrop";
import { Box } from "@mantine/core";
import cx from 'clsx';
import utilClasses from '@/styles/Util.module.css';
import classes from '@/styles/components/Register/Register.module.css';
import Circles from "@/components/Backdrop/Circles";
import RegisterFormContainer from "@/components/Register/RegisterFormContainer";
const Register = () => {
    return (
        <Box className={cx(utilClasses.container, classes.container)} data-overflow={true}>
            <Backdrop/>
            <RegisterFormContainer/>
            <Circles/>
        </Box>
    );
};

export default Register;