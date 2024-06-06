import { ActionIcon, Box, Button, Flex, Select, Text } from '@mantine/core';
import { useState } from 'react';
import classes from '@/styles/components/Cards/CardsSort.module.css'
import { addKeyValuePair, isEmpty, removeKey, updateKeyValue } from '@/utils/helper';
import { IconX } from '@tabler/icons-react';
import { parseToSentence } from '@/utils/parser';
interface ISort {
    value: string;
    label: string
}

const SORT_BY = [
    {
        value: 'name',
        label: "Name"
    },
    {
        value: 'created_at',
        label: 'Created'
    },
    {
        value: 'price',
        label: 'Price'
    },
    {
        value: 'condition',
        label: 'Condition'
    }
]

const SORT_ORDER = [
    {
        value: 'asc',
        label: 'ASC'
    },
    {
        value: 'desc',
        label: 'DESC'
    }
]

interface Props {
    title: string;
    sort: Record<string, string>;
    local?: boolean;
    setSort: (sort: Record<string, string>) => void;
    onSort: () => void;
    onReset: () => void;
}

const CardsSort = ({ title, sort, local = false, setSort, onSort, onReset }: Props) => {
    const [available, setAvailable] = useState<ISort[]>(SORT_BY);

    const onSelect = (value: string | null) => {
        if (isEmpty(value)) return;
        const sortValue = SORT_BY.find(sort => sort.value === value);
        if (!sortValue) return;
        setSort(prev => addKeyValuePair(prev, sortValue.value, 'asc'));
        setAvailable(prev => (prev || []).filter(item => item.value !== value))
    }

    const onRemove = (key: string) => {
        const currentSort = removeKey(sort, key);
        setSort(currentSort);
        if (!isEmpty(currentSort)) {
            const filteredSortSelect = SORT_BY.filter(item => !(item.value in currentSort));
            setAvailable(filteredSortSelect)
        } else {
            setAvailable(SORT_BY)
        }
    }

    const onUpdate = (key: string, value: 'asc' | 'desc') => {
        setSort(prev => updateKeyValue(prev, key, value));
    }

    const onLocalReset = () => {
        setAvailable(SORT_BY);
        onReset();
    }

    return (
        <Box className={classes.container}>
            <Text className={classes.title}>{title}</Text>
            <Select
                className={classes.select}
                data={available}
                placeholder='Choose multiple sorts'
                onChange={onSelect}
            />
            <Flex className={classes.selectItemContainer}>
                {sort && Object.entries(sort).map(([key, value]) => (
                    <Flex key={key} className={classes.selectItem}>
                        <Text className={classes.selectItemTitle}>{parseToSentence(key)}</Text>
                        <Select
                            data={SORT_ORDER}
                            defaultValue={SORT_ORDER[0].value}
                            onChange={(value) => onUpdate(key, value)}
                            className={classes.selectItemSelect}
                        />
                        <ActionIcon
                            variant='transparent'
                            onClick={() => onRemove(key)}
                        >
                            <IconX />
                        </ActionIcon>
                    </Flex>
                ))}
            </Flex>
            <Flex className={classes.selectItemCta}>
                <Button
                    onClick={onSort}
                >
                    Sort
                </Button>
                <Button
                    variant='outlined'
                    onClick={onLocalReset}
                >
                    Reset
                </Button>
            </Flex>
        </Box>
    );
};

export default CardsSort;