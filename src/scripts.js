// ----------------- IMPORTS ----------------- //

import './styles.css';
// import ingredientsData from './data/ingredients';
// import recipeData from './data/recipes';
// import usersData from './data/users';
import apiCalls from './apiCalls';
import {usersDataAPI, ingredientsDataAPI, recipesDataAPI, getFetchAll, displayError} from './apiCalls.js'
import RecipeRepository from './classes/RecipeRepository';
import Recipe from './classes/Recipe';
import Ingredient from './classes/Ingredient';
import UserRepository from './classes/UserRepository';
import User from './classes/User';

// import './images/turing-logo.png'

// ----------------- QUERY SELECTORS ----------------- //

let recipeButtonList = document.querySelector('.recipe-list')
let viewRecipe = document.querySelector('.display-recipe-object')
let searchInput = document.querySelector('.search-input')
let favoritesSearchInput = document.querySelector('.favorites-search-input')
let inputValue = document.querySelector('.search-input').value;
let searchedRecipes = document.querySelector('.display-searched-recipes')
let modal = document.querySelector('.modal')
let favoriteModal = document.querySelector('.favorite-modal')
let close = document.querySelector('.close')
let favoritesClose = document.querySelector('.favorites-close')
let rtcClose = document.querySelector('.rtc-close')
let heartButton = document.querySelector('.heart-button-container')
let favoritesHeartButton = document.querySelector('.favorites-heart-button-container')
let rtcHeartButton = document.querySelector('.rtc-heart-button-container')
let favoritesButtonList = document.querySelector('.favorites-list')
let favoritesButton = document.querySelector('.favorites-button')
let mainPage = document.querySelector('.main-page-wrapper')
let favoritesPage = document.querySelector('.favorites-page-wrapper')
let viewFavorite = document.querySelector('.display-favorite-recipe-object')
let searchedFavorites = document.querySelector('.favorites-display-searched-recipes')
let searchFavoritesModal = document.querySelector('.display-search-favorite-recipe-object')
let homeButton = document.querySelector('.home-button')
let clearSearchButton = document.querySelector('.clear-search-button')
let viewPantry = document.querySelector('.pantry-button')
let pantryPage = document.querySelector('.pantry-page-wrapper')
let pantryHomeButton = document.querySelector('.pantry-home-button')
let rtcHomeButton = document.querySelector('.rtc-home-button')
let viewRtc = document.querySelector('.recipes-to-cook-button')
let rtcPage = document.querySelector('.rtc-page-wrapper')
let favoritesRtcButton = document.querySelector('.favorites-rtc-button-container')
let addRecipesToCookButton = document.querySelector('.addRecipeToCook-button-container')
let rtcButtonList = document.querySelector('.rtc-list')
let rtcModal = document.querySelector('.rtc-modal')
let viewRecipesToCook = document.querySelector('.display-rtc-recipe-object')
let rtcRtcButton = document.querySelector('.rtc-rtc-button-container')

//
// let ingredientsDataFromApi
// let usersDataFromApi
// let recipeDataFromApi

let ingredientList;
let recipeList;
let userList;
let user;

// let ingredientList = new Ingredient(ingredientsData);
// let recipeList = new RecipeRepository(recipeData);
// let userList = new UserRepository(usersData);

// let recipe1 = new Recipe(recipeList.recipeData[0])

// console.log(recipeList.displayNames())
// console.log(recipeList)
// console.log(recipeList.filterName("Baked Stuffed Artichokes"))
// console.log(recipeList.length)

// click on recipe for more information:
// crate event listener that listens for click
// function that uses logged id to do something
const getRandomUser = (array) => {
  const user = array[Math.floor(Math.random() * array.length)];
  return user;
}
// console.log("randomizer: ", getRandomUser(recipeData));

// let user = getRandomUser(userList.userObjects);




// ----------------- FUNCTIONS ----------------- //

const getApiData = () => {
  getFetchAll()
  Promise.all([usersDataAPI, ingredientsDataAPI, recipesDataAPI])
  .then(data => createDataInstances(data))
  // console.log("data", data)
}

const createDataInstances = (data) => {
  ingredientList = new Ingredient(data[1].ingredientsData);
  recipeList = new RecipeRepository(data[2].recipeData);
  userList = new UserRepository(data[0].usersData);
  user = getRandomUser(userList.userObjects);
  createRecipeList()
  // ingredientsDataFromApi = data[1].ingredientsData
  // recipeDataFromApi = data[2].recipeData
  // console.log('API', recipeDataFromApi)
  // console.log('original', recipeData)
}


