import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#001EB9', // Blue
        },
        secondary: {
            main: '#162427', // Dark color
        },
        background: {
            default: '#F7F7F7', // Light grey background
        },
        text: {
            primary: '#162427', // Dark color for primary text
            secondary: '#969191', // Grey color for secondary text
        },
    },
    typography: {
        fontFamily: 'Satoshi, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#162427',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#162427',
        },
        body1: {
            fontSize: '1rem',
            color: '#969191',
        },
        button: {
            textTransform: 'none', // Ensure text in buttons is not uppercase by default
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Rounded corners
                },
            },
        },
    },
});

export default theme;
