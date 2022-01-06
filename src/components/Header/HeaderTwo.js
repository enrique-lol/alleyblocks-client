import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import { Navbar, Container } from 'react-bootstrap/'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link href="#new-item">New</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Explore</Nav.Link>
    <Nav.Link href="#/">Collections</Nav.Link>
    <Nav.Link href="#/">About</Nav.Link>
  </Fragment>
)

const HeaderTwo = ({ user }) => (
  <Navbar>
    <Container>
      <Navbar.Brand className="brand" href="#/">AlleyBlocks</Navbar.Brand>
      <Nav className="me-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Container>
  </Navbar>
)

export default HeaderTwo
