import { Flex } from "@mantine/core";
import HomeBanner from "@/components/Home/HomeBanner";
import PokemonSearch from "@/components/PokemonSearch/PokemonSearch";
import AddCard from "@/components/AddCard/AddCard";
import utilClasses from '@/styles/Util.module.css';
import PokemonCardList from "@/components/Pokemon/PokemonList";
const Home = () => {

    return (
        <Flex className={utilClasses.pageContainer}>
            <HomeBanner/>
            <PokemonSearch />
            <PokemonCardList />
            <AddCard />
        </Flex>
    );
};

export default Home;