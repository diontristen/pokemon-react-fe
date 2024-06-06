import {
    Box,
    Image,
    Text,
    Flex,
} from '@mantine/core';
import classes from '@/styles/components/Pokemon/Pokemon.module.css';
import { IPokemon } from '@/types/pokemon';

interface Props {
    pokemon: IPokemon;
}

const Pokemon = ({ pokemon }: Props) => {
    return (
        <Box className={classes.container}>
            <Image
                src={pokemon?.images?.large}
                alt='Pokemon image'
                className={classes.image}
            />
            <Box className={classes.nameContainer}>
                <Text className={classes.name}>{pokemon?.name}</Text>
                <Text truncate='end' className={classes.nameBackdrop}>{pokemon?.name}</Text>
            </Box>
            <Text className={classes.series}>{pokemon?.set?.series}</Text>
            <Text className={classes.code}>{pokemon?.set?.ptcgoCode}</Text>
            <Flex className={classes.typeContainer}>
                {pokemon?.types && pokemon.types.map(type => (
                    <Text
                        key={`${pokemon.id}-${type}`}
                        className={classes.type}
                    >
                        {type}
                    </Text>
                ))}
            </Flex>
        </Box>
    );
};

export default Pokemon;