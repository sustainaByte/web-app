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
import {Badge, Box, MobileStepper, useTheme} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ParkIcon from '@mui/icons-material/Park';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import CommentBox from '../Comment/comment';


const HomepagePost = (post: Post) => {

    const theme = useTheme();

    const images = post.mediaUrl;
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
      setActiveStep((activeStep + 1) % maxSteps);
    };
    
    const handlePrevious = () => {
      setActiveStep(activeStep === 0 ? maxSteps - 1 : activeStep - 1);
    };
    
  const [areCommentsVisible, setAreCommentsVisible] = useState(false);
  const handleCommentClick = () => {
    setAreCommentsVisible(!areCommentsVisible);
  };
    return (
        <Card
            component="div"
            sx={{
                maxWidth: 600,
                borderRadius: "1rem" ,
                padding: "1rem",
                backgroundColor: "#000000"
            }}
        >
          <Container>

            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: green[700] }} aria-label="recipe">
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

            {post && post.mediaUrl && post?.mediaUrl.length > 0 ? (
              <Box sx={{ 
                maxWidth: 600,
                flexGrow: 1,
                borderRadius: 5, 
                overflow: 'hidden',
                
                }}>

                {images.map((imageUrl, index) => (
                  <div key={index} style={{ display: index === activeStep ? 'block' : 'none' }}>
                    <Box
                      component="img"
                      sx={{
                        height: 255,
                        display: 'block',
                        maxWidth: 600,
                        overflow: 'hidden',
                        width: '100%',
                      }}
                      src={imageUrl}
                      alt={`Image ${index + 1}`}
                    />
                  </div>
                ))}

                <MobileStepper
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <Button size="small" onClick={handleNext}>
                      Next
                      {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                  }
                  backButton={
                    <Button size="small" onClick={handlePrevious}>
                      {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                      Previous
                    </Button>
                  }
                />
              </Box>
            ) : null}
            
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


