import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
    <section className="categories py-5">
      <h1 className="text-center">Categories</h1>
      <table className="table mx-auto w-50 table-secondary">
        <thead className="table-primary">
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
