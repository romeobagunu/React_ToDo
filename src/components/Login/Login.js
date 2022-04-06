import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Login() {

  const { login, currentUser } = useAuth();

  return !currentUser ? 
    <>
    <section className="login text-white text-center px-3">
          <h1 className="display-5 fw-bold">Welcome to ToDo!</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">Please click the button below to log in with Github.</p>
            <button onClick={() => login()} className="btn btn-primary">Log in</button>
          </div>
    </section> 
    </> :
    <Navigate to="/" />
}
