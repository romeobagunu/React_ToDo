import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {

    const { login, logout, currentUser } = useAuth();

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
                    {
                  currentUser &&
                  <Nav.Link onClick={() => logout()} className="btn btn-danger text-white mx-3">Logout</Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
  )
}
