import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/isLoggedIn';
import axios from 'axios';
import { useToastify } from '../../hooks/useToastify';

function Navigation () {
  const navigate = useNavigate();
  const onLogoutHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.get('http://localhost:8000/logout');
      console.log(response);

      localStorage.removeItem('role');
      localStorage.removeItem('token');

      navigate('/');
    } catch (err) {
      useToastify(err);
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Sports Matches Organizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {!isLoggedIn() && <Nav.Link href="/login">Log In</Nav.Link>}
              {!isLoggedIn() && <Nav.Link href="/register">Register</Nav.Link>}
              {isLoggedIn() && <Nav.Link onClick={onLogoutHandler} href="/">Logout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
