import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import { Navbar, Container, NavDropdown } from 'react-bootstrap/'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    <NavDropdown title="New" id="basic-nav-dropdown">
      <NavDropdown.Item href="#new-item">Item</NavDropdown.Item>
      <NavDropdown.Item href="#new-collection">Collection</NavDropdown.Item>
    </NavDropdown>
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
    <Nav.Link href="#/collections">Collections</Nav.Link>
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
