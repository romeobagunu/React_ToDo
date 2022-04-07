import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './Categories.css'

export default function Categories() {

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
