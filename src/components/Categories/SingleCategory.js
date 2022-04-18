import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'

import CatEdit from './CatEdit'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);

export default function SingleCategory(props) {

    const [showEdit, setShowEdit] = useState(false);

    const {currentUser} = useAuth();

    const deleteCategory = (id) => {
        if(window.confirm(`Are you sure you want to delete ${props.category.CategoryName}?`)) {
            axios.delete(`http://todoapi.romeobagunu.com/api/Categories/${id}/`).then(() => {
                props.getCategories();
            })
        }
    }

  return (
    <tr key={props.category.CategoryId}>
        <td>{props.category.CategoryName}</td>
        <td>{props.category.CategoryDescription}</td>
        {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <td>
            <button className="btn btn-primary my-1 mx-2" onClick={() => setShowEdit(true)}>
                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
            </button>
            {showEdit &&
            <CatEdit 
                cat={props.category}
                setShowEdit={setShowEdit}
                showEdit={showEdit}
                getCategories={props.getCategories}
                />
            }
            <button className="btn btn-danger my-1 mx-2" onClick={() => deleteCategory(props.category.CategoryId)}>
                <FontAwesomeIcon icon="fa-solid fa-trash" />
            </button>
        </td>
        }
    </tr>
  )
}
