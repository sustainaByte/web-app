import {useAuth} from "../../Login/login";
import {Badge, Box, Button, Card, Container, FormControl, TextField, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import ImageIcon from "@mui/icons-material/Image";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import * as React from "react";
import {Post} from "../posts";

const fetchCreateEvent = async (token: any, post: {
    title: string,
    content: string,
    creatorId: string,
    kudos: string[],
    location: string,
    funds: string,
    comments: string
}) => {
    const formData = new FormData();

    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append('creatorId', post.creatorId);
    formData.append('kudos', JSON.stringify(post.kudos));
    formData.append('location', post.location)
    formData.append('requiredMoney', post.funds)
    formData.append('collectedMoney', '0')

    fetch('https://sustainabyte-api-service-2pvo3zhaxq-ey.a.run.app/events', {
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
const CreateEvent = ({handleClose}) => {
    // @ts-ignore
    const {authKey} = useAuth()
    const theme = useTheme();
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [image, setImage] = useState(null)
    const [funds, setFunds] = useState("")
    const [county, setCounty] = useState("")

    const handlePost = () => {
        handleClose();
    }

    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
    };

    const handleMessageChange = (event: any) => {
        setMessage(event.target.value);
    };

    const handleCountyChange = (event: any) => {
        setCounty(event.target.value)
    }

    const handleFundsChange = (event: any) => {
        setFunds(event.target.value)
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
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px'}}>
                        <TextField onChange={handleCountyChange} id="outlined-basic" label="County" />
                        <TextField onChange={handleFundsChange} id="outlined-basic" label="Required Funds" />
                    </Box>
                </FormControl>

                <Box component={"div"} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <Box component={"div"}>
                        <Button
                            onClick={() => {
                                fetchCreateEvent(authKey,
                                    {
                                        "title": title,
                                        "content": message,
                                        "creatorId": "",
                                        "location": county,
                                        "kudos": [],
                                        "comments": "",
                                        "funds": funds
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

export default CreateEvent;