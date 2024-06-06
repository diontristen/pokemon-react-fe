import {
    Modal,
    Button
} from '@mantine/core';
import { usePokemonModalStore } from '@/store/usePokemonModalStore';
import classes from '@/styles/components/Pokemon/Pokemon.module.css';
import Pokemon from '@/components/Pokemon/Pokemon';
import AddCardForm from './AddCardForm';
import { useEffect, useState } from 'react';
const AddCard = () => {
    const { opened, pokemon, closeModal } = usePokemonModalStore();
    const [add, setAdd] = useState<boolean>(false);


    const onClose = () => {
        setAdd(false);
        closeModal();
    }

    const onAdd = () => {
        setAdd(true);
    }

    const onBack = () => {
        setAdd(false);
    }

    useEffect(() => {
        if (!opened) {
            setAdd(false);
        }
        return () => {
            setAdd(false);
        }
    }, [opened])

    return (
        <Modal
            title={pokemon?.name}
            opened={opened}
            onClose={onClose}
        >
            {!add && <Pokemon pokemon={pokemon}/>}
            {add && <AddCardForm back={onBack} />}
            {!add && <Button
                className={classes.cta}
                onClick={onAdd}
            >
                Add to collection
            </Button>}
        </Modal>
    );
};

export default AddCard;