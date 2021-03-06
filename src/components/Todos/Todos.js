import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext'

// import Welcome from './Welcome';

import './Todos.css'
import TodoCreate from './TodoCreate';
import SingleTodo from './SingleTodo';
import CategoryButtons from './CategoryButtons';

export default function Todos() {

  const { currentUser } = useAuth();
  
  const [todos, setTodos] = useState([]);

  const [hidingDone, setHidingDone] = useState(false);

  const [noTodos, setNoTodos] = useState(false);

  const [showCreate, setShowCreate] = useState(false);

  const markupTodos = () => {
    Array.from(document.getElementsByClassName("todo-true")).forEach((todo) => {
      todo.style = "text-decoration: line-through; background-color: rgb(25,135,84); color: #eee;";
    });
    Array.from(document.getElementsByClassName("todo-false")).forEach((todo) => {
      todo.style = "text-decoration: none;";
    });
  }

  const getTodos = () => {
    axios.get('http://todoapi.romeobagunu.com/api/todos').then((response) => {
        setTodos(response.data);
        setNoTodos(false);
    }).catch((error) => {
      if(error.response.status === 404) {
        setNoTodos(true);
      }
    }).then(() => {
      markupTodos();
    })
  };

  const toggleDone = () => {
    var todosDone = document.getElementsByClassName("todo-true");
    Array.from(todosDone).forEach((todoDone) => {
      var todoDoneElement = document.getElementById(todoDone.getAttribute("id"));
      if(todoDoneElement.style.display === "none") {
        todoDoneElement.style.display = "flex";
      }
      else if (todoDoneElement.style.display === "flex") {
        todoDoneElement.style.display = "none";
      }
      else {
        todoDoneElement.style.display = "none";
      }
    })
  }

  const deleteDone = () => {
    if(window.confirm(`Are you sure you want to delete all completed ToDo's?`)) {
      var todosDone = todos.filter(todo => todo.Done === true);
      todosDone.forEach( todoDone =>
        {
        console.log("Deleted " + todoDone.TodoId);
        axios.delete(`http://todoapi.romeobagunu.com/api/todos/${todoDone.TodoId}/`).then(() => getTodos())
      })
    }
  }

  const deleteAll = () => {
    if(window.confirm(`Are you sure you want to delete ALL your ToDo's?`)) {
      todos.forEach( todo =>
        {
          console.log("Deleted " + todo.TodoId);
          axios.delete(`http://todoapi.romeobagunu.com/api/todos/${todo.TodoId}/`).then(() => getTodos())
        })
    }
  }

  useEffect(() => {
    console.log("UEF fired");
    getTodos();
  }, []);

  return (
    <>
      {/* <Welcome /> */}
      <section className="todos">
        <CategoryButtons 
          hidingDone = {hidingDone}
          />
        <div className="todosWrapper">
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <article className="todoFunctions">
          <h2>Actions</h2>
          <button className="btn btn-success" onClick={() => setShowCreate(true)}>New Todo</button>
          {!hidingDone ? 
          <button className="btn btn-secondary" onClick={() => {setHidingDone(true); toggleDone(); }}>Hide Done</button> :
          <button className="btn btn-secondary" onClick={() => {setHidingDone(false); toggleDone(); }}>Show Done</button>
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
