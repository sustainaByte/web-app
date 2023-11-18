import { Outlet } from "react-router-dom";
import Header from "../Header/header";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material";

const PageLayout = () => {
    const theme = useTheme()

    return (
        <Box
            component={"main"}
            sx={{
                width: '100%',
                backgroundColor: `${theme.palette.background.default}`
            }}
        >
            <Header />
            <Outlet />
        </Box>
    )
}

export default PageLayout