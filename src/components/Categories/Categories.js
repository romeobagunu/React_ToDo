import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'

import './Categories.css'
import CatCreate from './CatCreate';
import SingleCategory from './SingleCategory';

export default function Categories() {

  const { currentUser } = useAuth();

  const [showCreate, setShowCreate] = useState(false);

  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios.get('http://todoapi.romeobagunu.com/api/categories').then(response => {
      setCategories(response.data);
    })
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="categories">
      <div className="bg-primary py-5">
        <h1 className="text-center text-white">Categories</h1>
      </div>
      {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <div className="my-3 text-center">
          {!showCreate ?
          <button className="btn btn-success" onClick={() => setShowCreate(true)}>Add Category</button> :
            <div className="createForm bg-white p-3 rounded">
              <CatCreate 
                setShowCreate={setShowCreate}
                getCategories={getCategories}
                />
            </div>
          }
        </div>
      }
      <table className="table mx-auto mt-2 w-75">
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN && 
            <th>Admin Buttons</th>}
          </tr>
        </thead>
        <tbody>
      {categories.map(item =>
        <SingleCategory key={item.CategoryId} category={item} getCategories={getCategories}/>
      )}
        </tbody>
      </table>
    </section>
  )
}
