import React from 'react'

import { useAuth } from '../../contexts/AuthContext'

import jumbotronImage from '../../images/jumbotron-placeholder.png'

export default function Todos() {

  const { currentUser } = useAuth();

  return (
      <section className="welcome">
      <div className="container col-xxl-8 px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img src={jumbotronImage} className="d-block mx-lg-auto img-fluid" alt="ToDo" width="700" height="500" loading="lazy"/>
            </div>
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold lh-1 mb-3">Welcome, {currentUser.displayName}!</h1>
              <p className="lead">This React application uses Firebase and Github for authentication. It is also hooked up to a REST API with full CRUD functionality.</p>
            </div>
          </div>
        </div>
      </section>
  )
}
