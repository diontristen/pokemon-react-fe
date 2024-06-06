import type { IApiError } from '@/types/error';
import { parseToSentence } from '@/utils/parser';
import { Alert, Text } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

interface Props {
    errors: IApiError | string | null;
}

const formatValue = (value: string | string[]): string => {
    if (Array.isArray(value)) {
        return value.join(', ');
    }
    return value;
};

const ErrorMessage = ({ errors }: Props) => {
    const [value, toggle] = useToggle([true, false]);
    return (
        <>
            {value && <Alert data-variant='danger' data-testid='error' my='1rem' withCloseButton onClose={toggle}>
                {errors && typeof errors === 'object' && Object.entries(errors).map(([key, value]) => (
                    <Text key={key} fw='600'>{parseToSentence(key)}: <Text component='span' fw='400' inherit style={{ display: 'inline-block' }}>{formatValue(value)}</Text></Text>
                ))}
                {errors && typeof errors === 'string' && <Text>{errors}</Text>}
            </Alert>}
        </>
    );
};

export default ErrorMessage;