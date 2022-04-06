import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleAuth() {
    await login();
    return navigate("/");
  }

  return (
    <section className="login">
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold">Welcome to ToDo!</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">Please click the button below to log in with Github.</p>
            <div className="d-grid d-sm-flex justify-content-sm-center">
              <button onClick={() => handleAuth()} className="btn btn-success">LOG IN</button>
            </div>
          </div>
        </div>
    </section>
  )
}
