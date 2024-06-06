import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import {
    Stack,
    TextInput,
    Button,
    PasswordInput,
    Alert,
    Text,
    Anchor
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRegister } from '@/hooks/useRegister';
import { PUBLIC_ROUTES } from '@/routes/routes';
import { isEmpty } from '@/utils/helper';
import classes from '@/styles/components/Register/Register.module.css';
import ErrorMessage from '@/components/Alert/ErrorMessage';

const schema = z.object({
    firstName: z
        .string()
        .min(1, { message: 'First name is required' })
        .max(50, { message: 'First name should be less than 50 characters' }),
    lastName: z
        .string()
        .min(1, { message: 'Last name is required' })
        .max(50, { message: 'Last name should be less than 50 characters' }),
    username: z
        .string()
        .min(6, { message: 'Username should at least 6 characters' })
        .max(64, { message: 'Username should be less than 65 characters' }),
    password: z
        .string()
        .min(6, { message: 'Password should at least 6 characters' })
        .max(64, { message: 'Password should be less than 65 characters' }),
    confirmPassword: z
        .string()
        .min(6, { message: 'Confirm password should at least 6 characters' })
        .max(64, { message: 'Confirm password should be less than 65 characters' }),
}).refine(data => {
    return !(data.password !== data.confirmPassword)
}, { message: 'Password and confirm password do not match', path: ['confirmPassword'] })


const RegisterForm = () => {
    const { register, loading, error, success } = useRegister();
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
        validate: zodResolver(schema),
    })

    const onSubmit = async (values: typeof form.values) => {
        if (loading) return;
        register(values);
    }

    return (
        <form
            onSubmit={form.onSubmit(onSubmit)}
        >
            {!isEmpty(error) && <ErrorMessage errors={error} />}
            {success && <Alert data-variant='success' data-testid="success" classNames={{
                root: classes.success,
            }}>
                <Text mb='0.5rem'>
                    You have been successfully registered. Start collecting!
                </Text>
                <Anchor data-variant='secondary' href={PUBLIC_ROUTES.login}>Sign in now</Anchor>
            </Alert>}
            <Stack>
                <TextInput
                    label='First name'
                    placeholder='John'
                    data-testid='firstName'
                    {...form.getInputProps('firstName')}
                />    <TextInput
                    label='Last name'
                    placeholder='Doe'
                    data-testid='lastName'
                    {...form.getInputProps('lastName')}
                />
                <TextInput
                    label='Username'
                    placeholder='jonhdoe'
                    data-testid='username'
                    {...form.getInputProps('username')}
                />
                <PasswordInput
                    label='Password'
                    placeholder='*******'
                    data-testid='password'
                    {...form.getInputProps('password')}
                />
                <PasswordInput
                    label='Confirm password'
                    placeholder='*******'
                    data-testid='confirmPassword'
                    {...form.getInputProps('confirmPassword')}
                />
                <Button
                    type='submit'
                    loading={loading}
                    disabled={loading}
                    data-testid='registerButton'
                >
                    Sign up
                </Button>
            </Stack>
        </form>
    );
};

export default RegisterForm;