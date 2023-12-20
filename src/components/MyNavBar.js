import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { signOut } from '@aws-amplify/auth';

export default function MyNavBar() {
    return (
      <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/"></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/jobstable">All Jobs</Nav.Link>
          <Nav.Link href="/invoices">Invoices</Nav.Link>
          <Nav.Link href="/completed">Completed</Nav.Link>
          <Nav.Link href="/todo">ToDo</Nav.Link>
          <Nav.Link href="/form">Form</Nav.Link>
          <button className='btn' onClick={signOut}>Logout</button>
        </Nav>
      </Container>
    </Navbar>
    );
}

