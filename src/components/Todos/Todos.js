import React, { useState, useEffect } from 'react'

import axios from 'axios';

import Welcome from './Welcome';

import './Todos.css'

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
        <article className="todoList m-auto px-3">
        <h2>To Do:</h2>
        {resources.map(item =>
            <div key={item.TodoId} className="todo p-3 my-3 shadow-sm rounded">
              <h5>{item.Action}</h5>
            </div>
        )}
        </article>
      </section>
    </>
  )
}
