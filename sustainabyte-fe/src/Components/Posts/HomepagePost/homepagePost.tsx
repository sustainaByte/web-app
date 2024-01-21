import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {green} from '@mui/material/colors';
import {Post} from '../posts';
import Button from '@mui/material/Button/Button';
import Container from '@mui/material/Container';
import {Badge, Box, useTheme} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ParkIcon from '@mui/icons-material/Park';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

import CommentBox from '../Comment/comment';
import CustomSlideshow from '../Slideshow/slideshow';
import {addKudos} from "../postsHelper";
import {useAuth} from "../../Login/login";
import {useNavigate} from "react-router-dom";
import useFetchUser from "../../Login/useFetchUser";


const HomepagePost = (props: {post: Post, user: any, showComments: boolean}) => {
    // @ts-ignore
    const {authKey} = useAuth()
    const [areCommentsVisible, setAreCommentsVisible] = useState(false);
    const post = props.post
    const [kudosCount, setKudosCount] = useState(post.kudos.length)
    const navigate = useNavigate()
    const [userLiked, setUserLiked] = useState(false)
    const [imageUrl, setImageUrl] = useState('')
    const theme = useTheme();
    const [isXsScreen, setIsXsScreen] = useState(true);
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        setUserLiked(props?.post.kudos.includes(props?.user?._id))

        if (post._id) {
            fetch(`https://sustainabyte-api-service-2pvo3zhaxq-ey.a.run.app/posts/${post._id}/photo`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authKey}`,
                    }
                })
                .then(async response => {
                    if (response.ok) {
                        setImageUrl(URL.createObjectURL(await response.blob()))
                    }
                })
        }
    }, [post, props?.user]);

    const handleKudos = ()  => {
        if (props?.user) {
            addKudos(authKey, post._id)
            if (userLiked) {

                setKudosCount(kudosCount - 1)
            } else {
                setKudosCount(kudosCount + 1)
            }
            setUserLiked(!userLiked)
        } else {
           navigate("/register")
        }
    }

    const handleCommentClick = () => {
        setAreCommentsVisible(!areCommentsVisible);
    };

    const handleShareClick = (postId: string) => {
        const baseUrl = window.location.origin;
        const postUrl = baseUrl + `/#post?post_id=${postId}`

        navigator.clipboard.writeText(postUrl).then(() => {
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 3000);
        });
    }

    useEffect(() => {
      const handleResize = () => {
        setIsXsScreen(window.innerWidth > 765);
      };

      // Initial check
      handleResize();

      // Listen for window resize events
      window.addEventListener('resize', handleResize);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
        <Card
            component="div"
            sx={{
                maxWidth: {
                  xs:"100%", // 0+ pixels
                  sm:"80%", //600+ pixels
                  md:"80%", //900+ pixels
                  lg:"80%", //1200+ pixels
                  xl:"80%", //1546+ pixels

                },
                borderRadius: "1rem" ,
                padding: "1rem",
                backgroundColor: "#000000"
            }}
        >
          <Container>

            <CardHeader
              sx={{
                maxWidth: {
                  xs:"12%", // 0+ pixels
                  sm:"10%", //600+ pixels
                  md:"80%", //900+ pixels
                  lg:"80%", //1200+ pixels
                  xl:"80%", //1546+ pixels
                },
              }}
              action={
                <IconButton aria-label="settings">
                </IconButton>
              }
              title={post.title}

            />

            {
            isXsScreen &&
            <CustomSlideshow location={post.location} title={post.title} content={post.content} creatorId={post.creatorId} kudos={post.kudos} mediaUrl={imageUrl} comments={post.comments}/>
            }
            <CardContent>
                <Typography
                    sx={{
                        overflow: "scroll",
                        maxHeight: "100px",  }}
                    variant="body2"
                    color="text.secondary"
                    fontSize= "18px"
                >
                    {post.content}
                </Typography>
            </CardContent>

            <Box sx={{ marginTop:'-15px', }}>
                <Button
                sx={{ color: `${theme.palette.text.primary}` }}
                onClick={handleKudos}
              >
                <Badge color="error">
                    {userLiked ? <ParkIcon />: <ParkOutlinedIcon />}
                </Badge>
                <Typography sx={{ marginLeft: '4px', marginTop: '5px', color: `${theme.palette.text.secondary}` }} variant="body2">
                  {kudosCount > 0 && kudosCount <= 1? `${kudosCount} Like`: `${kudosCount} Likes`}
                </Typography>
              </Button>

              <Button sx={{ color: `${theme.palette.text.primary}` }} onClick={() => handleShareClick(post._id ? post._id: '')}>
                 <ShareIcon />
                  {isCopied &&
                    <Typography>Link Copied!</Typography>
                  }
              </Button>

            {props.showComments &&
                <Button sx={{ float:'right' }} onClick={handleCommentClick}>
                    <Badge badgeContent={post.comments.length} max={9} sx={{color: `${theme.palette.text.secondary}`}}>
                        <QuestionAnswerOutlinedIcon style={{fill: `${theme.palette.text.primary}`}} />
                    </Badge>
                </Button>
            }
              {
              areCommentsVisible && (
                <CommentBox location={post.location} title={post.title} content={post.content} creatorId={post.creatorId} kudos={post.kudos} mediaUrl={post.mediaUrl} comments={post.comments} _id={post._id}></CommentBox>
              )}
            </Box>
          </Container>
        </Card>
      );
}



export default HomepagePost