import {
    Modal,
    Tabs,
} from '@mantine/core';
import Pokemon from '@/components/Pokemon/Pokemon';
import { useCardModalStore } from '@/store/useCardModalStore';
import CardInfo from './CardInfo';
import classes from '@/styles/components/Cards/CardsModal.module.css';
const CardsModal = () => {
    const { opened, card, closeModal } = useCardModalStore();

    const onClose = () => {
        closeModal();
    }

    return (
        <Modal
            title={card?.name}
            opened={opened}
            onClose={onClose}
        >
            <Tabs defaultValue="card"
                classNames={{
                    tab: classes.tabs
                }}
            >
                <Tabs.List >
                    <Tabs.Tab value="card">
                        Card
                    </Tabs.Tab>
                    <Tabs.Tab value="details">
                        Details
                    </Tabs.Tab>
                </Tabs.List>


                <Tabs.Panel value="card">
                    {card?.pokemon_tcg_data && <Pokemon pokemon={card?.pokemon_tcg_data} />}
                </Tabs.Panel>


                <Tabs.Panel value="details">
                    {card && <CardInfo card={card} />}
                </Tabs.Panel>
            </Tabs>
        </Modal>
    );
};

export default CardsModal;