const createRecipeList = () => {
  recipeList.recipe.forEach(recipe => {
    recipeButtonList.innerHTML += `<button class="recipe-list-button" id="${recipe.recipe.id}"><h3 class="recipe-titles">${recipe.recipe.name}</h3><img class="display-picture" src="${recipe.recipe.image}"></button>`
  })
};

const findRecipeId = (id) => {
  const filterRecipe = recipeList.recipe.find(recipe => {
    let stringifyId = recipe.recipe.id.toString()
    return stringifyId === id
  })
  // console.log(filterRecipe)
  return filterRecipe
}

const displayRecipe = (id, recipeElement, heartElement, rtcElement) => {
  const recipeInfo = findRecipeId(id);
  const getInstructions = recipeInfo.recipe.instructions.map(instruction => {
    return instruction.instruction;
  })
  recipeElement.innerHTML = '';
  recipeElement.innerHTML += `
  <h3 class="display-recipe-name">${recipeInfo.recipe.name}</h3>
  <p class="instructions">Cooking Directions: ${getInstructions}</p>
  <p class="ingredients">Ingredients: ${recipeInfo.getIngredient(ingredientList)}</p>
  <p class="cost">Cost: ${recipeInfo.calculateCost(ingredientList)}</p>
  `
  heartElement.innerHTML = '';
  heartElement.innerHTML += `<button class="heart-button" id=${recipeInfo.recipe.id}>&hearts;</button>`
  // if (user.favorites.includes(recipeInfo.recipe.id)) {
  //   heartButton.style.color = 'red';
  // }

  rtcElement.innerHTML = '';
  rtcElement.innerHTML += `<button class="addRecipeToCook-button" id=${recipeInfo.recipe.id}>+</button>`

  // changeHeartColor(recipeInfo.recipe.id);
  // console.log(recipeInfo.recipe.instructions);
}
// refactor to create get instructions function out of this function and call it here
const searchByTagOrName = (input) => {
  const searchTag = recipeList.filterTags(input);
  const searchName = recipeList.filterName(input);

  const getRecipeByTag = searchTag.map(taggedRecipe => {
    recipeButtonList.innerHTML = ''
    searchedRecipes.innerHTML += `<button class="recipe-list-button" id="${taggedRecipe.id}"><h3 class="recipe-titles">${taggedRecipe.name}</h3><img class="display-picture" src="${taggedRecipe.image}"></button>`
    // displayRecipe(taggedRecipe.id)
  })
  const getRecipeByName = searchName.map(namedRecipe => {
    recipeButtonList.innerHTML = ''
    searchedRecipes.innerHTML += `<button class="recipe-list-button" id="${namedRecipe.id}"><h3 class="recipe-titles">${namedRecipe.name}</h3><img class="display-picture" src="${namedRecipe.image}"></button>`
    // displayRecipe(namedRecipe.id)
  })
  showElement(clearSearchButton)
}

const showElement = (element) => {
  element.classList.remove('hidden');
};

const hideElement = (element) => {
  element.classList.add('hidden');
};

const createFavoritesList = () => {
  user.favorites.forEach(favorite => {
    favoritesButtonList.innerHTML += `<button class="favorites-list-button" id="${favorite.recipe.id}"><h3 class="favorite-recipe-titles">${favorite.recipe.name}</h3><img class="display-picture" src="${favorite.recipe.image}"></button>`
  })
};

const searchFavoritesByTagOrName = (input) => {
  const searchTag = user.filterFavoriteTags(input);
  const searchName = user.filterFavoriteNames(input);

  const getRecipeByTag = searchTag.map(taggedRecipe => {
    favoritesButtonList.innerHTML = ''
    searchedFavorites.innerHTML += `<button class="recipe-list-button" id="${taggedRecipe.recipe.id}">${taggedRecipe.recipe.name}</button>`
  })
  const getRecipeByName = searchName.map(namedRecipe => {
    favoritesButtonList.innerHTML = ''
    searchedFavorites.innerHTML += `<button class="recipe-list-button" id="${namedRecipe.recipe.id}">${namedRecipe.recipe.name}</button>`
  })
}

const createRecipesToCookList = () => {
  user.recipesToCook.forEach(recipe => {
    rtcButtonList.innerHTML += `<button class="rtc-list-button" id="${recipe.recipe.id}"><h3 class="rtc-titles">${recipe.recipe.name}</h3><img class="display-picture" src="${recipe.recipe.image}"></button>`
  })
};

