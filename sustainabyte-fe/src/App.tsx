import React, {createContext, useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import PageLayout from "./Components/PageLayout/pageLayout";
import Homepage from "./Components/Home/home";
import LoginPage from "./Components/Login/login";
import HomepagePost from './Components/Posts/HomepagePost/homepagePost';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {PaletteMode, useMediaQuery} from "@mui/material";
import getDesignTokens from "./Components/PageLayout/theme";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

function App() {
    const [mode, setMode] = React.useState<PaletteMode>('dark');
    const colorMode = React.useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) =>
                    prevMode === 'light' ? 'dark' : 'light',
                );
            },
        }),
        [],
    );

    // Update the theme only if the mode changes
    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route element={<PageLayout/>}>
                        <Route path="/" element={<Homepage/>}/>
                    </Route>
                    <Route path="login" element={<LoginPage/>}/>
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
