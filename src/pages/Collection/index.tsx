import { Flex } from '@mantine/core';
import utilClasses from '@/styles/Util.module.css';
import HomeBanner from '@/components/Home/HomeBanner';
import CardsList from '@/components/Cards/CardsList';
import CardSearch from '@/components/CardSearch/CardSearch';
import CardsModal from '@/components/Cards/CardsModal';

const Collection = () => {
    return (
        <Flex className={utilClasses.pageContainer}>
            <HomeBanner />
            <CardSearch/>
            <CardsList/>
            <CardsModal/>
        </Flex>
    );
};

export default Collection;