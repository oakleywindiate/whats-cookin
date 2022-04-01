import './styles.css';
import ingredientsData from './data/ingredients';
import recipeData from './data/recipes';
import usersData from './data/users';
import apiCalls from './apiCalls';
import RecipeRepository from './classes/RecipeRepository';
import Recipe from './classes/Recipe';
import Ingredient from './classes/Ingredient';
import UserRepository from './classes/UserRepository';
import User from './classes/User';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let recipeButtonList = document.querySelector('.recipe-list')
let viewRecipe = document.querySelector('.display-recipe-object')
let searchInput = document.querySelector('.search-input')
let inputValue = document.querySelector('.search-input').value;
let searchedRecipes = document.querySelector('.display-searched-recipes')
let modal = document.querySelector('.modal')
let close = document.querySelector('.close')
let heartButton = document.querySelector('.heart-button')

let ingredientList = new Ingredient(ingredientsData);
let recipeList = new RecipeRepository(recipeData);
let userList = new UserRepository(usersData);

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

let user = getRandomUser(userList.userObjects);

// function getRandomElement(array) {
//   return array[Math.floor(Math.random() * array.length)];
// };

const createRecipeList = () => {
  recipeList.recipe.forEach(recipe => {
    recipeButtonList.innerHTML += `<button class="recipe-list-button" id="${recipe.recipe.id}">${recipe.recipe.name}</button>`
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

const displayRecipe = (id) => {
  const recipeInfo = findRecipeId(id);
  const getInstructions = recipeInfo.recipe.instructions.map(instruction => {
    return instruction.instruction;
  })
  viewRecipe.innerHTML = '';
  viewRecipe.innerHTML += `
  <h3 class="display-recipe-name">${recipeInfo.recipe.name}</h3>
  <p class="instructions">${getInstructions}</p>
  <p class="ingredients">${recipeInfo.getIngredient(ingredientList)}</p>
  <p class="cost">${recipeInfo.calculateCost(ingredientList)}</p>
  `
  // console.log(recipeInfo.recipe.instructions);
}
// refactor to create get instructions function out of this function and call it here
const searchByTagOrName = (input) => {
  const searchTag = recipeList.filterTags(input);
  const searchName = recipeList.filterName(input);

  const getRecipeByTag = searchTag.map(taggedRecipe => {
    searchedRecipes.innerHTML += `<button class="recipe-list-button" id="${taggedRecipe.id}">${taggedRecipe.name}</button>`
  })
  const getRecipeByName = searchName.map(namedRecipe => {
    searchedRecipes.innerHTML += `<button class="recipe-list-button" id="${namedRecipe.id}">${namedRecipe.name}</button>`
  })
}

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
// when a user clicks on the favorite recipe button, it should show the list of their favorite recipes


// -------------- EVENT LISTENERS ----------------- //

window.addEventListener('load', createRecipeList);

recipeButtonList.addEventListener('click', function(e) {
  let targetId = e.target.getAttribute('id')
  displayRecipe(targetId)
  modal.style.display = "block";
})

close.addEventListener('click', (e) => {
  modal.style.display = "none";
})

heartButton.addEventListener('click', (e) => {
  heartButton.style.color = 'red';

})

searchedRecipes.addEventListener('click', function(e) {
  let targetId = e.target.getAttribute('id')
  displayRecipe(targetId)
})

searchInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    let inputValue = e.target.value;
    //console.log(inputValue)
    searchByTagOrName(inputValue);
  }
})

// if it includes tag or name, use OR (3 times for error?)
