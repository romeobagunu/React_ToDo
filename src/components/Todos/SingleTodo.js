import React, {useState, useEffect} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'

import TodoEdit from './TodoEdit';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export default function SingleTodo(props) {

    const { currentUser } = useAuth();

    const [showEdit, setShowEdit] = useState(false);

    const deleteTodo = (id) => {
        if(window.confirm(`Are you sure you want to delete ${props.todo.Action}?`)) {
            axios.delete(`http://localhost:64779/api/todos/${id}/`).then(() => props.getTodos())
        }
    }

    const flipTodo = () => {
        const todoToFlip = {
            TodoId: props.todo.TodoId,
            Action: props.todo.Action,
            Done: !props.todo.Done,
            CategoryId: props.todo.CategoryId
        }
        axios.put('http://localhost:64779/api/todos/', todoToFlip).then(() => {
            props.getTodos();
        });
    }

    // useEffect(() => {
    //     props.todo.Done ? 
    //     document.getElementById(`todo-${props.todo.TodoId}`).style = "text-decoration: line-through; background-color: rgb(25,135,84); color: #eee;" : 
    //     document.getElementById(`todo-${props.todo.TodoId}`).style = "text-decoration: none;"
    // });

  return (
    <div key={props.todo.TodoId} className={`todo shadow-sm rounded category-${props.todo.CategoryId} todo-${props.todo.Done}`} id={`todo-${props.todo.TodoId}`}>
        <div className="todoCheckbox">
        {!props.todo.Done ? 
            <button className="btn btn-secondary" onClick={() => flipTodo()}>
            <FontAwesomeIcon icon="fa-solid fa-check" />
            </button> :
            <button className="btn btn-success" onClick={() => flipTodo()}>
            <FontAwesomeIcon icon="fa-solid fa-check" />
            </button>
        }
        </div>
        <div className="todoText" id={`todo-${props.todo.TodoId}-bubble`} >
            <p>{props.todo.Category.CategoryName}</p>
            <h5>{props.todo.Action}</h5>
        </div>
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <div className="todoButtons">
        <button className="btn btn-info btn-sm m-2" onClick={() => setShowEdit(true)}>
        <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
        </button>
        {showEdit &&
        <TodoEdit 
            todo={props.todo}
            setShowEdit={setShowEdit}
            showEdit={showEdit}
            getTodos={props.getTodos}
            />
        }
        <button className="btn btn-danger btn-sm m-2" onClick={() => deleteTodo(props.todo.TodoId)}>
            <FontAwesomeIcon icon="fa-solid fa-trash" />
        </button>
        </div>
        }
    </div>
  )
}
