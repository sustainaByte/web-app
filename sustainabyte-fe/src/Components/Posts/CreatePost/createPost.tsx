import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Button, TextField, Typography, Container, FormControl, Card, Box, Badge, useTheme} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {useAuth} from "../../Login/login";
import {Post} from "../posts";
import {useState} from "react";
import Avatar from "@mui/material/Avatar";


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
    const formData = new FormData();

    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append('creatorId', post.creatorId);
    formData.append('kudos', JSON.stringify(post.kudos));
    formData.append('location', post.location)
    if (post.mediaFile) {
        formData.append('file', post.mediaFile);
    }

    fetch('https://sustainabyte-api-service-2pvo3zhaxq-ey.a.run.app/posts', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token.data.jwtToken}`,
        },
        body: formData
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
    const [image, setImage] = useState(null)
    const[county, setCounty] = useState("")

    const handlePost = () => {
        handleClose();
    }

    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
    };

    const handleMessageChange = (event: any) => {
        setMessage(event.target.value);
    };

    const handleFileChange = (event: any) => {
        setImage(event.target.files[0])
    }

    const handleCountyChange = (event: any) => {
        setCounty(event.target.value)
    }

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
            <FormControl sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', marginBottom: '10px', gap: '10px' }} defaultValue="" required>
                <TextField onChange={handleTitleChange} id="outlined-basic" label="Title" variant="outlined" sx={{ width:"100%" }} />
                <TextField onChange={handleMessageChange} id="outlined-basic" label="Write your message" variant="outlined"  multiline rows={3} sx={{ width:"100%" }} />
                <TextField onChange={handleCountyChange} id="outlined-basic" label="County" />
            </FormControl>

            <Box component={"div"} sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <Box component={"div"}>
                    <Button component="label" variant="outlined">
                        <Badge>
                            <ImageIcon />
                        </Badge>
                        <Typography sx={{ marginLeft: '4px', marginTop: '5px'}} variant="body2">
                            upload image
                        </Typography>
                        <input type="file" onChange={handleFileChange} accept="image/*" style={{
                            display: "none"
                        }} />
                        <VisuallyHiddenInput type="image" />
                    </Button>
                    <Button
                        onClick={() => {
                            fetchCreatePost(authKey,
                                {
                                    "title": title,
                                    "content": message,
                                    "mediaUrl": image ? URL.createObjectURL(image): '',
                                    "creatorId": "",
                                    "location": county,
                                    "kudos": [],
                                    "comments": "",
                                    "mediaFile": image
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
                {image && (
                    <Box component={'img'} src={URL.createObjectURL(image)} sx={{
                        width: 'max-content',
                        height: '200px',
                        margin: '0 auto'
                    }}/>
                )}
            </Box>
        </Container>
    </Card>
    );
};

export default CreatePost;
