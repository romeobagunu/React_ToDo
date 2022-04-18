import axios from 'axios';
import React, { useState, useEffect } from 'react'

import SingleCategoryButton from './SingleCategoryButton';

export default function CategoryButtons(props) {

const [categories, setCategories] = useState([]);

const showAllCategories = () => {
    console.log("I can see hidingDone and its value is " + props.hidingDone)
    var allTodos = document.getElementsByClassName("todo");
    Array.from(allTodos).forEach((todo) => {
        document.getElementById(`${todo.getAttribute("id")}`).style.display = "flex";
    })
}

const getCategories = () => {
    axios.get('http://todoapi.romeobagunu.com/api/categories').then((response) => {
        setCategories(response.data);
    })
}

useEffect(() => {
    getCategories()
}, []);

  return (
    <div className="categoriesWrapper">
        <button className="btn btn-outline-light" onClick={() => showAllCategories()}>
        All Categories
        </button>
        {categories.map(item => 
            <SingleCategoryButton
                key={item.CategoryId}
                category={item}
                categories={categories}
                hidingDone={props.hidingDone}
            />
        )}
    </div>
  )
}
