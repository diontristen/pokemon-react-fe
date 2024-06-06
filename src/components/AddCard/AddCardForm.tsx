import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import {
    NumberInput,
    TextInput,
    Stack,
    Button,
    Flex,
    Text
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconChevronLeft } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import classes from '@/styles/components/AddCard/AddCardForm.module.css';
import { usePokemonModalStore } from '@/store/usePokemonModalStore';
import ErrorMessage from '../Alert/ErrorMessage';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { useAddCard } from '@/hooks/useCard';
import { isEmpty } from '@/utils/helper';


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


interface Props {
    back: () => void;
}

const AddCardForm = ({ back }: Props) => {
    const { pokemon, closeModal } = usePokemonModalStore();
    const { addCard, loading, error, success } = useAddCard();
    const form = useForm({
        initialValues: {
            name: pokemon?.name,
            date_received: new Date(),
            price: null,
            condition: 1,
            pokemon_tcg_id: pokemon?.id,
            pokemon_tcg_data: pokemon,
            pieces: 1,
            remarks: ''
        },
        validate: zodResolver(schema),
    });

    useEffect(() => {
        if (pokemon) {
            form.setFieldValue('name', pokemon?.name);
            form.setFieldValue('pokemon_tcg_id', pokemon?.id);
            form.setFieldValue('pokemon_tcg_data', pokemon);
        }
    }, [pokemon])

    useEffect(() => {
        if (success) {
            notifications.show({
                title: 'New card has been added!',
                message: `${form.values.name} has been added to your collection`,
                color: 'primary'
            });
            closeModal();
        }
    }, [success])
    


    const onSubmit = async (values: typeof form.values) => {
        if (loading) return;
        addCard(values);
    }


    return (
        <form
            onSubmit={form.onSubmit(onSubmit)}
        >
            <Flex className={classes.back} onClick={back}>
                <IconChevronLeft />
                <Text>Back</Text>
            </Flex>
            {!isEmpty(error) && <ErrorMessage errors={error} />}
            <Stack>
                <TextInput
                    label="Custom Name"
                    placeholder="Enter a custom pokemon name"
                    {...form.getInputProps('name')}
                />
                <DatePickerInput
                    label="Date received"
                    placeholder='MM-DD-YYYY'
                    {...form.getInputProps('date_received')}
                />
                <NumberInput
                    label="Price"
                    placeholder="Bought price"
                    {...form.getInputProps('price')}
                />
                <NumberInput
                    label="Condition (1-10)"
                    placeholder="Enter condition on a scale of 1 - 10"
                    {...form.getInputProps('condition')}
                    max={10}
                    min={1}
                />
                <NumberInput
                    label="No. of Pieces"
                    placeholder="Enter the number of pieces you have"
                    {...form.getInputProps('pieces')}
                />
                <TextInput
                    label="Remarks"
                    placeholder="Additional comment"
                    {...form.getInputProps('remarks')}
                />
                <Button
                    type='submit'
                    data-testid='addButton'
                >
                    Add Card
                </Button>
            </Stack>
        </form>
    );
};

export default AddCardForm;