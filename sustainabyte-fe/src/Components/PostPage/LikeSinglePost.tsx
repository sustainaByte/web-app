import {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button/Button';
import {Badge, Box, useTheme} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ParkIcon from '@mui/icons-material/Park';
import ParkOutlinedIcon from '@mui/icons-material/ParkOutlined';

import {useAuth} from "../Login/login";
import {useNavigate} from "react-router-dom";
import { Post } from '../Posts/posts';
import { addKudos } from '../Posts/postsHelper';


const LikeSinglePost = (props: {post: Post, user: any}) => {
    // @ts-ignore
    const {authKey} = useAuth()
    const [kudosCount, setKudosCount] = useState(0)
    const navigate = useNavigate()
    const [userLiked, setUserLiked] = useState(false)

    useEffect(() => {
        if (props.post) {
            setKudosCount(props.post.kudos.length)
            setUserLiked(props.post.kudos.includes(props.user._id))
        }
    }, [props.post]);

    const handleKudos = ()  => {
        if (props.user && props.post) {
            addKudos(authKey, props.post._id)
            if (userLiked) {
                setKudosCount(kudosCount - 1)
            } else {
                setKudosCount(kudosCount + 1)
            }
            setUserLiked(!userLiked)
        } else {
           navigate("/#/register")
        }
    }
    const theme = useTheme();

    return (
        <Box
            component="div"
            sx={{
                width: "20%"
            }}
        >
            <Box sx={{ marginTop:'5px', }}>
                <Button
                    size='large'
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
                <br/><br/>
                <Button size='large' sx={{ color: `${theme.palette.text.primary}` }}>
                    <ShareIcon />
                    <Typography sx={{ marginLeft: '4px', marginTop: '5px', color: `${theme.palette.text.secondary}` }} variant="body2">
                    &nbsp;SHARE
                    </Typography>
                </Button>
            </Box>
        </Box>
      );
}



export default LikeSinglePost