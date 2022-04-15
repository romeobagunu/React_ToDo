import React from 'react'

export default function SingleCategoryButton(props) {

  const toggleCategory = () => {
    console.log("Pressed the button for Category #" + props.category.CategoryId);
    Array.from(props.categories).forEach((category) => {
      var todosToShow = document.getElementsByClassName(`category-${props.category.CategoryId}`);
        Array.from(todosToShow).forEach((todoToShow) => {
          document.getElementById(`${todoToShow.getAttribute("id")}`).style.display = "flex";
        })

      if(category.CategoryId !== props.category.CategoryId) {
        var todosToHide = document.getElementsByClassName(`category-${category.CategoryId}`);
        Array.from(todosToHide).forEach((todoToHide) => {
          document.getElementById(`${todoToHide.getAttribute("id")}`).style.display = "none";
        })
      }
    })
  }

  return (
    <button onClick={() => toggleCategory()} className={`btn btn-outline-light categoryButton`}>
        {props.category.CategoryName}
    </button>
  )
}
