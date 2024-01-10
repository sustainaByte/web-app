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
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';

import CommentBox from '../Comment/comment';
import CustomSlideshow from '../Slideshow/slideshow';


const HomepagePost = (post: Post) => {
    const [areCommentsVisible, setAreCommentsVisible] = useState(false);

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
            <CustomSlideshow title={post.title} content={post.content} creatorId={post.creatorId} kudos={post.kudos} mediaUrl={post.mediaUrl}/>
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
              >
                <Badge color="error">
                  <ParkIcon />
                </Badge>
                <Typography sx={{ marginLeft: '4px', marginTop: '5px', color: `${theme.palette.text.secondary}` }} variant="body2">
                  {post.kudos} Likes
                </Typography>
              </Button>
              
              <Button sx={{ color: `${theme.palette.text.primary}` }}>
                 <ShareIcon />
              </Button>
              
              <Button sx={{ float:'right' }} onClick={handleCommentClick}>
                 <Badge badgeContent={10000} max={9} sx={{color: `${theme.palette.text.secondary}`}}>
                    <QuestionAnswerOutlinedIcon style={{fill: `${theme.palette.text.primary}`}} />
                  </Badge>
              </Button>

              {
              areCommentsVisible && (
                <CommentBox></CommentBox>
              )}

             
            </Box>
          </Container>
        </Card>
      );
}



export default HomepagePost