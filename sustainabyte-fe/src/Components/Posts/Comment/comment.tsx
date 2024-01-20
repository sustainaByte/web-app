import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, List, ListItem, ListItemText, Theme, Typography, useTheme } from '@mui/material';
import { Post } from '../posts';
import { addComment } from '../postsHelper';
import {useAuth} from "../../Login/login";
import { useNavigate } from 'react-router-dom';
const CommentBox = (post: Post, user: any) => {
    // @ts-ignore
    const {authKey} = useAuth()

    const commentsData = post.comments
    const post_id = post._id

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

      const handleComments = ()  => {
        console.log(post_id)
        if (user) {
            if(newComment.length > 0)
              console.log(typeof(post_id))
              addComment(authKey, post_id, newComment);
              addStringToArray(newComment)
        } else {
          navigate("/register")
        }
      }
      return (
        <Box marginTop={"5px"}>
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
            <Box marginTop="10px">
              <div>
                <List>
                    {comments.map((text, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={text} />
                      </ListItem>
                    ))}
                </List>
              </div>
            </Box>
        </Box>
      );
};

export default CommentBox;
