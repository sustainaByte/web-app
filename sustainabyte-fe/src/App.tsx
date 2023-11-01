import React from 'react';
import './App.css';
import { ThemeProvider } from "styled-components";
import {defaultTheme} from "./Themes/default-theme";
import {Route, Routes} from "react-router-dom";
import PageLayout from "./Components/PageLayout/pageLayout";
import Homepage from "./Components/Home/home";

function App() {
  return (
      <ThemeProvider theme={defaultTheme}>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Homepage /> } />
          </Route>
        </Routes>
      </ThemeProvider>
  );
}

export default App;
