import {
    ActionIcon,
    Button,
    Flex,
    TextInput
} from '@mantine/core';
import classes from '@/styles/components/Cards/CardSearch.module.css';
import { useState } from 'react';
import { IconRefresh, IconSearch } from '@tabler/icons-react';
import { useCardStore } from '@/store/useCardStore';
import CardsSort from '../Cards/CardsSort';
import CardsFilter from '../Cards/CardsFilter';
import { isEmpty } from '@/utils/helper';
const CardSearch = () => {
    const setQuery = useCardStore((state) => state.setQuery);
    const clearQuery = useCardStore((state) => state.clearQuery);
    const serverCards = useCardStore((state) => state.serverCards);
    const localCards = useCardStore((state) => state.localCards);
    const setCards = useCardStore((state) => state.setCards);
    const setLocalCards = useCardStore((state) => state.setLocalCards);
    const [name, setName] = useState<string>('');
    const [sort, setSort] = useState<Record<string, string>>();
    const [localSort, setLocalSort] = useState<Record<string, string>>();
    const [types, setTypes] = useState<string[]>();
    const [localTypes, setLocalTypes] = useState<string[]>();


    const handleOnChangeName = (e) => {
        const value = e.target.value;
        setName(value);
    }


    const onSubmit = () => {
        const sortBy = sort && Object.keys(sort);
        const sortOrder = sort && Object.values(sort);
        const query = {
            name: name,
            sortBy: sortBy,
            sortOrder: sortOrder,
            types: types
        }
        setQuery(query);

    }

    const onReset = () => {
        clearQuery();
    }

    const onSortReset = () => {
        setSort([]);
        const query = {
            name: name,
            sortBy: [],
            sortOrder: [],
            types: types
        }
        setQuery(query);
    }

    const onFilterReset = () => {
        setTypes([]);
        const sortBy = sort && Object.keys(sort);
        const sortOrder = sort && Object.values(sort);
        const query = {
            name: name,
            sortBy: sortBy,
            sortOrder: sortOrder,
            types: []
        }
        setQuery(query);
    }

    const handleLocalSort = (changeSort: Record<string, string>) => {
        if (!localCards || isEmpty(localCards)) return [];
        if (!changeSort || isEmpty(changeSort)) return localCards;
        const sortBy = Object.keys(changeSort);
        const sortOrder = Object.values(changeSort);
        const newCards = localCards.sort((a, b) => {
            for (let i = 0; i < sortBy.length; i++) {
                const field = sortBy[i];
                const order = sortOrder[i];

                if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
                if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setCards(newCards);
        setLocalCards(newCards);
    }

    const onLocalSort = () => {
        handleLocalSort(localSort);
    }

    const onLocalSortReset = () => {
        handleLocalSort(sort);
    }

    const handleLocalFilter = (changeTypes: string[]) => {
        if (!serverCards || isEmpty(serverCards)) return [];
        const newCards = serverCards.filter(card =>
            card.pokemon_tcg_data.types.some(type => changeTypes.includes(type))
        );
        setCards(newCards);
        setLocalCards(newCards);
    }

    const onLocalFilter = () => {
        handleLocalFilter(localTypes);
    }

    const onLocalFilterReset = () => {
        handleLocalFilter(types);
    }


    return (
        <>
            <Flex className={classes.container}>
                <TextInput
                    className={classes.searchInput}
                    placeholder='Look for a pokemon in your collection'
                    onChange={handleOnChangeName}
                    leftSection={<IconSearch size={14} />}
                />
                <Flex className={classes.searchAction}>
                    <Button
                        onClick={onSubmit}
                        leftSection={<IconSearch size={14} />}
                    >
                        Search
                    </Button>
                    <ActionIcon
                        onClick={onReset}
                        className={classes.refresh}>
                        <IconRefresh />
                    </ActionIcon>
                </Flex>
            </Flex>
            <Flex
                className={classes.sort}
            >
                <CardsSort
                    title='Sort search'
                    sort={sort}
                    setSort={setSort}
                    onSort={onSubmit}
                    onReset={onSortReset}
                />
                <CardsSort
                    title='Sort Result'
                    sort={localSort}
                    setSort={setLocalSort}
                    onSort={onLocalSort}
                    onReset={onLocalSortReset}
                />
            </Flex>
            <Flex
                className={classes.sort}
            >
                <CardsFilter
                    title='Filter Tags Search'
                    types={types}
                    setTypes={setTypes}
                    onFilter={onSubmit}
                    onReset={onFilterReset}
                />
                <CardsFilter
                    title='Filter Tags Result'
                    types={localTypes}
                    setTypes={setLocalTypes}
                    onFilter={onLocalFilter}
                    onReset={onLocalFilterReset}
                />
            </Flex>

        </>
    );
};

export default CardSearch;