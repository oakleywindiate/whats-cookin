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
// let recipe1 = new Recipe(recipeList.recipeData[0])

console.log("recipeData", recipeList.recipeData)

// console.log(recipeList.displayNames())
// console.log(recipeList)
// console.log(recipeList.filterName("Baked Stuffed Artichokes"))
// console.log(recipeList.length)

// click on recipe for more information:
// crate event listener that listens for click
// function that uses logged id to do something


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
  console.log(filterRecipe)
  return filterRecipe
}

// displayRecipe()
// should be able to view:
// directions
// ingredients needed
// total cost

// directions dot notation Recipe
// ingredients -- Recipe(ingredientList)



// -------------- EVENT LISTENERS ----------------- //

window.addEventListener('load', createRecipeList);

recipeButtonList.addEventListener('click', function(e) {
  let targetId = e.target.getAttribute('id')
  findRecipeId(targetId)
})
