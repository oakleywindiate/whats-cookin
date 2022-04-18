// ----------------- IMPORTS ----------------- //

import './styles.css';
import apiCalls from './apiCalls';
import {getFetch, addIngredients, removeIngredients, errorMessage} from './apiCalls.js'
import RecipeRepository from './classes/RecipeRepository';
import Recipe from './classes/Recipe';
import Ingredient from './classes/Ingredient';
import UserRepository from './classes/UserRepository';
import User from './classes/User';
import {displayPantryIngredients, createRecipeList, displayRecipe, checkPantryInfo, searchByTagOrName, getRecipeByName, createFavoritesList, searchFavoritesByTagOrName, createRecipesToCookList} from './domUpdates.js';

// ----------------- QUERY SELECTORS ----------------- //

// --------HOME-PAGE-------- //
let mainPage = document.querySelector('.main-page-wrapper');
let recipeButtonList = document.querySelector('.recipe-list');
let viewRecipe = document.querySelector('.display-recipe-object');
let modal = document.querySelector('.modal');
let close = document.querySelector('.close');
let heartButton = document.querySelector('.heart-button-container');
let viewRtc = document.querySelector('.recipes-to-cook-button');
let addRecipesToCookButton = document.querySelector('.addRecipeToCook-button-container');

// --------FAVORITES-PAGE-------- //
let favoritesPage = document.querySelector('.favorites-page-wrapper');
let favoritesButtonList = document.querySelector('.favorites-list');
let viewFavorite = document.querySelector('.display-favorite-recipe-object');
let favoritesButton = document.querySelector('.favorites-button');
let favoriteModal = document.querySelector('.favorite-modal');
let favoritesClose = document.querySelector('.favorites-close');
let favoritesHeartButton = document.querySelector('.favorites-heart-button-container');
let homeButton = document.querySelector('.home-button');

// --------SEARCHED-PAGE-------- //
let searchInput = document.querySelector('.search-input');
let inputValue = document.querySelector('.search-input').value;
let searchedRecipes = document.querySelector('.display-searched-recipes');
let clearSearchButton = document.querySelector('.clear-search-button');

// --------FAVORITES SEARCHED-PAGE-------- //
let favoritesSearchInput = document.querySelector('.favorites-search-input');
let searchedFavorites = document.querySelector('.favorites-display-searched-recipes');
let searchFavoritesModal = document.querySelector('.display-search-favorite-recipe-object');
let favoritesRtcButton = document.querySelector('.favorites-rtc-button-container');

// --------RECIPES TO COOK PAGE-------- //
let rtcPage = document.querySelector('.rtc-page-wrapper');
let rtcButtonList = document.querySelector('.rtc-list');
let viewRecipesToCook = document.querySelector('.display-rtc-recipe-object');
let rtcClose = document.querySelector('.rtc-close');
let rtcHeartButton = document.querySelector('.rtc-heart-button-container');
let rtcHomeButton = document.querySelector('.rtc-home-button');
let rtcModal = document.querySelector('.rtc-modal');
let rtcRtcButton = document.querySelector('.rtc-rtc-button-container');

// --------MY PANTRY PAGE-------- //
let pantryHomeButton = document.querySelector('.pantry-home-button');
let pantryButton = document.querySelector('.my-pantry-button');
let pantryPage = document.querySelector('.my-pantry-wrapper');
let addIngredientsButton = document.querySelector('.add-pantry-ingredients-button');
let pantryModal = document.querySelector('.pantry-modal');
let pantryClose = document.querySelector('.pantry-close');
let pantryList = document.querySelector('.pantry-list');

const form = document.querySelector('#pantryForm');


// ----------------- GLOBAL VARIABLES ----------------- //

let ingredientList;
let recipeList;
let userList;
let user;

// ----------------- FUNCTIONS ----------------- //

const getRandomUser = (array) => {
  const user = array[Math.floor(Math.random() * array.length)];
  return user;
};


const getApiData = () => {
  Promise.all([
    getFetch('users'),
    getFetch('ingredients'),
    getFetch('recipes')
  ]).then(data => {
    createDataInstances(data)
    createRecipeList()
  });
};


const refreshPantry = (userId) => {
  Promise.all([
    getFetch('users'),
    getFetch('ingredients'),
    getFetch('recipes')
  ]).then(data => {
    refreshDataInstances(data, userId)
  })
};



const findIngredient = (input) => {
  const searchName = ingredientList.ingredientData.find(ingredient => {
    return ingredient.name === input
  })
  if (searchName) {
    return searchName.id
  }
};


const createDataInstances = (data) => {
  ingredientList = new Ingredient(data[1]);
  recipeList = new RecipeRepository(data[2]);
  userList = new UserRepository(data[0]);
  user = getRandomUser(userList.userObjects);
};


const refreshDataInstances = (data, userId) => {
  getFetch('users')
  ingredientList = new Ingredient(data[1]);
  recipeList = new RecipeRepository(data[2]);
  userList = new UserRepository(data[0]);
  const findUser = () => {
    userList.userObjects.forEach(user1 => {
      if (user1.userData.id === userId) {
        user.userData.pantry = user1.userData.pantry
      }
    })
  }
  findUser();
};


