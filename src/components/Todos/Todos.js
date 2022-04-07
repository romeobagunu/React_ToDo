import React, { useState, useEffect } from 'react'

import axios from 'axios';

import Welcome from './Welcome';

export default function Todos() {

  const [resources, setResources] = useState([]);

  const getResources = () => {
    axios.get('http://localhost:64779/api/todos').then(response => {
      setResources(response.data);
    })
  }

  useEffect(() => {
    getResources();
  }, []);

  return (
    <>
      <Welcome />
      <section className="todos">
        <h2 className="m-auto px-3">To Do:</h2>
        <article className="todoList m-auto px-3">
          <ol>
        {resources.map(item =>
            <li key={item.TodoId} className="todo col-md-4 p-0 mx-3 my-3">
              <h5 className="text-success">{item.Action}</h5>
              <p className="text-muted">Done? {item.Done ? <span>Done.</span> : <span>Not Done.</span>}</p>
            </li>
        )}
          </ol>
        </article>
      </section>
    </>
  )
}
