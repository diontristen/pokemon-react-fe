
import RegisterForm from '@/components/Register/RegisterForm';
import { fireEvent, render, screen } from '@/test-utils';
import { useRegister } from '@/hooks/useRegister';
jest.mock('../../hooks/useRegister');
const mockUseRegister = useRegister as jest.MockedFunction<typeof useRegister>;

describe("User", () => {
    test("renders RegisterForm", async () => {
        const mockRegister = jest.fn();
        mockUseRegister.mockReturnValue({
            register: mockRegister,
            loading: false,
            error: null,
            success: false
        });
        render(<RegisterForm />);

        fireEvent.change(screen.getByTestId('firstName'), { target: { value: 'John' } });
        fireEvent.change(screen.getByTestId('lastName'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByTestId('username'), { target: { value: 'johndoe' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });
        fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'password' } });

        expect(screen.getByTestId('firstName')).toHaveValue('John');
        expect(screen.getByTestId('lastName')).toHaveValue('Doe');
        expect(screen.getByTestId('username')).toHaveValue('johndoe');
        expect(screen.getByTestId('password')).toHaveValue('password');
        expect(screen.getByTestId('confirmPassword')).toHaveValue('password');


    });
    test("display success message on registration success", async () => {
        const mockRegister = jest.fn();

        mockUseRegister.mockReturnValue({
            register: mockRegister,
            loading: false,
            error: null,
            success: true
        });
        render(<RegisterForm />);

        fireEvent.change(screen.getByTestId('firstName'), { target: { value: 'John' } });
        fireEvent.change(screen.getByTestId('lastName'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByTestId('username'), { target: { value: 'johndoe' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });
        fireEvent.change(screen.getByTestId('confirmPassword'), { target: { value: 'password' } });

        fireEvent.click(screen.getByTestId('registerButton'));

        expect(screen.getByTestId('firstName')).toHaveValue('John');
        expect(screen.getByTestId('lastName')).toHaveValue('Doe');
        expect(screen.getByTestId('username')).toHaveValue('johndoe');
        expect(screen.getByTestId('password')).toHaveValue('password');
        expect(screen.getByTestId('confirmPassword')).toHaveValue('password');
        expect(mockRegister).toHaveBeenCalledWith({
            firstName: 'John',
            lastName: 'Doe',
            username: 'johndoe',
            password: 'password',
            confirmPassword: 'password',
        });
        expect(screen.getByTestId('success')).toHaveTextContent('You have been successfully registered. Start collecting!');
        expect(screen.getByTestId('success')).toHaveTextContent('Sign in now');

    });
    test('displays error message on registration failure', () => {
        const mockRegister = jest.fn();
        mockUseRegister.mockReturnValue({
            register: mockRegister,
            loading: false,
            error: 'Registration failed',
            success: false,
        });

        render(<RegisterForm />);

        fireEvent.change(screen.getByTestId('firstName'), { target: { value: 'John' } });
        fireEvent.change(screen.getByTestId('lastName'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByTestId('username'), { target: { value: 'johndoe' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });

        fireEvent.click(screen.getByTestId('registerButton'));

        expect(screen.getByTestId('error')).toHaveTextContent('Registration failed');
    });
    test('displays loading state during registration', () => {
        mockUseRegister.mockReturnValue({
            register: jest.fn(),
            loading: true,
            error: null,
            success: false,
        });

        render(<RegisterForm />);
        expect(screen.getByTestId('registerButton')).toHaveAttribute('data-loading', 'true');
        expect(screen.getByTestId('registerButton')).toHaveAttribute('data-disabled', 'true');
    });
    test('validates required fields', () => {
        const registerMock = jest.fn();
        mockUseRegister.mockReturnValue({
            register: registerMock,
            loading: false,
            error: null,
            success: false,
        });

        render(<RegisterForm />);

        fireEvent.click(screen.getByTestId('registerButton'));

        expect(registerMock).not.toHaveBeenCalled();
        expect(screen.getByTestId('firstName')).toHaveAttribute('aria-invalid', "true");
        expect(screen.getByTestId('lastName')).toHaveAttribute('aria-invalid', "true");
        expect(screen.getByTestId('username')).toHaveAttribute('aria-invalid', "true");
        expect(screen.getByTestId('password')).toHaveAttribute('data-invalid', "true");
    });
});