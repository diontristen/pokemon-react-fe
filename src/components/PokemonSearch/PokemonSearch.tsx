import {
    ActionIcon,
    Button,
    Flex,
    TextInput
} from '@mantine/core';
import classes from '@/styles/components/PokemonSearch/PokemonSearch.module.css';
import { usePokemonStore } from '@/store/usePokemonStore';
import { useState } from 'react';
import { IconRefresh, IconSearch } from '@tabler/icons-react';
const PokemonSearch = () => {
    const setSearchName = usePokemonStore((state) => state.setSearchName);
    const [name, setName] = useState<string>('');

    const handleOnChangeName = (e) => {
        const value = e.target.value;
        setName(value);
    }

    const onSubmit = () => {
        setSearchName(name)
    }

    const onReset = () => {
        setSearchName('')
    }


    return (
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
    );
};

export default PokemonSearch;