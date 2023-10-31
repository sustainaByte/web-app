import { Outlet } from "react-router-dom";
import Header from "../Header/header";
import { Main } from "./pageLayoutStyle";

const PageLayout = () => {
    return (
        <Main>
            <Header />
            <Outlet />
        </Main>
    )
}

export default PageLayout