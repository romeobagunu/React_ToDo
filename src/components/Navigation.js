import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top" className="p-3">
        <Navbar.Brand href="/Todos">ToDo</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Nav>
                <Link to="/Login" className="nav-link">
                    Login
                </Link>
                <Link to="/Todos" className="nav-link">
                    Todos
                </Link>
                <Link to="/Categories" className="nav-link">
                    Categories
                </Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
