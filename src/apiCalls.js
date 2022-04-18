import {refreshPantry} from './scripts.js';

const errorMessage = document.querySelector('.error-message');
const apiErrorMessage = document.querySelector('.api-error');

const getFetch = (address) => {
  return fetch(`http://localhost:3001/api/v1/${address}`)
  .then(response => response.json())
  .catch((error) => {
    apiErrorMessage.innerText = 'Error loading data. Please try again later.';
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
      return response.json(response.statusText)
    }
  })
  .then(response => refreshPantry(newIngredient.userID))
  .catch(error => {
    showError('There was an issue adding this ingredient. Try again!')
  })
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
      throw Error(response.statusText)
    } else {
      return response.json()
    }
  })
  .then(response => refreshPantry(newIngredient.userID))
  .catch(error => {
    showError('There was an issue adding this ingredient. Try again!')
  })
}

const showError = (message) => {
  errorMessage.innerText = message
}

export {getFetch, addIngredients, removeIngredients, errorMessage};
