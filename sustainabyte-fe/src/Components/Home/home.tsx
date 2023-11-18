import './home.scss'
import Container from "@mui/material/Container";
import {useAuth} from "../Login/login";
import {useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const PostsFeed = () => {
    // TODO: add posts inside container
    return (
        <Container
            component="div"
            sx={{
                width: "60%",
                alignItems: "center"
            }}
        >
            <p>posts feed</p>
        </Container>
    )
}

const RegisterFeed = () => {
    // @ts-ignore
    const { authKey } = useAuth()
    const theme = useTheme()

    // check if user is not connected
    if (!authKey) {
        return (
            <Container
                component="div"
                sx={{
                    width: "20%",
                }}
            >
                <Box>
                    <h2>New to SustainaByte?</h2>
                    <Button
                        color={"inherit"}
                    >
                        Register
                    </Button>
                    <Button
                        color={"inherit"}
                    >
                        Log in
                    </Button>
                </Box>
            </Container>
        )
    }

    return (
        <>
        </>
    )
}

const LeftFeed = () => {
    return (
        <Container
            component="div"
            sx={{
                width: "20%"
            }}
        >
            <p>left feed</p>
        </Container>
    )
}

const Homepage = () => {
    const theme = useTheme()

    return (
        <Container
            component="div"
            sx={{
                display: "flex",
                color: `${theme.palette.text.primary}`
            }}
        >
            <LeftFeed />
            <PostsFeed />
            <RegisterFeed />
        </Container>
    )
}

export default Homepage