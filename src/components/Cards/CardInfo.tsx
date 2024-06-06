import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { ICard } from '@/types/card';
import { Button, NumberInput, Stack, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import classes from '@/styles/components/Cards/CardsInfo.module.css';
import { useRemoveCard, useUpdateCard } from '@/hooks/useCard';
import ErrorMessage from '../Alert/ErrorMessage';
import { isEmpty } from '@/utils/helper';
import { notifications } from '@mantine/notifications';
import { useCardModalStore } from '@/store/useCardModalStore';
import { useCardStore } from '@/store/useCardStore';
interface Props {
    card: ICard;
}

const schema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name is required and should be at least 1 character' })
        .max(64, { message: 'Name should be less than 65 characters' }),
    date_received: z
        .date({ required_error: 'Date received is required' })
        .refine((val) => !isNaN(Date.parse(val)), { message: 'Date received should be a valid date' }),
    price: z
        .number()
        .min(0, { message: 'Price is required and should be at least 0 if free' }),
    condition: z
        .number()
        .min(1, { message: 'Condition should be at least 1' })
        .max(10, { message: 'Condition should be at most 10' }),
    pokemon_tcg_id: z
        .string()
        .max(255, { message: 'Pokemon TCG ID should be less than 256 characters' })
        .nullable(),
    pokemon_tcg_data: z
        .record(z.any())
        .nullable(),
    pieces: z
        .number()
        .min(1, { message: 'Pieces are required and should be at least 1' }),
    remarks: z
        .string()
        .max(255, { message: 'Remarks should be less than 256 characters' })
        .nullable(),
});

const CardInfo = ({ card }: Props) => {
    const [readOnly, setReadOnly] = useState<boolean>(true);
    const { closeModal } = useCardModalStore();
    const { updateCards, removeCards } = useCardStore();
    const { updateCard, loading, error, success } = useUpdateCard();
    const { removeCard, loading: removeLoading, error: removeError, success: removeSuccess } = useRemoveCard();
    const form = useForm({
        initialValues: {
            name: card?.name,
            date_received: new Date(card.date_received),
            price: card.price,
            condition: card.condition,
            pokemon_tcg_id: card.pokemon_tcg_id,
            pokemon_tcg_data: card.pokemon_tcg_data,
            pieces: card.pieces,
            remarks: card.remarks
        },
        validate: zodResolver(schema),
    });

    const toggleUpdateCard = () => {
        setReadOnly(false);
    }


    useEffect(() => {
        if (success) {
            updateCards(card.id, form.values);
            notifications.show({
                title: 'Card update!',
                message: `${form.values.name} has been updated`,
                color: 'primary'
            });
            closeModal();
        }
    }, [success])

    useEffect(() => {
        if (removeSuccess) {
            removeCards(card.id);
            notifications.show({
                title: 'Card deleted!',
                message: `${form.values.name} has been removed to your collection`,
                color: 'primary'
            });
            closeModal();
        }
    }, [removeSuccess])


    const onSubmit = async (values: typeof form.values) => {
        if (loading || !card?.id || removeLoading) return;
        updateCard(card.id, values);
    }

    const onRemoveCard = async () => {
        if (loading || !card?.id || removeLoading) return;
        removeCard(card.id);
    }


    return (
        <form
            className={classes.form}
            onSubmit={form.onSubmit(onSubmit)}
        >
            {!isEmpty(error) && <ErrorMessage errors={error} />}
            {!isEmpty(removeError) && <ErrorMessage errors={removeError} />}
            <Stack>
                <TextInput
                    label="Custom Name"
                    placeholder="Enter a custom pokemon name"
                    readOnly={readOnly}
                    classNames={{
                        label: classes.label
                    }}
                    {...form.getInputProps('name')}
                />
                <DatePickerInput
                    label="Date received"
                    placeholder='MM-DD-YYYY'
                    readOnly={readOnly}
                    classNames={{
                        label: classes.label,
                        input: readOnly ? classes.dateInput : ''
                    }}
                    {...form.getInputProps('date_received')}
                />
                <NumberInput
                    label="Price"
                    placeholder="Bought price"
                    readOnly={readOnly}
                    classNames={{
                        label: classes.label
                    }}
                    {...form.getInputProps('price')}
                />
                <NumberInput
                    label="Condition (1-10)"
                    placeholder="Enter condition on a scale of 1 - 10"
                    readOnly={readOnly}
                    max={10}
                    min={1}
                    classNames={{
                        label: classes.label
                    }}
                    {...form.getInputProps('condition')}
                />
                <NumberInput
                    label="No. of Pieces"
                    placeholder="Enter the number of pieces you have"
                    readOnly={readOnly}
                    classNames={{
                        label: classes.label
                    }}
                    {...form.getInputProps('pieces')}
                />
                <TextInput
                    label="Remarks"
                    placeholder={readOnly ? 'N/A' : 'Additional comment'}
                    readOnly={readOnly}
                    classNames={{
                        label: classes.label
                    }}
                    {...form.getInputProps('remarks')}
                />
                {readOnly && <Button
                    onClick={toggleUpdateCard}
                >
                    Update Card
                </Button>}
                {!readOnly && <Button
                    onClick={toggleUpdateCard}
                    type='submit'
                    loading={loading}
                    disabled={loading || removeLoading}
                >
                    Update Card
                </Button>}
                <Button
                    variant='danger'
                    loading={removeLoading}
                    disabled={loading || removeLoading}
                    onClick={onRemoveCard}
                >
                    Delete
                </Button>
            </Stack>
        </form>
    );
};

export default CardInfo;