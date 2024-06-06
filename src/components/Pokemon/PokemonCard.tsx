import { IPokemon } from '@/types/pokemon';
import {
    Flex,
    Image,
    Text,
    Box
} from '@mantine/core';
import cx from 'clsx';
import classes from '@/styles/components/Cards/Cards.module.css';
import utilClasses from '@/styles/Util.module.css';
import { usePokemonModalStore } from '@/store/usePokemonModalStore';
interface Props {
    pokemon: IPokemon
}

const PokemonCard = ({ pokemon }: Props) => {
    const { setPokemon } = usePokemonModalStore();

    const onSelect = () => {
        setPokemon(pokemon)
    }

    return (
        <Flex className={classes.container} onClick={onSelect}>
            <Image
                src={pokemon?.images?.large}
                alt='Pokemon card'
                className={classes.image}
            />
            <Box className={classes.content}>
                <Image
                    src={pokemon?.set?.images?.logo}
                    className={classes.pokemonSeriesLogo}
                />
                <Text className={cx(classes.pokemonName, utilClasses.companyName)}>{pokemon.name}</Text>
                <Text className={classes.pokemonSeries}>{pokemon.set?.series}</Text>
                <Text className={classes.pokemonCode}>{pokemon.set?.ptcgoCode}</Text>
                <Flex className={classes.pokemonTypeContainer}>
                    {pokemon.types && pokemon.types.map(type => (
                        <Text
                            key={`${pokemon.id}-${type}`}
                            className={classes.pokemonType}
                        >
                            {type}
                        </Text>
                    ))}
                </Flex>
            </Box>
        </Flex>
    );
};

export default PokemonCard;