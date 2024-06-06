import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import {
    Stack,
    TextInput,
    Button,
    PasswordInput
} from '@mantine/core';
import ErrorMessage from '@/components/Alert/ErrorMessage';
import { isEmpty } from '@/utils/helper';
import { useForm } from '@mantine/form';
import { useLogin } from '@/hooks/useLogin';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
    username: z
        .string()
        .min(6, { message: 'Username should at least 6 characters' })
        .max(64, { message: 'Username should be less than 65 characters' }),
    password: z
        .string()
        .min(6, { message: 'Password should at least 6 characters' })
        .max(64, { message: 'Password should be less than 65 characters' }),

});

const LoginForm = () => {
    const navigate = useNavigate();
    const { login, loading, error, success } = useLogin();
    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
        validate: zodResolver(schema),
    })

    const onSubmit = async (values: typeof form.values) => {
        if (loading) return;
        login(values);
    }

    useEffect(() => {
        if (success) {
            navigate('/');
        }
    }, [success])


    return (
        <form
            onSubmit={form.onSubmit(onSubmit)}
        >
            {!isEmpty(error) && <ErrorMessage errors={error} />}
            <Stack>
                <TextInput
                    placeholder='Username'
                    data-testid='username'
                    {...form.getInputProps('username')}
                />
                <PasswordInput
                    placeholder='Password'
                    data-testid='password'
                    {...form.getInputProps('password')}
                />
                <Button
                    type='submit'
                    loading={loading}
                    disabled={loading}
                    data-testid='loginButton'
                >
                    Sign in
                </Button>
            </Stack>
        </form>
    );
};

export default LoginForm;