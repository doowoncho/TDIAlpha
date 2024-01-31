import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function NavBar() {
  const [isResponsive, setResponsive] = useState(false);

  const handleToggle = () => {
    setResponsive(!isResponsive);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="w-100">
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
                <Nav.Link href="/legends">Legend</Nav.Link>
                <Nav.Link href="/receipts">Receipts</Nav.Link>
                <Button variant="blue" style={{color:"white"}} onClick={() => { window.sessionStorage.clear(); window.location.reload() }}>Logout</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}