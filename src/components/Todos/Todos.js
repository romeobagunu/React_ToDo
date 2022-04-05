import React from 'react'
import jumbotronImage from '../../images/jumbotron-placeholder.png'

export default function Todos() {
  return (
    <section className="todos">
        <div className="container col-xxl-8 px-4 py-5">
    <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <img src={jumbotronImage} className="d-block mx-lg-auto img-fluid" alt="ToDo" width="700" height="500" loading="lazy"/>
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold lh-1 mb-3">Welcome to ToDo</h1>
        <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
      </div>
    </div>
  </div>
    </section>
  )
}
