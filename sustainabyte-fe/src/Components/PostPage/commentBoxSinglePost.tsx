import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, Theme, Typography, useTheme } from '@mui/material';
import { Post } from '../Posts/posts';
import { useNavigate } from 'react-router-dom';
import { addComment } from '../Posts/postsHelper';
import { useAuth } from '../Login/login';
const CommentBoxSinglePost = (props: {post: Post, user: any}) => {
    // @ts-ignore
    const {authKey} = useAuth()
    const commentsData = props.post.comments
    const post_id = props.post._id
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate()
    const [comments, setComments] = useState(
        Array.isArray(commentsData)
            ? commentsData.map(comment => {
                if (
                    Array.isArray(comment) &&
                    comment.length === 2 &&
                    typeof comment[0] === 'string' &&
                    typeof comment[1] === 'object'
                ) {
                    return String(comment[1].comment);
                } else {
// Handle invalid inner array structure here
                    return '';
                }
            })
            : []
    );
    const addStringToArray = (newComm: string) => {
        setComments((prevComments) => [...prevComments, newComm]);
    };
    const handleCommentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setNewComment(event.target.value);
    };
    const handleComments = () => {
        console.log(post_id)
        if (props.user) {
            if(newComment.length > 0)
                console.log(typeof(post_id))
            console.log(newComment)
            addComment(authKey, post_id, newComment);
            addStringToArray(newComment)
        } else {
            navigate("/register")
        }
    }
    return (
        <Box
            marginTop={"5px"}
            sx={{
                width: "500px"
            }}
        >
            <TextField
                label="Add a comment"
                variant="outlined"
                multiline
                minRows={1}
                maxRows={4} // Adjust maxRows as needed
                value={newComment}
                onChange={handleCommentChange}
                fullWidth
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={handleComments} color="primary">
                            <SendIcon fontSize='small' />
                        </IconButton>
                    ),
                }}
            />
            <Box marginTop="10px" sx={{
                backgroundColor: "#000000",
                borderRadius: "1rem",
                paddingTop: "10px",
                paddingLeft: "10px",
                paddingBottom: "5px"
            }}>
                <Typography variant="body1" color="textSecondary" marginTop="5">
                    {comments.map((c, index) => (
                        <>
                            <Box sx={{ paddingBottom: "10px" }} key={index}>{c}</Box>
                        </>
                    ))}
                </Typography>
            </Box>
        </Box>
    );
};
export default CommentBoxSinglePost;