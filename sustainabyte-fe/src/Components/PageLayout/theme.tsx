import {PaletteMode} from "@mui/material";

const darkBackground = 'rgb(32, 33, 36)';
const primaryText = '#027d51';

// Function to calculate contrasting text color for readability
const getContrastText = (background: string): string => {
    const hexBackground = background.replace(/rgb\((\d+), (\d+), (\d+)\)/, '#$1$2$3');
    const r = parseInt(hexBackground.slice(1, 3), 16);
    const g = parseInt(hexBackground.slice(3, 5), 16);
    const b = parseInt(hexBackground.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 128 ? '#000000' : '#ffffff';
};

const contrastText = getContrastText(darkBackground);

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                text: {
                    primary: '#027d51',
                },
            }
            : {
                // palette values for dark mode
                background: {
                    default: darkBackground,
                    paper: darkBackground
                },
                text: {
                    primary: primaryText,
                    secondary: '#60796e', // A muted secondary text color
                    disabled: '#b0bcb4', // A light grey for disabled text
                },
                primary: {
                    light: '#6fbf73', // A lighter shade of green
                    main: primaryText,
                    dark: '#004f32', // A darker shade of green
                    contrastText: contrastText,
                },
                secondary: {
                    light: '#a1887f', // A lighter shade of wood color
                    main: '#8d6e63', // The main shade of wood color
                    dark: '#5d4037', // A darker shade of wood color
                    contrastText: contrastText,
                },
                error: {
                    light: '#ff8a80', // A lighter shade of red
                    main: '#f44336', // The main shade of red
                    dark: '#b71c1c', // A darker shade of red
                    contrastText: contrastText,
                },
                warning: {
                    light: '#ffd54f', // A lighter shade of yellow
                    main: '#ff9800', // The main shade of yellow
                    dark: '#e65100', // A darker shade of yellow
                    contrastText: contrastText,
                },
                info: {
                    light: '#a1887f', // A lighter shade of wood color
                    main: '#8d6e63', // The main shade of wood color
                    dark: '#5d4037', // A darker shade of wood color
                    contrastText: contrastText,
                },
                success: {
                    light: '#81c784', // A lighter shade of green (success)
                    main: '#4caf50', // The main shade of green (success)
                    dark: '#388e3c', // A darker shade of green (success)
                    contrastText: contrastText,
                },
                variants: {

                }
            }),
    },
});

export default getDesignTokens