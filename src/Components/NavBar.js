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
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { FolderSpecialOutlined } from '@mui/icons-material';

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
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3} className='d-block d-sm-none'>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          >
          <BottomNavigationAction label="Recents" icon={<FeedIcon />} href='/jobstable'/>
          <BottomNavigationAction label="Favorites" icon={<MapIcon />} />
          <BottomNavigationAction label="Archive" icon={<InsertPhotoIcon />} />
          <BottomNavigationAction label="Numbers" icon={<ConfirmationNumberIcon />} />
        </BottomNavigation>
      </Paper>

    <Navbar bg="primary" variant="dark" expand="lg" className="w-100 d-none d-sm-block">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* Your navigation links */}
            {window.sessionStorage.getItem("user") && (
              <>
                <Nav.Link href="/jobstable">All Jobs</Nav.Link>
                <Nav.Link href="/invoices">Invoices</Nav.Link>
                <Nav.Link href="/completed">Completed</Nav.Link>
                <Nav.Link href="/todo">ToDo</Nav.Link>
                <Nav.Link href="/form">Form</Nav.Link>
                <Nav.Link href="/legends">Pricing</Nav.Link>
                {/* <Nav.Link href="/receipts">Receipts</Nav.Link> */}
                <Button variant="blue" style={{color:"white"}} onClick={() => { window.sessionStorage.clear(); window.location.reload() }}>Logout</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
            </>
  )

  // return (
  // );
}