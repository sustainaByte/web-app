import * as React from 'react';


import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import { Post } from '../posts';
import Button from '@mui/material/Button/Button';
import Container from '@mui/material/Container';
import { Box, useTheme } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ParkIcon from '@mui/icons-material/Park';
import CommentIcon from '@mui/icons-material/Comment';

const HomepagePost = (post: Post) => {

   const theme = useTheme()

    return (

        <Card sx={{ maxWidth: 600, borderRadius: "1rem" , padding: "1rem"}}>

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
            
            <CardMedia
              component="img"
              sx={{ maxHeight: "200px" }}
              image="/static/images/cards/paella.jpg"
            />
            <CardContent>
              <Typography sx={{ overflow: "scroll", height: "100px",  }} variant="body2" color="text.secondary" fontSize= "18px">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                
              </Typography>
            </CardContent>
            
            <Box>
              <Button sx={{ color: `${theme.palette.text.primary}` }}>
                 <ParkIcon />
              </Button>
             
              <Button sx={{ color: `${theme.palette.text.primary}` }}>
                 <ShareIcon />
              </Button>
              
              <Button sx={{ color: `${theme.palette.text.primary}` }}>
                 <CommentIcon />
              </Button>

            </Box>

          </Container>
        </Card>
      );
}



export default HomepagePost


