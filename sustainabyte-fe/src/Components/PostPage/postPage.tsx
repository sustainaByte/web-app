import './postPage.scss'
import Container from "@mui/material/Container";
import {useAuth} from "../Login/login";
import {useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import {useSearchParams} from "react-router-dom";
import useFetchUser from "../Login/useFetchUser";
import CommentBoxSinglePost from './commentBoxSinglePost';
import LikeSinglePost from './LikeSinglePost';
import {useEffect, useState} from 'react';
import HomepagePost from "../Posts/HomepagePost/homepagePost";

const PostFeed = (props: {post: any, user: any}) => {
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
            {props.post &&
                <HomepagePost
                    post={props.post}
                    user={props.user}
                    showComments={false}
                />
            }
        </Box>
    )
}

const CommentFeed = () => {
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

const PostPage = () => {
    // @ts-ignore
    const {authKey} = useAuth()
    // @ts-ignore
    const userFetch = useFetchUser(authKey?.data?.jwtToken)['data']
    const [user, setUser] = useState(null)
    const theme = useTheme()
    const [searchParams, setSearchParams] = useSearchParams();
    const [post, setPost] = useState(null)

    useEffect(() => {
        fetch(`https://sustainabyte-api-service-2pvo3zhaxq-ey.a.run.app/posts/${searchParams.get("post_id")}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(async response => {
            if (response.ok) {
                setPost((await response.json()).data)
            } else {
                return {'err': 'There was a problem getting the post!'};
            }
        })
    }, []);

    useEffect(() => {
        setUser(userFetch)
    }, [userFetch]);

    if (!post) {
        return (
            <></>
        )
    }

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
                    <PostFeed post={post} user={user}/>
                    <CommentFeed />
                </>
            ):
                <>
                    <CommentFeed />
                    <PostFeed post={post} user={user} />
                </>
            }

        </Container>
    )
}

export default PostPage