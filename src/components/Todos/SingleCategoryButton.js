import React from 'react'

export default function SingleCategoryButton(props) {

  const toggleCategory = () => {
    console.log("I can see hidingDone and its value is " + props.hidingDone)
    Array.from(props.categories).forEach((category) => {
      var todosToShow = document.getElementsByClassName(`category-${props.category.CategoryId}`);

      var arrayToShow = Array.from(todosToShow);

      if(props.hidingDone) {
        var arrayFiltered = new Array();
        arrayToShow.forEach((todo) => 
          {
            if(todo.getAttribute("class").includes("todo-false")){
              console.log("I have spotted a todo with todo-false in its classes, and its id is " + todo.getAttribute("id"));
              arrayFiltered.push(document.getElementById(`${todo.getAttribute("id")}`));
            }
          })
        console.log(arrayFiltered);
        arrayFiltered.forEach((todoToShow) => {
          document.getElementById(`${todoToShow.getAttribute("id")}`).style.display = "flex";
        })
      }
      else {
        console.log("We are not hiding done, so here's the usual functionality!")
        arrayToShow.forEach((todoToShow) => {
          document.getElementById(`${todoToShow.getAttribute("id")}`).style.display = "flex";
        })
      }
      

      if(category.CategoryId !== props.category.CategoryId) {
        var todosToHide = document.getElementsByClassName(`category-${category.CategoryId}`);

        var arrayToHide = Array.from(todosToHide);

        arrayToHide.forEach((todoToHide) => {
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
