import React, {createContext, useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import PageLayout from "./Components/PageLayout/pageLayout";
import Homepage from "./Components/Home/home";
import LoginPage from "./Components/Login/login";
import HomepagePost from './Components/Posts/HomepagePost/homepagePost';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {PaletteMode, useMediaQuery} from "@mui/material";
import getDesignTokens from "./Components/PageLayout/theme";
import RegisterPage from "./Components/Register/register";
import SettingsPage from "./Components/Settings/settings";
import ProfilePage from "./Components/ProfilePage/profile";
import PostPage from './Components/PostPage/postPage';

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
                    <Route path="register" element={<RegisterPage/>}/>
                    <Route path="settings" element={<SettingsPage/>}/>
                    <Route path="profile" element={<ProfilePage/>}/>
                    <Route element={<PageLayout/>}>
                        <Route path="post" element={<PostPage/>}/>
                    </Route>
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
