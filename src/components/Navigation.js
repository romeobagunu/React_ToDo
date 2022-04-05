import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function Navigation() {
  return (
      <div className="navigation">
        <Navbar variant="dark" expand="md" sticky="top" className="py-3 px-5">
            <Navbar.Brand href="/" >ToDo</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Link to="/" className="nav-link">
                        Todos
                    </Link>
                    <Link to="/Categories" className="nav-link">
                        Categories
                    </Link>
                    <Link to="/Login" className="nav-link">
                        Login
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
  )
}
