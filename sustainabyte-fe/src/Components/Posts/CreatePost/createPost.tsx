import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Button, TextField, Typography, Container, FormControl, Card, Box, Badge, useTheme} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {useAuth} from "../../Login/login";
import {Post} from "../posts";
import {useState} from "react";


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const fetchCreatePost = async (token: any, post: Post) => {
    await fetch('https://sustainabyte-api-service-2pvo3zhaxq-ey.a.run.app/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.data.jwtToken}`,
        },
        body: JSON.stringify({
            "title": post.title,
            "content": post.content,
            "creatorId": post.creatorId,
            "kudos": post.kudos,
            "mediaUrl": post.mediaUrl
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                return {'err': 'There was a problem creating the post!'}
            }
        })
}


// @ts-ignore
function CreatePost ({handleClose}) {
    // @ts-ignore
    const {authKey} = useAuth()
    const theme = useTheme();
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")

    const handlePost = () => {
        handleClose();
    }

    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
    };

    const handleMessageChange = (event: any) => {
        setMessage(event.target.value);
    };

    return (
    <Card 
        component="div"
        sx={{
        width: 500,
        borderRadius: "1rem" ,
        padding: "1rem",
        backgroundColor: "#000000"
    }}>


        <Container sx={{
            maxWidth: {
                xs:"100%", // 0+ pixels
                sm:"100%", //600+ pixels
                md:"100%", //900+ pixels
                lg:"100%", //1200+ pixels
                xl:"100%", //1546+ pixels
            },
            }}>
            <FormControl sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} defaultValue="" required>
                <TextField onChange={handleTitleChange} id="outlined-basic" label="Title" variant="outlined" sx={{ width:"100%", margin: '8px', }} />
                <TextField onChange={handleMessageChange} id="outlined-basic" label="Write your message" variant="outlined"  multiline rows={3} sx={{ width:"100%", margin: '8px' }} />
            </FormControl>

            <Box>
                <Button component="label" variant="outlined">
                    <Badge>
                        <ImageIcon />
                    </Badge>
                    <Typography sx={{ marginLeft: '4px', marginTop: '5px'}} variant="body2">
                        upload images
                    </Typography>
                    <VisuallyHiddenInput type="image" />
                </Button>

                <Button
                    onClick={() => {
                            fetchCreatePost(authKey,
                                {
                                    "title": title,
                                    "content": message,
                                    "mediaUrl": [],
                                    "creatorId": "",
                                    "kudos": 0
                                }
                            );
                            handlePost();
                        }
                    }
                    sx={{ float:'right' }}
                    component="label"
                    variant="outlined">
                    <Typography sx={{ marginRight: '6px', marginTop: '5px'}} variant="body2">
                        Post
                    </Typography>
                    <Badge>
                        <SendRoundedIcon />
                    </Badge>
                </Button>
            </Box>
        </Container>
    </Card>
    );
};

export default CreatePost;
