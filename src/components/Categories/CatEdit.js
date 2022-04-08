import React from 'react'

import CatForm from './CatForm'

import { Modal } from 'react-bootstrap'

export default function CatEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}
        size="lg"
        >
        <Modal.Header closeButton>
            <h2>Editing {props.cat.CategoryName}</h2>
        </Modal.Header>
        <Modal.Body>
            <CatForm 
                cat={props.cat}
                setShowEdit={props.setShowEdit}
                getCategories={props.getCategories}
                />
        </Modal.Body>
    </Modal>
  )
}
