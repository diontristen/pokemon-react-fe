import {
    createTheme,
    Button,
    Anchor,
    TextInput,
    PasswordInput,
    Alert,
    Loader,
    Drawer,
    Pagination,
    NumberInput
} from "@mantine/core";
import classes from '@/styles/Component.module.css';
import { DatePickerInput } from "@mantine/dates";
export const theme = createTheme({
    colors: {
        primary: [
            '#E9FCF1', // 0
            '#C1F7DA', // 1
            '#99F0C1', // 2
            '#71E9A8', // 3
            '#49E28F', // 4
            '#21DB76', // 5
            '#1BB260', // 6
            '#158B4B', // 7
            '#0F6436', // 8
            '#093D21', // 9
        ],
        secondary: [
            '#E8FDF2', // 0
            '#BEE4CE', // 1
            '#92CDAC', // 2
            '#66B68A', // 3
            '#3A9F68', // 4
            '#0E8846', // 5
            '#0A733C', // 6
            '#085C30', // 7
            '#064524', // 8
            '#042E18', // 9
        ],
        dark: [
            '#F2F2F2', // 0
            '#CCCCCC', // 1
            '#A4A4A4', // 2
            '#7C7C7C', // 3
            '#545454', // 4
            '#2C2C2C', // 5
            '#252525', // 6
            '#1F1F1F', // 7
            '#191919', // 8
            '#131313', // 9
        ],
        white: [
            '#f9f9f9', // 0
            '#f7f7f7', // 1
            '#f6f6f6', // 2
            '#f5f5f5', // 3
            '#f3f3f3', // 4
            '#f2f2f2', // 5
            '#dadada', // 6
            '#c2c2c2', // 7
            '#a9a9a9', // 8
            '#919191', // 9
        ],
    },
    primaryShade: 5,
    defaultRadius: 8,
    fontFamily: 'Poppins, sans-serif',
    focusRing: 'never',
    fontSizes: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
    },
    headings: {
        fontWeight: '600',
        fontFamily: 'CalSans, sans-serif',
        sizes: {
            h1: { fontSize: '3rem' },
            h2: { fontSize: '2.25rem' },
            h3: { fontSize: '1.875rem' },
            h4: { fontSize: '1.5rem' },
            h5: { fontSize: '1.25rem' },
            h6: { fontSize: '1rem' }
        },
    },
    breakpoints: {
        xs: '480px',
        sm: '768px',
        md: '1024px',
        lg: '1280px',
        xl: '1440px'
    },
    components: {
        TextInput: TextInput.extend({
            classNames: {
                input: classes.textInput
            }
        }),
        NumberInput: NumberInput.extend({
            classNames: {
                input: classes.textInput
            }
        }),
        PasswordInput: PasswordInput.extend({
            classNames: {
                input: classes.textInput
            }
        }),
        DatePickerInput: DatePickerInput.extend({
            classNames: {
                wrapper: classes.dateInput,
                input: classes.textInput,
                day: classes.dateInput
            }
        }),
        Button: Button.extend({
            classNames: {
                root: classes.buttonRoot
            }
        }),
        Anchor: Anchor.extend({
            classNames: {
                root: classes.anchor
            }
        }),
        Alert: Alert.extend({
            classNames: {
                root: classes.alert
            }
        }),
        Loader: Loader.extend({
            classNames: {
                root: classes.loader
            }
        }),
        Drawer: Drawer.extend({
            classNames: {
                content: classes.drawerContent,
                header: classes.drawerHeader
            }
        }),
        Pagination: Pagination.extend({
            classNames: {
                control: classes.paginationControl
            }
        })
    }
});