const findRecipeId = (id) => {
  const filterRecipe = recipeList.recipe.find(recipe => {
    let stringifyId = recipe.recipe.id.toString();
    return stringifyId === id;
  });
  return filterRecipe;
};


const showElement = (element) => {
  element.classList.remove('hidden');
};


const hideElement = (element) => {
  element.classList.add('hidden');
};


// ----------------- FORMS ----------------- //

form.addEventListener('submit', (e) => {
  e.preventDefault();
  errorMessage.innerText = '';
  const formData = new FormData(e.target);
  const ingredientId = findIngredient(formData.get('ingredientId'))
  const newIngredient = {
    userID: parseInt(user.userData.id),
    ingredientID: parseInt(ingredientId),
    ingredientModification: parseInt(formData.get('ingredientModification'))
  };
  if (ingredientId) {
    addIngredients(newIngredient);
    refreshPantry(newIngredient.userID)
  } else if (!ingredientId) {
    errorMessage.innerText = "Sorry, that ingredient does not exist!"
  }
  e.target.reset();
});



viewRecipesToCook.addEventListener('click', (e) => {
  let recipeId = e.target.getAttribute('id');
  const recipeIngredients = findRecipeId(recipeId).recipe.ingredients;

  if (event.target.className === "cook-recipe-button") {
    recipeIngredients.forEach(ingredient => {
      const removeIngredient = {
        userID: parseInt(user.userData.id),
        ingredientID: parseInt(ingredient.id),
        ingredientModification: -parseInt(ingredient.quantity.amount)
      }
      removeIngredients(removeIngredient)
      rtcModal.style.display = 'none';
    })
  }
})


// ----------------- EVENT LISTENERS ----------------- //

window.addEventListener('load', getApiData);

recipeButtonList.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id');
  displayRecipe(targetId, viewRecipe, heartButton, addRecipesToCookButton);
  modal.style.display = 'block';
});

close.addEventListener('click', (e) => {
  modal.style.display = 'none';
});

heartButton.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id');
  user.favoriteRecipe(targetId, recipeList);
  event.target.style.color = '#F95624';
});

searchedRecipes.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id');
  displayRecipe(targetId, viewRecipe, heartButton, addRecipesToCookButton);
  modal.style.display = 'block';
});

searchInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    let inputValue = e.target.value.toLowerCase();
    searchByTagOrName(inputValue);
  };
});

favoritesButton.addEventListener('click', (e) => {
  hideElement(mainPage);
  showElement(favoritesPage);
  favoritesButtonList.innerHTML = '';
  createFavoritesList();
});

favoritesButtonList.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id');
  displayRecipe(targetId, viewFavorite, favoritesHeartButton, favoritesRtcButton);
  favoriteModal.style.display = 'block';
});

favoritesClose.addEventListener('click', (e) => {
  favoriteModal.style.display = 'none';
  favoritesButtonList.innerHTML = '';
  createFavoritesList();
  searchedFavorites.innerHTML = '';
  favoritesSearchInput.value = '';
});

favoritesSearchInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    let inputValue = e.target.value.toLowerCase();
    searchFavoritesByTagOrName(inputValue);
  };
});

searchedFavorites.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id');
  displayRecipe(targetId, viewFavorite, favoritesHeartButton, favoritesRtcButton);
  favoriteModal.style.display = "block";
});

homeButton.addEventListener('click', (e) => {
  hideElement(favoritesPage);
  showElement(mainPage);
  searchedFavorites.innerHTML = '';
});

clearSearchButton.addEventListener('click', (e) => {
  hideElement(clearSearchButton);
  createRecipeList();
  searchInput.value = '';
});

viewRtc.addEventListener('click', (e) => {
  hideElement(mainPage);
  showElement(rtcPage);
  rtcButtonList.innerHTML = '';
  createRecipesToCookList();
});

rtcHomeButton.addEventListener('click', (e) => {
  hideElement(rtcPage);
  showElement(mainPage);
});

addRecipesToCookButton.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id');
  user.addRecipesToCook(targetId, recipeList);
  event.target.style.color = '#F95624';
});

rtcButtonList.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id');
  displayRecipe(targetId, viewRecipesToCook, rtcHeartButton, rtcRtcButton);
  checkPantryInfo(targetId, recipeList, ingredientList);
  rtcModal.style.display = 'block';
});

rtcClose.addEventListener('click', (e) => {
  rtcModal.style.display = 'none';
});

favoritesHeartButton.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id');
  user.unfavoriteRecipe(targetId);
  event.target.style.color = 'black';
});

pantryHomeButton.addEventListener('click', (e) => {
  hideElement(pantryPage);
  showElement(mainPage);
});

pantryButton.addEventListener('click', (e) => {
  hideElement(mainPage);
  showElement(pantryPage);
  displayPantryIngredients(ingredientList);
});

addIngredientsButton.addEventListener('click', (e) => {
  pantryModal.style.display = 'block';
});

pantryClose.addEventListener('click', (e) => {
  pantryModal.style.display = 'none';
  displayPantryIngredients()
  errorMessage.innerText = ''
});

// ----------------- EXPORTS ----------------- //

export {showElement, hideElement, viewRecipesToCook, recipeList, recipeButtonList, findRecipeId, ingredientList, userList, user, refreshPantry, pantryList, rtcButtonList, favoritesButtonList, searchedRecipes, clearSearchButton, searchedFavorites};
