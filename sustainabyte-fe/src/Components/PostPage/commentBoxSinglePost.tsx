import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, Theme, Typography, useTheme } from '@mui/material';

const CommentBoxSinglePost = () => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([  // TODO: Get this data from API
    // maybe have something like username: comment_content
    "lorem comment 1",
    "ipsum comment 2"
  ]);

  const handleCommentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    // TODO: Handle comment submission logic here
    setNewComment('');
  };

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
              <IconButton onClick={handleCommentSubmit} color="primary">
                <SendIcon fontSize='small' />
              </IconButton>
            ),
          }}
        />
        <Box marginTop="10px">
          <Typography variant="body1" color="textSecondary" >
            {comments.map((c, index) => (
              <>
              <div style={{background: 'black'}} key={index}>{c}</div>
              <br></br>              
              </>
            ))}
          </Typography>
        </Box>
    </Box>
  );
};

export default CommentBoxSinglePost;
