import { useState } from 'react';
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
import {Badge, Box, CardActions, MobileStepper, useTheme} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ParkIcon from '@mui/icons-material/Park';
import InfoIcon from '@mui/icons-material/Info';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { AspectRatio, KeyboardArrowLeft, KeyboardArrowRight, Slideshow } from '@mui/icons-material';

import CommentBox from '../Comment/comment';
import CustomSlideshow from '../Slideshow/slideshow';
import useFetchPosts from '../useFetchPosts';



const EventPost = (post: Post) => {

    const [areCommentsVisible, setAreCommentsVisible] = useState(false);

    const handleCommentClick = () => {
        setAreCommentsVisible(!areCommentsVisible);
    };

    const theme = useTheme();   

    return (
        <Box>
          <Card
              component="div"
              sx={{
                  maxWidth: 600,
                  borderRadius: "1rem" ,
                  padding: "1rem",
                  backgroundColor: "#000000"
              }}
            >

            <Box style={{ display: 'flex', alignItems: 'center' }} sx={{ marginLeft: 2 }}>
                  <Avatar sx={{ bgcolor: green[700], marginRight: 1 }} aria-label="recipe">
                    R {/* here goes the initial of the user */}
                  </Avatar>

                  <Typography fontSize="sm" sx={{ mt: 0.5 }}>
                    EVENT NAME
                  </Typography>
              </Box>

              <Box sx={{ m: 2 }} />

              <CustomSlideshow title={post.title} content={post.content} creatorId={post.creatorId} kudos={post.kudos} mediaUrl={post.mediaUrl}/>

              <CardContent sx={{ gap: 1.5, minWidth: 200, marginTop: 1}}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    '--variant-borderWidth': '2px',
                    borderRadius: 40,
                    borderColor: 'primary.500',
                    mx: 'auto',
                  }}
                >
                  Join Event
                </Button>

                <Button sx={{ float:'right' }} onClick={handleCommentClick}>
                      <InfoIcon style={{fill: `${theme.palette.text.primary}`}} />
                </Button>
                {
                areCommentsVisible && (

                  <Box sx={{ marginTop: 2 }} >
                    <Typography fontSize="sm" sx={{ mt: 0.5 }}>
                    EVENT DESCRIPTION: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor.
                    </Typography>
                  </Box>
                )}

              </CardContent>
          </Card>
      </Box>
    );
}



export default EventPost