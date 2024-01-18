import './postPage.scss'
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
import CurrentPost from './currentPost';
import CommentBox from '../Posts/Comment/comment';
import CommentBoxSinglePost from './commentBoxSinglePost';
import LikeSinglePost from './LikeSinglePost';

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
            {posts && posts.length > 1 && (
                <CurrentPost
                    post={posts[1]}
                    user={user}
                    key={posts[1]._id}
                />
            )}
        </Box>
    )
}

const CommentFeed = () => {
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
                width: "20%",
                display: "flex",
                flexDirection: 'column',
                gap: '20px'
            }}
        >
            <CommentBoxSinglePost></CommentBoxSinglePost>
        </Box>
    )
}

const LeftFeed = () => {
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
                width: "20%"
            }}
        >
            {posts && posts.length > 1 && (
                <LikeSinglePost post={posts[1]} user={user}></LikeSinglePost>
            )}

        </Box>
    )
}

const PostPage = () => {
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
                    <CommentFeed />
                </>
            ):
                <>
                    <LeftFeed />
                    <CommentFeed />
                    <PostsFeed />
                </>
            }

        </Container>
    )
}

export default PostPage