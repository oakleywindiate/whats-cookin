import refreshPantry from './scripts.js';

const getFetch = (address) => {
  return fetch(`http://localhost:3001/api/v1/${address}`)
  .then(response => response.json())
  .catch((error) => {
    console.log("Error in retrieving data!");
  });
};

const addIngredients = (newIngredient) => {
  fetch("http://localhost:3001/api/v1/users", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newIngredient)
  })
  //if the response returns back ok, then get fetch user recipeInfo
  .then(response => {
    if (!response.ok) {
      throw Error()
    } else {
      return response.json()
    }
  })
  .then(response => refreshPantry(newIngredient.userID))
}

const removeIngredients = (newIngredient) => {
  fetch("http://localhost:3001/api/v1/users", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newIngredient)
  })
  //if the response returns back ok, then get fetch user recipeInfo
  .then(response => {
    if (!response.ok) {
      throw Error()
    } else {
      return response.json()
    }
  })
  .then(response => refreshPantry(newIngredient.userID)) //update this function
}



export {getFetch, addIngredients, removeIngredients};
