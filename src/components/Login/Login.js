import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

export default function Login() {

  const { login, currentUser } = useAuth();

  return !currentUser ? 
    <>
    <section className="login">
        <div className="px-4 py-5 text-center text-white">
          <h1 className="display-5 fw-bold">Welcome to ToDo!</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">Please click the button below to log in with Github.</p>
            <div className="d-grid d-sm-flex justify-content-sm-center">
              <button onClick={() => login()} className="btn btn-primary">LOG IN</button>
            </div>
          </div>
        </div>
    </section> 
    </> :
    <Navigate to="/" />
}
