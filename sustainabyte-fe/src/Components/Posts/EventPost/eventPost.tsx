import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {green} from '@mui/material/colors';
import Button from '@mui/material/Button/Button';
import {Box, Modal, useTheme} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CustomSlideshow from '../Slideshow/slideshow';
import PaymentsPage from "../../Payments/payments";



const EventPost = (props: {post: any, user: any}) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
                  <Typography fontSize="sm" sx={{ mt: 0.5 }}>
                      {props.post.title}
                  </Typography>
              </Box>

              <Box sx={{ m: 2 }} />

              <CustomSlideshow title={props.post.title} content={props.post.content} creatorId={props.post.creatorId} kudos={props.post.kudos} mediaUrl={props.post.mediaUrl} comments={props.post.comments}/>

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
                &nbsp; &nbsp; &nbsp; 
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    '--variant-borderWidth': '2px',
                    borderRadius: 40,
                    borderColor: 'primary.500',
                    mx: 'auto',
                  }}
                  onClick={handleOpen}
                >
                  Donate
                </Button>
                  <Modal
                      open={open}
                      onClose={handleClose}
                  >
                      <Box>
                          <PaymentsPage post={props.post} />
                      </Box>
                  </Modal>
                <Button sx={{ float:'right' }} onClick={handleCommentClick}>
                      <InfoIcon style={{fill: `${theme.palette.text.primary}`}} />
                </Button>
                {
                areCommentsVisible && (

                  <Box sx={{ marginTop: 2 }} >
                    <Typography fontSize="sm" sx={{ mt: 0.5 }}>
                        {props.post.description}
                    </Typography>
                  </Box>
                )}

              </CardContent>
          </Card>
      </Box>
    );
}



export default EventPost