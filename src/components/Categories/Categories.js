import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'

import './Categories.css'
import CatCreate from './CatCreate';

export default function Categories() {

  const { currentUser } = useAuth();

  const [showCreate, setShowCreate] = useState(false);

  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios.get('http://localhost:64779/api/categories').then(response => {
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
        <article className="bg-dark rounded text-center py-5 my-5">
          <div className="adminDashboard mx-auto w-75">
          <h2 className="display-3 text-white">Admin Dashboard</h2>
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
        </article>
        }
      <table className="table mx-auto w-50 mt-5">
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
      {categories.map(item =>
        <tr key={item.CategoryId}>
          <td>{item.CategoryName}</td>
          <td>{item.CategoryDescription}</td>
        </tr>
      )}
        </tbody>
      </table>
    </section>
  )
}
