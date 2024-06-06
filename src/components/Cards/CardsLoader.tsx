import { Skeleton } from '@mantine/core';
import cx from 'clsx';
import classes from '@/styles/components/Cards/Cards.module.css';
const CardsLoader = () => {
    return (
        <Skeleton
            className={cx(classes.container, classes.containerLoader)}
        />
    );
};

export default CardsLoader;