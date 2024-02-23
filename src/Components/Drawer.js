import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import FileUpload from './FileUpload';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import FeedIcon from '@mui/icons-material/Feed';
import MapIcon from '@mui/icons-material/Map';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { useState } from 'react';

const drawerBleeding = 56;

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer({window, jobId, label, type}) {
  const [open, setOpen] = useState();
  const toggleDrawer = (newOpen) => () => { setOpen(newOpen);};

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  const icon = () =>{
    switch(label) {
        case "Permit Confirmation":
            return <ConfirmationNumberIcon></ConfirmationNumberIcon>
        case "Permit":
            return <FeedIcon></FeedIcon>
        case "Plan":
            return <MapIcon></MapIcon>
        case "Photo":
            return <InsertPhotoIcon></InsertPhotoIcon>
      }
  }

  return (
    <>
    <p1>{label}</p1>
    <div className='container'>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
    <Button variant="contained" className='my-3' onClick={toggleDrawer(true)} style={{ height: '100px', width: '100px' }}>{icon()}</Button>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{ keepMounted: false }}
        PaperProps={{
            style: {maxWidth: '500px', margin: '0 auto' } // Adjust width dynamically
          }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>{label}</Typography>
        </StyledBox>
        <StyledBox sx={{ px: 2, pb: 2, height: '100%', overflow: 'auto' }} className='container'>
          <FileUpload type={type} giveID={jobId}></FileUpload>
        </StyledBox>
      </SwipeableDrawer>
      </div>
    </>
  );
}
export default SwipeableEdgeDrawer;

{/* <Skeleton variant="rectangular" height="100%" /> */}