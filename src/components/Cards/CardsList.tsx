import { Text, Flex, Pagination, Box } from '@mantine/core';
import CardsLoader from './CardsLoader';
import Cards from './Cards';
import classes from '@/styles/components/Cards/CardsList.module.css';
import utilClasses from '@/styles/Util.module.css';
import { isEmpty } from '@/utils/helper';
import { useCardStore } from '@/store/useCardStore';
import { useGetCards } from '@/hooks/useCard';
import { ICard } from '@/types/card';
import ErrorMessage from '../Alert/ErrorMessage';
const CardsList = () => {
    const { cards, page, pageSize, name, query, totalPageCount, setPage } = useCardStore();
    const { loading, error } = useGetCards({
        page,
        pageSize,
        ...query,
    });

    return (
        <>
            {!isEmpty(totalPageCount) && Number(totalPageCount) > 0 &&
                <Pagination
                    classNames={{
                        root: classes.pagination,
                    }}
                    disabled={loading}
                    onChange={setPage}
                    value={page}
                    total={totalPageCount ?? 1}
                    siblings={2}
                    defaultValue={1} />}
            <Flex className={classes.container}>
                {loading &&
                    Array.from({ length: 18 }).map((_, index) => (
                        <CardsLoader key={index} />
                    ))
                }
                {!loading && cards && cards.map((card: ICard) => (
                    <Cards
                        key={card.id}
                        card={card}
                    />
                ))}
                {!loading && cards && cards.length < 1 && <Box className={utilClasses.noData}>
                    <Text>
                        No Data
                    </Text>
                </Box>}
                {!isEmpty(error) && <Box className={utilClasses.noData}>
                    <Text>
                        <ErrorMessage errors={error}/>
                    </Text>
                </Box>}
            </Flex>
            {!isEmpty(totalPageCount) && Number(totalPageCount) > 0 &&
                <Pagination
                    className={classes.pagination}
                    disabled={loading}
                    onChange={setPage}
                    value={page}
                    total={totalPageCount ?? 1}
                    siblings={2}
                    defaultValue={1} />}
        </>
    );
};

export default CardsList;