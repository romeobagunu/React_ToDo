import React from 'react'
import TodoForm from './TodoForm'

export default function TodoCreate(props) {
  return (
    <TodoForm 
        setShowCreate={props.setShowCreate}
        getTodos={props.getTodos}
        />
  )
}
