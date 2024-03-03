import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import FeedIcon from '@mui/icons-material/Feed';
import MapIcon from '@mui/icons-material/Map';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import Paper from '@mui/material/Paper';
import { AppBar, BottomNavigation, BottomNavigationAction, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { AutoStories, CalendarMonth, CheckCircle, FolderSpecialOutlined, Home } from '@mui/icons-material';

export default function NavBar() {
  const [isResponsive, setResponsive] = useState(false);

  const handleToggle = () => {
    setResponsive(!isResponsive);
  };

  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    {window.sessionStorage.getItem("user") && (
      <>
      <Paper className='d-block d-sm-none'>
        <AppBar position="static" sx={{ height: 50, boxShadow: 'none' }} color='inherit'>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              />
            <Typography variant="h10" component="div" sx={{ flexGrow: 1 }}>
              TDI
            </Typography>
            <Button variant="light" className='mx-2 border'>Pricing</Button>
            <Button variant="dark">Logout</Button>
          </Toolbar>
        </AppBar>
      </Paper>

      <Paper sx={{ position: 'fixed', left: 0, right: 0, bottom:0, zIndex: 1000 }} className='d-block d-sm-none'>
        <BottomNavigation showLabels>
          <BottomNavigationAction label="All Jobs" icon={<Home />} href='/jobstable' value="jobs"/>
          <BottomNavigationAction label="Invoiced" icon={<AutoStories />} href="/invoices" value="invoices"/>
          <BottomNavigationAction label="ToBe Invoiced" icon={<CheckCircle />} href='/completed' value="completed"/>
          <BottomNavigationAction label="ToDo" icon={<CalendarMonth />} href='/todo' value="todo"/>
          <BottomNavigationAction label="Form" icon={<FeedIcon />} href='/form' value="from"/>
        </BottomNavigation>
      </Paper>

      <Paper className='d-none d-sm-block'>
      <Navbar variant="light" expand="lg" className="w-100">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle} />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Typography variant="h10" component="div" sx={{ flexGrow: 1 }}>
              TDI
            </Typography>
            <Nav className="me-auto">
                <>
                  <Nav.Link href="/jobstable">All Jobs</Nav.Link>
                  <Nav.Link href="/invoices">Invoiced</Nav.Link>
                  <Nav.Link href="/completed">To Be Invoiced</Nav.Link>
                  <Nav.Link href="/todo">ToDo</Nav.Link>
                  <Nav.Link href="/form">Form</Nav.Link>
                  <Nav.Link href="/legends">Pricing</Nav.Link>
                  {/* <Nav.Link href="/receipts">Receipts</Nav.Link> */}
                  <Button variant="blue" style={{color:"white"}} onClick={() => { window.sessionStorage.clear(); window.location.reload() }}>Logout</Button>
                </>
            </Nav>
            <Button variant="dark" style={{color:"white"}} onClick={() => { window.sessionStorage.clear(); window.location.reload() }}>Logout</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Paper>
      </>
    )}
  </>
  )
}