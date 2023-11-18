import './home.scss'
import Container from "@mui/material/Container";
import {useAuth} from "../Login/login";
import {useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useFetchPosts from "../Posts/useFetchPosts";
import SettingsIcon from '@mui/icons-material/Settings';

export interface Post {
    "title": "string",
    "content": "string",
    "creatorId": "string",
    "kudos": 0,
    "mediaURL": [
        "string"
    ],
    "createdAt": "2023-11-18T14:33:24.280Z",
    "updatedAt": "2023-11-18T14:33:24.280Z",
    "_id": "string",
    "__v": 0
}

const PostsFeed = () => {


    // @ts-ignore
    const posts = useFetchPosts()['data']

    // TODO: use Post component and plug in information
    return (
        <Box
            component="div"
            sx={{
                width: "60%",
                alignItems: "center"
            }}
        >
            {posts && posts.map((post: Post) => post.content)}
        </Box>
    )
}

const RegisterFeed = () => {
    // @ts-ignore
    const { authKey } = useAuth()

    // check if user is not connected
    if (!authKey) {
        return (
            <Box
                component="div"
                sx={{
                    width: "20%",
                    borderRadius: '1rem',
                    backgroundColor: 'black',
                    p: 1
                }}
            >
                <h2>New to SustainaByte?</h2>
                <Button
                    color={"inherit"}
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