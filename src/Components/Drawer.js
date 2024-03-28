import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from 'react-bootstrap/Button';
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

const drawerBleeding = 10;

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
  width: 60,
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
    <h1>{label}</h1>
    <div className='container d-flex justify-content-center align-items-center'>

      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(60% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
        <Button variant="dark" className='my-3' onClick={toggleDrawer(true)} style={{ height: '60px', width: '80px' }}>{icon()}</Button>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{ keepMounted: false }}
        // style={{ width: "12rem" }}
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
          <Typography sx={{ p: 2, color: 'text.secondary'}}>{label}</Typography>
          <FileUpload type={type} giveID={jobId}></FileUpload>
        </StyledBox>
      </SwipeableDrawer>
      </div>
    </>
  );
}
export default SwipeableEdgeDrawer;