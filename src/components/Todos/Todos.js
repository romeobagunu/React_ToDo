import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext'

// import Welcome from './Welcome';

import './Todos.css'
import TodoCreate from './TodoCreate';
import SingleTodo from './SingleTodo';

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
      {/* <Welcome /> */}
      <section className="todos">
        <article className="todoList mx-auto my-5 px-3">
        <h2>To Do:</h2>
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <div className="createContainer text-left my-3">
          {!showCreate ?
          <button className="btn btn-success" onClick={() => setShowCreate(true)}>Add Todo</button> :
            <div className="px-5 rounded border shadow-sm">
              <h3 className="my-3">New Todo</h3>
              <TodoCreate 
                setShowCreate={setShowCreate}
                getTodos={getTodos}
                />
            </div>
          }
        </div>
        }
        {todos.map(item =>
        <SingleTodo
          key={item.TodoId} todo={item} getTodos={getTodos}
          />
        )}
        </article>
      </section>
    </>
  )
}
