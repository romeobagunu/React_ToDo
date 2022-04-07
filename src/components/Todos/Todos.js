import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext'

import Welcome from './Welcome';

import './Todos.css'
import TodoCreate from './TodoCreate';

export default function Todos() {

  const { currentUser } = useAuth();

  const [showCreate, setShowCreate] = useState(false);

  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    axios.get('http://localhost:64779/api/todos').then(response => {
      setTodos(response.data);
    })
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <Welcome />
      <section className="todos">
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <article className="bg-dark rounded text-center py-5 my-5">
          <div className="adminDashboard mx-auto w-75">
          <h2 className="display-3 text-white">Admin Dashboard</h2>
          {!showCreate ?
          <button className="btn btn-success" onClick={() => setShowCreate(true)}>Add Todo</button> :
            <div className="createForm bg-white p-3 rounded">
              <TodoCreate 
                setShowCreate={setShowCreate}
                getTodos={getTodos}
                />
            </div>
          }
          </div>
        </article>
        }
        <article className="todoList mx-auto my-5 px-3">
        <h2>To Do:</h2>
        {todos.map(item =>
            <div key={item.TodoId} className="todo p-3 my-3 shadow-sm rounded">
              <h5>{item.Action}</h5>
            </div>
        )}
        </article>
      </section>
    </>
  )
}
