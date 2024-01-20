import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {green} from '@mui/material/colors';
import Button from '@mui/material/Button/Button';
import Container from '@mui/material/Container';
import {Badge, Box, useTheme} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ParkIcon from '@mui/icons-material/Park';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

import {useAuth} from "../Login/login";
import {useNavigate} from "react-router-dom";
import useFetchUser from "../Login/useFetchUser";
import CustomSlideshow from '../Posts/Slideshow/slideshow';
import { Post } from '../Posts/posts';
import { addKudos } from '../Posts/postsHelper';


const CurrentPost = (props: {post: any, user: any}) => {
    // @ts-ignore
    const {authKey} = useAuth()
    const [areCommentsVisible, setAreCommentsVisible] = useState(false);
    const post = props.post
    const [kudosCount, setKudosCount] = useState(post.kudos.length)
    const navigate = useNavigate()
    const [userLiked, setUserLiked] = useState(
        props.user ? props.post.kudos.includes(props.user._id): null)

    const handleKudos = ()  => {
        if (props.user) {
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

    const theme = useTheme();

    const [isXsScreen, setIsXsScreen] = useState(true);

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
              avatar={
                <Avatar sx={{
                 bgcolor: green[700] }} aria-label="recipe">
                  R {/* here goes the initial of the user */}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                </IconButton>
              }
              title={post.title}
              subheader={post._id}

            />

            {
            isXsScreen &&
            <CustomSlideshow title={post.title} content={post.content} creatorId={post.creatorId} kudos={post.kudos} mediaUrl={post.mediaUrl} comments={''}/>
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
                  {kudosCount <= 1? `${kudosCount} Like`: `${kudosCount} Likes`}
                </Typography>
              </Button>

              <Button sx={{ color: `${theme.palette.text.primary}` }}>
                 <ShareIcon />
              </Button>

            </Box>
          </Container>
        </Card>
      );
}



export default CurrentPost