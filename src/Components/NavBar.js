import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';

export default function NavBar() {
    return (
      <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/"></Navbar.Brand>
        <Nav className="me-auto">
          {/* <Nav.Link href="/">Home</Nav.Link> */}
          {window.sessionStorage.getItem("user") && (
              <>
                <Nav.Link href="/jobstable">All Jobs</Nav.Link>
                <Nav.Link href="/invoices">Invoices</Nav.Link>
                <Nav.Link href="/completed">Completed</Nav.Link>
                <Nav.Link href="/todo">ToDo</Nav.Link>
                <Nav.Link href="/form">Form</Nav.Link>
                <Nav.Link href="/legends">Legend</Nav.Link>
                <Nav.Link href="/receipts">Receipts</Nav.Link>
                <button className='btn' onClick={()=>{window.sessionStorage.clear();window.location.reload()}}>Logout</button>
              </>
          )}
        </Nav>
      </Container>
    </Navbar>
    );
}

