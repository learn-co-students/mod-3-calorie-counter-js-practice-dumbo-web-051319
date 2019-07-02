// your code here, it may be worth it to ensure this file only runs AFTER the dom has loaded.

document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/api/v1/calorie_entries')
  .then(res => res.json())
  .then(calorieListItems)

  fetch('http://localhost:3000/api/v1/calorie_entries')
  .then(res => res.json())
  .then(addCalorieCount)


  const newCalorieForm = document.querySelector("#new-calorie-form")
  newCalorieForm.addEventListener("submit", () => {

    calorieForm(event)
  })
})

const addCalorieCount = (jsonitems) => {
  let progressBar = document.querySelector(".uk-progress")
  let calArray = jsonitems.map(item => item.calorie) //all items are put into calArray
  let total  = calArray.reduce((a,b) => a + b) //adds all items together
  progressBar.value = total
}

const calorieListItems = (jsonCalories) => {
  const calorieItemsUl = document.querySelector("#calories-list")
  calorieItemsUl.innerHTML = ""
  jsonCalories.forEach(item => {

    caloriesSingleItem(item)
  })
}

const caloriesSingleItem = (item) => {
  const calorieItemsUl = document.querySelector("#calories-list")
  let newli = document.createElement("li")
  newli.className = "calories-list-item"
  newli.innerHTML = `
     <div class="uk-grid">
       <div class="uk-width-1-6">
         <strong>${item.calorie}</strong>
         <span>kcal</span>
       </div>
       <div class="uk-width-4-5">
         <em class="uk-text-meta">${item.note}</em>
       </div>
     </div>
     <div class="list-item-menu">
       <a class="edit-button" uk-toggle="target: #edit-form-container" uk-icon="icon: pencil"></a>
       <a class="delete-button" uk-icon="icon: trash"></a>
     </div>
  `
   calorieItemsUl.prepend(newli)
   let deleteButton = document.querySelector(".delete-button")
   deleteButton.addEventListener("click", () =>
   {deleteBtn(item, event)})
}

const deleteBtn = (item, event) => {
  event.preventDefault()
  fetch(`http://localhost:3000/api/v1/calorie_entries/${item.id}`,{
    method: "DELETE",
    })
    .then( ()=> {
      event.target.parentElement.offsetParent.remove()
    })
  }


const calorieForm = (event) => {
  event.preventDefault()

  fetch('http://localhost:3000/api/v1/calorie_entries', {

    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Accept: "application/json"
    },
    body: JSON.stringify({
      api_v1_calorie_entry: {
      "calorie": event.target[0].value,
      "note": event.target[1].value
    }

    })
  })
  .then(res => res.json())
  .then(caloriesSingleItem)

}
