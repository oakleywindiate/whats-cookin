import './styles.css';
import ingredientsData from './data/ingredients';
import recipeData from './data/recipes';
import usersData from './data/users';
import apiCalls from './apiCalls';
import RecipeRepository from './classes/RecipeRepository';
import Recipe from './classes/Recipe';
import Ingredient from './classes/Ingredient';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let recipeButtonList = document.querySelector('.recipe-list')

console.log('Hello world');

let ingredientList = new Ingredient(ingredientsData);
let recipeList = new RecipeRepository(recipeData);
let recipe1 = new Recipe(recipeList.recipeData[0])



// console.log(recipeList.displayNames())
// console.log(recipeList)
// console.log(recipeList.filterName("Baked Stuffed Artichokes"))
// console.log(recipeList.length)

// view list of all Recipies
// access recipe RecipeRepository
// iterate through array
// make a new button for each recipe




const createRecipeList = () => {
  const displayNames = recipeList.displayNames()
  displayNames.forEach(name => {
    console.log(name)
    recipeButtonList.innerHTML += `<button class="recipe-list-button">${name}</button>`
  })
}

// -------------- EVENT LISTENERS ----------------- //

window.addEventListener('load', createRecipeList)
