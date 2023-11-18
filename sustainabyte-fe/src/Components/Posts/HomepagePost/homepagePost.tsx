import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {green} from '@mui/material/colors';
import {Post} from '../posts';
import Button from '@mui/material/Button/Button';
import Container from '@mui/material/Container';
import {Box, useTheme} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ParkIcon from '@mui/icons-material/Park';
import CommentIcon from '@mui/icons-material/Comment';

const HomepagePost = (post: Post) => {

   const theme = useTheme()

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
              {
                  post && post.mediaUrl && post?.mediaUrl.length > 0 &&
                  <CardMedia
                      component="img"
                      sx={{ maxHeight: "200px" }}
                      src={post.mediaUrl[0]}
                  />
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


