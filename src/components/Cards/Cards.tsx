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
import { useCardModalStore } from '@/store/useCardModalStore';
import { ICard } from '@/types/card';
interface Props {
    card: ICard
}

const Cards = ({ card }: Props) => {
    const pokemon = card?.pokemon_tcg_data;
    const { setCard } = useCardModalStore();
    const onSelect = () => {
        setCard(card)
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
                <Text className={cx(classes.pokemonName, utilClasses.companyName)}>{pokemon?.name}</Text>
                <Text className={classes.pokemonSeries}>{pokemon?.set?.series}</Text>
                <Text className={classes.pokemonCode}>{pokemon?.set?.ptcgoCode}</Text>
                <Flex className={classes.pokemonTypeContainer}>
                    {pokemon?.types && pokemon.types.map(type => (
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

export default Cards;