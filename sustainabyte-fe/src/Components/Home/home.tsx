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
import SimplePopup from '../Posts/PopupCreatePost/popupCreatePost';
import {createOrder} from "../Paypal/paypalHelper";
import PaypalDonate from "../Paypal/paypalDonations";
import useFetchUser from "../Login/useFetchUser";

const PostsFeed = () => {
    // @ts-ignore
    const {authKey} = useAuth()
    // @ts-ignore
    const posts = useFetchPosts()['data']
    // @ts-ignore
    const userFetch = useFetchUser(authKey?.data?.jwtToken)['data']
    const user = userFetch ? userFetch: null

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
                post={post}
                user={user}
                key={post._id}
            />)}
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
                className="register-box"
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
    const navigate = useNavigate()

    return (
        <Box
            component="div"
            sx={{
                width: "20%"
            }}
        >
            <SimplePopup></SimplePopup>
            <Button
                sx={{
                    color: "inherit"
                }}
                onClick={() => navigate("/settings")}
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
            className="homepage-container"
        >
            {window.innerWidth > 767 ? (
                <>
                    <LeftFeed />
                    <PostsFeed />
                    <RegisterFeed />
                </>
            ):
                <>
                    <LeftFeed />
                    <RegisterFeed />
                    <PostsFeed />
                </>
            }

        </Container>
    )
}

export default Homepage