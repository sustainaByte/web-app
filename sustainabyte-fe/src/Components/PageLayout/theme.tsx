import {PaletteMode} from "@mui/material";

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
                    default: 'rgb(32,33,36)',
                },
                text: {
                    primary: '#027d51',
                },
            }),
    },
});

export default getDesignTokens