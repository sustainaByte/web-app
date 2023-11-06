import { Outlet } from "react-router-dom";
import Header from "../Header/header";
import Container from "@mui/material/Container";

const PageLayout = () => {
    return (
        <Container component={"main"}>
            <Header />
            <Outlet />
        </Container>
    )
}

export default PageLayout