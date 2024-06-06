
import { fireEvent, render, screen } from '@/test-utils';
import { useLogin } from '@/hooks/useLogin';
import LoginForm from '@/components/Login/LoginForm';
import { MemoryRouter, useNavigate } from 'react-router-dom';

jest.mock('../../hooks/useLogin');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
const mockUserLogin = useLogin as jest.MockedFunction<typeof useLogin>;

const mockNavigate = jest.fn();

beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
});

afterEach(() => {
    jest.clearAllMocks();
});



describe("User", () => {
    test("renders LoginForm", async () => {
        const mockLogin = jest.fn();
        mockUserLogin.mockReturnValue({
            login: mockLogin,
            loading: false,
            error: null,
            success: false
        });
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'johndoe' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });


        expect(screen.getByTestId('username')).toHaveValue('johndoe');
        expect(screen.getByTestId('password')).toHaveValue('password');

    });
    test("renders LoginForm and submits data", async () => {
        const mockLogin = jest.fn();
        mockUserLogin.mockReturnValue({
            login: mockLogin,
            loading: false,
            error: null,
            success: true
        });
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'johndoe' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });

        fireEvent.click(screen.getByTestId('loginButton'));

        expect(screen.getByTestId('username')).toHaveValue('johndoe');
        expect(screen.getByTestId('password')).toHaveValue('password');
        expect(mockLogin).toHaveBeenCalledWith({
            username: 'johndoe',
            password: 'password',
        });
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
    test('displays error message on login failure', () => {
        const mockLogin = jest.fn();
        mockUserLogin.mockReturnValue({
            login: mockLogin,
            loading: false,
            error: 'Login failed',
            success: false,
        });

        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByTestId('username'), { target: { value: 'johndoe' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });

        fireEvent.click(screen.getByTestId('loginButton'));

        expect(screen.getByTestId('error')).toHaveTextContent('Login failed');
    });
    test('displays loading state during registration', () => {
        mockUserLogin.mockReturnValue({
            login: jest.fn(),
            loading: true,
            error: null,
            success: false,
        });

        render(<MemoryRouter>
            <LoginForm />
        </MemoryRouter>);

        expect(screen.getByTestId('loginButton')).toHaveAttribute('data-loading', 'true');
        expect(screen.getByTestId('loginButton')).toHaveAttribute('data-disabled', 'true');
    });
    test('validates required fields', () => {
        const loginMock = jest.fn();
        mockUserLogin.mockReturnValue({
            login: loginMock,
            loading: false,
            error: null,
            success: false,
        });

        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByTestId('loginButton'));

        expect(loginMock).not.toHaveBeenCalled();
        expect(screen.getByTestId('username')).toHaveAttribute('aria-invalid', "true");
        expect(screen.getByTestId('password')).toHaveAttribute('data-invalid', "true");
    });
});