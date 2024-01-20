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
import React, {useEffect, useState} from "react";

interface PostsFeedProps {
    title: string;
}
const PostsFeed:React.FC<PostsFeedProps> = ({title}) => {
    // @ts-ignore
    const {authKey} = useAuth()
    // @ts-ignore
    const postsFetch = useFetchPosts()['data']
    const [posts, setPosts] = useState([])
    // @ts-ignore
    const userFetch = useFetchUser(authKey?.data?.jwtToken)['data']
    const user = userFetch ? userFetch: null

    useEffect(() => {
        if (postsFetch?.length > 0) {
            setPosts(postsFetch.filter((post: any) => post.title.toLowerCase().includes(title.toLowerCase())))
        }
    }, [postsFetch, title]);

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
interface HomepageProps {
    title: string;
}
const Homepage:React.FC<HomepageProps> = ({title}) => {
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
                    <PostsFeed title={title}/>
                    <RegisterFeed />
                </>
            ):
                <>
                    <LeftFeed />
                    <RegisterFeed />
                    <PostsFeed title={title}/>
                </>
            }

        </Container>
    )
}

export default Homepage