// const changeHeartColor = (id) => {
//   const favorites = user.favoriteRecipe(id, recipeList)
//   console.log(user)
//   // return favorites;
//   //heartButton.style.color = 'red';
//
//   // push it to the array on click of the heart,
//   // run an if statement, if that recipe is in the array, change the heart to red
//
//   // find the ID of that recipe object and push it in
//   // if the ID that is passed in is equal to the
//   // pushing to favorites / invoking that method here
// }
// const alertError = () => {
//   window.alert("Search Again!");
// }

// error handling searches
  // we want an error message to show up when no recipes match the search (or array is empty?)
  /// function that checks to see if array is empty, then return window alert
// filter recipe by tag
// event listener for input within the search bar, whatever a user types is what we look up using the findTag method in RecipeRepository to then display the recipes it matches (list)

// favoriting / unfavoriting recipes
// when you click favorite button, the heart color should change to red (css styling) and push the recipe to the favorites array for that user (which we already have a method for: favoriteRecipe)
  // we want to only favorite the recipe that is clicked on
  // if this recipe is in this array, show it as red
// when a user clicks on the favorite recipe button, it should show the list of their favorite recipes


// ----------------- EVENT LISTENERS ----------------- //

// window.addEventListener('load', createRecipeList);
window.addEventListener('load', getApiData)

recipeButtonList.addEventListener('click', function(e) {
  let targetId = e.target.getAttribute('id')
  displayRecipe(targetId, viewRecipe, heartButton, addRecipesToCookButton)
  modal.style.display = "block";
})

close.addEventListener('click', (e) => {
  modal.style.display = "none";
})

heartButton.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id')
  user.favoriteRecipe(targetId, recipeList)
  event.target.style.color = 'red';
})

searchedRecipes.addEventListener('click', function(e) {
  let targetId = e.target.getAttribute('id')
  displayRecipe(targetId, viewRecipe, heartButton, addRecipesToCookButton)
  modal.style.display = "block";
})

searchInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    let inputValue = e.target.value;
    searchByTagOrName(inputValue);
  }
})

favoritesButton.addEventListener('click', (e) => {
  hideElement(mainPage)
  showElement(favoritesPage)
  favoritesButtonList.innerHTML = '';
  createFavoritesList()
})

favoritesButtonList.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id')
  displayRecipe(targetId, viewFavorite, favoritesHeartButton, favoritesRtcButton)
  favoriteModal.style.display = "block";
})

favoritesClose.addEventListener('click', (e) => {
  favoriteModal.style.display = "none";
  favoritesButtonList.innerHTML = '';
  createFavoritesList()
  searchedFavorites.innerHTML = "";
  favoritesSearchInput.value = "";
})

favoritesSearchInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    let inputValue = e.target.value;
    searchFavoritesByTagOrName(inputValue);
  }
})

searchedFavorites.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id')
  displayRecipe(targetId, viewFavorite, favoritesHeartButton, favoritesRtcButton)
  favoriteModal.style.display = "block";
})

homeButton.addEventListener('click', (e) => {
  hideElement(favoritesPage)
  showElement(mainPage)
  searchedFavorites.innerHTML = ""
})

clearSearchButton.addEventListener('click', (e) => {
  hideElement(clearSearchButton)
  createRecipeList()
  searchInput.value = ""
  // searchedRecipes.innerHTML = ""
})

// viewPantry.addEventListener('click', (e) => {
//   hideElement(mainPage)
//   showElement(pantryPage)
// })

pantryHomeButton.addEventListener('click', (e) => {
  hideElement(pantryPage)
  showElement(mainPage)
})

viewRtc.addEventListener('click', (e) => {
  hideElement(mainPage)
  showElement(rtcPage)
  rtcButtonList.innerHTML = '';
  createRecipesToCookList()
})

rtcHomeButton.addEventListener('click', (e) => {
  hideElement(rtcPage)
  showElement(mainPage)
})

addRecipesToCookButton.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id')
  user.addRecipesToCook(targetId, recipeList)
  // console.log(user.recipesToCook);
  event.target.style.color = 'red';
})

rtcButtonList.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id')
  displayRecipe(targetId, viewRecipesToCook, rtcHeartButton, rtcRtcButton)
  rtcModal.style.display = "block";
})

rtcClose.addEventListener('click', (e) => {
  rtcModal.style.display = "none";
})

favoritesHeartButton.addEventListener('click', (e) => {
  let targetId = e.target.getAttribute('id')
  user.unfavoriteRecipe(targetId)
  event.target.style.color = 'black';
})
