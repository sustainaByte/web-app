import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import CreatePost from '../CreatePost/createPost';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Button as MuiButton, Fab } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function SimplePopup() {
  const [opened, setOpened] = React.useState(false);

  const handleClickOpen = () => {
    setOpened(true);
  };

  const handleClose = () => {
    setOpened(false);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 2,
        right: 2,
        p: 2,
        color: 'white',
        borderRadius: 1,
        boxShadow: 2,
        backgroundColor: 'transparent',
        '& p': {
          margin: 0,
        },
      }}
    >
      <Fab aria-describedby="simple-popper" type="button" onClick={handleClickOpen} color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>
      <BasePopup id="simple-popper" open={opened} anchor={null}>
        <PopupBody>
          <React.Fragment>
            <MuiButton onClick={handleClickOpen} variant="outlined">
              Open dialog
            </MuiButton>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={opened}>
              <DialogTitle sx={{ m: 0, p: 2, color: '#027d51', fontSize: '2rem' }} id="customized-dialog-title">
                Create a post
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                <CreatePost />
              </DialogContent>

            </BootstrapDialog>
          </React.Fragment>
        </PopupBody>
      </BasePopup>
    </Box>
  );
}

const PopupBody = styled('div')(({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]};
  background-color: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#fff'};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
`);

const Button = styled(MuiButton)(({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${theme.palette.primary.main};
  color: white;
  transition: all 150ms ease;
  cursor: pointer;

  &:hover {
    background-color: ${theme.palette.primary.dark};
  }

  &:active {
    background-color: ${theme.palette.primary.dark};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.primary.light};
  }
`);
