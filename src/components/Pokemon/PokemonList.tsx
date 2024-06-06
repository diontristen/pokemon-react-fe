import { Text, Flex, Pagination, Box } from '@mantine/core';
import CardsLoader from '@/components/Cards/CardsLoader';
import Cards from '@/components/Cards/Cards';
import { usePokemon } from '@/hooks/usePokemon';
import { usePokemonStore } from '@/store/usePokemonStore';
import { IPokemon } from '@/types/pokemon';
import classes from '@/styles/components/Cards/CardsList.module.css';
import utilClasses from '@/styles/Util.module.css';
import { isEmpty } from '@/utils/helper';
import ErrorMessage from '../Alert/ErrorMessage';
import PokemonCard from './PokemonCard';
const PokemonCardList = () => {
    const { pokemons, page, pageSize, name, totalPageCount, setPage } = usePokemonStore();
    const { loading, error } = usePokemon({
        page,
        pageSize,
        name
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
                {!loading && pokemons && pokemons.map((pokemon: IPokemon) => (
                    <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                    />
                ))}
                {!loading && pokemons && pokemons.length < 1 && <Box className={utilClasses.noData}>
                    <Text>
                        No Data
                    </Text>
                </Box>}
                {!isEmpty(error) && <Box className={utilClasses.noData}>
                    <Text>
                        <ErrorMessage errors={error} />
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

export default PokemonCardList;