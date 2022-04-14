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
  
  const [noTodos, setNoTodos] = useState(false);

  const [hidingDone, setHidingDone] = useState(false);
  const getTodos = () => {
    axios.get('http://localhost:64779/api/todos').then((response) => {
      setTodos(response.data);
      setNoTodos(false);
    }).catch((error) => {
      if(error.response.status === 404) {
        setNoTodos(true);
      }
    })
  }

  const hideDone = () => {
      var todosNotDone = todos.filter(todo => todo.Done === false);
      setTodos(todosNotDone);
      setHidingDone(true);
    }

  const deleteDone = () => {
    if(window.confirm(`Are you sure you want to delete all completed ToDo's?`)) {
      var todosDone = todos.filter(todo => todo.Done === true);
      todosDone.forEach( todoDone =>
        {
        console.log("Deleted " + todoDone.TodoId);
        axios.delete(`http://localhost:64779/api/todos/${todoDone.TodoId}/`).then(() => getTodos())
      })
    }
  }

  const deleteAll = () => {
    if(window.confirm(`Are you sure you want to delete ALL your ToDo's?`)) {
      todos.forEach( todo =>
        {
          console.log("Deleted " + todo.TodoId);
          axios.delete(`http://localhost:64779/api/todos/${todo.TodoId}/`).then(() => getTodos())
        })
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      {/* <Welcome /> */}
      <section className="todos">
        <div className="todosWrapper">
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <article className="todoFunctions">
          <h2>Actions</h2>
          <button className="btn btn-success" onClick={() => setShowCreate(true)}>New Todo</button>
          {!hidingDone ?
          <button className="btn btn-secondary" onClick={() => hideDone()}>Hide Done</button> :
          <button className="btn btn-secondary" onClick={() => {
            getTodos();
            setHidingDone(false);}
          }>Show Done</button>
          }
          <button className="btn btn-secondary" onClick={() => deleteDone()}>Delete Done</button>
          <button className="btn btn-danger" onClick={() => deleteAll()}>Delete All</button>
        </article>
        }
        <article className="todoList">
          <h2>To Do:</h2>
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <>
        {showCreate &&
            <div className="createForm px-5">
              <h3 className="my-3 text-white">New Todo</h3>
              <TodoCreate 
                setShowCreate={setShowCreate}
                getTodos={getTodos}
                />
            </div>
          }
        </>
        }
        {noTodos &&
          <div className="alert alert-warning text-center">Nothing left ToDo!</div>
        }
        {!noTodos && 
        todos.map(item =>
        <SingleTodo
          key={item.TodoId} todo={item} getTodos={getTodos} setNoTodos={setNoTodos}
          />
        )}
        </article>
        </div>
      </section>
    </>
  )
}
