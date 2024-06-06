import {
    Box,
    Button,
    Flex,
    Text
} from '@mantine/core';
import { useCallback } from 'react';
import classes from '@/styles/components/Cards/CardsFilter.module.css';
const TYPES = [
    "Colorless",
    "Darkness",
    "Dragon",
    "Fairy",
    "Fighting",
    "Fire",
    "Grass",
    "Lightning",
    "Metal",
    "Psychic",
    "Water"
]
interface Props {
    title: string;
    types: string[];
    setTypes: (types: string[]) => void;
    onFilter: () => void;
    onReset: () => void;
}

const CardsFilter = ({ title, types, setTypes, onFilter, onReset }: Props) => {
    const toggleItemInAvailable = useCallback((item: string) => {
        setTypes((prevAvailable) => {
            if (!prevAvailable) {
                return [item];
            } else if (prevAvailable && prevAvailable.includes(item)) {
                return prevAvailable.filter((i) => i !== item);
            } else {
                return [...prevAvailable, item];
            }
        });
    }, []);

    return (
        <Box className={classes.container}>
            <Text className={classes.title}>{title}</Text>
            <Flex className={classes.tagsContainer}>
                {TYPES && TYPES.map(type => (
                    <Box
                        onClick={() => toggleItemInAvailable(type)}
                        key={type}
                        className={classes.tags}
                        data-selected={types && types.includes(type)}>
                        {type}
                    </Box>
                ))}
            </Flex>

            <Flex className={classes.selectItemCta}>
                <Button
                    onClick={onFilter}
                >
                    Filter
                </Button>
                <Button
                    variant='outlined'
                    onClick={onReset}
                >
                    Reset
                </Button>
            </Flex>
        </Box>
    );
};

export default CardsFilter;