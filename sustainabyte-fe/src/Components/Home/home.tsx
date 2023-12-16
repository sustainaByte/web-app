import './home.scss'
import Container from "@mui/material/Container";
import {useAuth} from "../Login/login";
import {useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useFetchPosts from "../Posts/useFetchPosts";
import SettingsIcon from '@mui/icons-material/Settings';
import HomepagePost from "../Posts/HomepagePost/homepagePost";
import {Post} from "../Posts/posts";
import {useNavigate} from "react-router-dom";

const PostsFeed = () => {
    // @ts-ignore
    const posts = useFetchPosts()['data']

    return (
        <Box
            component="div"
            sx={{
                width: "60%",
                display: "flex",
                flexDirection: 'column',
                gap: '20px'
            }}
        >
            {posts?.map((post: Post) => <HomepagePost
                kudos={post.kudos}
                content={post.content}
                creatorId={post.creatorId}
                title={post.title}
                mediaUrl={post.mediaUrl} />)}
        </Box>
    )
}

const RegisterFeed = () => {
    // @ts-ignore
    const { authKey } = useAuth()
    const navigate = useNavigate()

    // check if user is not connected
    if (!authKey) {
        return (
            <Box
                component="div"
                sx={{
                    width: "20%",
                    borderRadius: '1rem',
                    backgroundColor: 'black',
                    p: 1,
                    height: 'max-content'
                }}
            >
                <h2>New to SustainaByte?</h2>
                <Button
                    color={"inherit"}
                    onClick={() => navigate("/register")}
                >
                    Register
                </Button>
            </Box>
        )
    }

    return (
        <>
        </>
    )
}

const LeftFeed = () => {
    return (
        <Box
            component="div"
            sx={{
                width: "20%"
            }}
        >
            <Button
                sx={{
                    color: "inherit"
                }}
            >
                <SettingsIcon
                    sx={{
                        marginRight: '5px'
                    }}
                />
                <p>Settings</p>
            </Button>
        </Box>
    )
}

const Homepage = () => {
    const theme = useTheme()

    return (
        <Container
            component="div"
            sx={{
                marginTop: "20px",
                display: "flex",
                color: `${theme.palette.text.primary}`,
            }}
        >
            <LeftFeed />
            <PostsFeed />
            <RegisterFeed />
        </Container>
    )
}

export default Homepage