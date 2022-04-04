// Your fetch requests will live here!

let usersDataAPI
let ingredientsDataAPI
let recipesDataAPI

const getFetchAll = () => {
  usersDataAPI = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
    .then(response => response.json())
  ingredientsDataAPI = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
    .then(response => response.json())
  recipesDataAPI = fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
    .then(response => response.json())
  .catch((error) => {
    return displayError(error)
  })
}

const displayError = (error) => {
  if (error.message === "Failed to fetch!") {
    errorTag.innerText = "OPPS, SORRY! Something went wrong!";
  } else {
    errorTag.innerText = error.message;
  }
}

// console.log(usersDataAPI)

export {usersDataAPI, ingredientsDataAPI, recipesDataAPI, getFetchAll, displayError}
