import { Outlet } from "react-router-dom";
import Header from "../Header/header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material";
import React from "react";

interface PageLayoutProps {
    title: string;
    onInputChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}
const PageLayout:React.FC<PageLayoutProps> = ({title,onInputChange}) => {
    const theme = useTheme()

    return (
        <Box
            component={"main"}
            sx={{
                width: '100%',
                backgroundColor: `${theme.palette.background.default}`
            }}
        >
            <Header title={title} onInputChange={onInputChange}/>
            <Outlet />
        </Box>
    )
}

export default PageLayout