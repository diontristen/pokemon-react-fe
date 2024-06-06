import { Flex, Loader as MLoader } from "@mantine/core";
import utilClasses from '@/styles/Util.module.css';
const Loader = () => {
    return (
        <Flex className={utilClasses.loader}>
            <MLoader size='lg'/>
        </Flex>
    );
};

export default Loader;