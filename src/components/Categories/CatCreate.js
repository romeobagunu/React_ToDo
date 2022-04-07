import React from 'react'
import CatForm from './CatForm'

export default function CatCreate(props) {
  return (
    <CatForm
        setShowCreate={props.setShowCreate}
        getCategories={props.getCategories}
        />
  )
}
