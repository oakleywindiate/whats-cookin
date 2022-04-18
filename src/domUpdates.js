// ----------------- IMPORTS ----------------- //

import {showElement, hideElement, viewRecipesToCook, recipeList, recipeButtonList, findRecipeId, ingredientList, userList, user, refreshPantry, pantryList, rtcButtonList, favoritesButtonList, searchedRecipes, clearSearchButton, searchedFavorites} from './scripts.js';

// ----------------- FUNCTIONS ----------------- //

const displayPantryIngredients = () => {
  let pantryData = user.getPantryInfo(ingredientList);
  pantryList.innerHTML = "";
  pantryData.forEach(ingredient => {
    pantryList.innerHTML += `
      <li class="pantry-ingredient-info">
        <h3 class="pantry-ingredient-title">${ingredient.name}</h3>
        <p class="pantry-ingredient-amount">Amount: ${ingredient.amount}</p>
      </li>`
  });
};

const createRecipeList = () => {
  recipeList.recipe.forEach(recipe => {
    recipeButtonList.innerHTML += `
      <button class="recipe-list-button" id="${recipe.recipe.id}">
      <h2 class="recipe-titles">${recipe.recipe.name}</h2>
      <img class="display-picture" src="${recipe.recipe.image}" alt="${recipe.recipe.name}">
      </button>`;
  });
};

const displayRecipe = (id, recipeElement, heartElement, rtcElement) => {
  const recipeInfo = findRecipeId(id);
  recipeElement.innerHTML = '';
  recipeElement.innerHTML += `
    <h2 class="display-recipe-name">${recipeInfo.recipe.name}</h2>
    <p class="instructions">Cooking Directions: ${recipeInfo.getDirections()}</p>
    <p class="ingredients">Ingredients: ${recipeInfo.getIngredient(ingredientList)}</p>
    <p class="cost">Cost: $${recipeInfo.calculateCost(ingredientList)}</p>`;
  heartElement.innerHTML = '';
  heartElement.innerHTML += `<button class="heart-button" id=${recipeInfo.recipe.id}>&hearts;</button>`;
  rtcElement.innerHTML = '';
  rtcElement.innerHTML += `<button class="addRecipeToCook-button" id=${recipeInfo.recipe.id}>+</button>`;
};

const checkPantryInfo = (recipeId, recipeRepository, ingredientData) => {
  const ingredientsNeeded = user.determineIngredientsNeeded(recipeId, recipeRepository, ingredientData);
  if (ingredientsNeeded.length) {
    viewRecipesToCook.innerHTML += `
    <p class="ingredients-needed">Oops! You don't have enough ingredients to cook this meal 😭 You need ${ingredientsNeeded.join(', ')}.</p>`
  } else {
    viewRecipesToCook.innerHTML += `<button class="cook-recipe-button" id=${recipeId}>COOK RECIPE</button>`
  };
};

const searchByTagOrName = (input) => {
  const searchTag = recipeList.filterTags(input);
  const searchName = recipeList.filterName(input);
  searchedRecipes.innerHTML = '';
  recipeButtonList.innerHTML = '';
  const getRecipeByTag = searchTag.map(taggedRecipe => {
    searchedRecipes.innerHTML += `
      <button class="recipe-list-button" id="${taggedRecipe.id}">
      <h2 class="recipe-titles">${taggedRecipe.name}</h2>
      <img class="display-picture" src="${taggedRecipe.image}" alt="${taggedRecipe.name}">
      </button>`
  });
  const getRecipeByName = searchName.map(namedRecipe => {
    recipeButtonList.innerHTML = '';
    searchedRecipes.innerHTML += `
      <button class="recipe-list-button" id="${namedRecipe.id}">
      <h2 class="recipe-titles">${namedRecipe.name}</h2>
      <img class="display-picture" src="${namedRecipe.image}" alt="${namedRecipe.name}">
      </button>`;
  });
  if (searchTag.length === 0 && searchName.length === 0) {
    searchedRecipes.innerHTML += `<p class="search-error">No recipes matched your search!</p>`
  };
  showElement(clearSearchButton);
};

const createFavoritesList = () => {
  user.favorites.forEach(favorite => {
    favoritesButtonList.innerHTML += `
      <button class="favorites-list-button" id="${favorite.recipe.id}">
      <h2 class="favorite-recipe-titles">${favorite.recipe.name}</h2>
      <img class="display-picture" src="${favorite.recipe.image}" alt="${favorite.recipe.name}">
      </button>`;
  });
};

const searchFavoritesByTagOrName = (input) => {
  const searchTag = user.filterFavoriteTags(input);
  const searchName = user.filterFavoriteNames(input);
  const getRecipeByTag = searchTag.map(taggedRecipe => {
    favoritesButtonList.innerHTML = '';
    searchedFavorites.innerHTML += `
      <button class="recipe-list-button" id="${taggedRecipe.recipe.id}">
      <h2 class="favorite-recipe-titles">${taggedRecipe.recipe.name}</h2>
      <img class="display-picture" src="${taggedRecipe.recipe.image}" alt="${taggedRecipe.recipe.name}">
      </button>`;
  });
  const getRecipeByName = searchName.map(namedRecipe => {
    favoritesButtonList.innerHTML = '';
    searchedFavorites.innerHTML += `
      <button class="recipe-list-button" id="${namedRecipe.recipe.id}">
      <h2 class="favorite-recipe-titles">${namedRecipe.recipe.name}</h2>
      <img class="display-picture" src="${namedRecipe.recipe.image}" alt="${namedRecipe.recipe.name}">
      </button>`;
  });
  if (searchTag.length === 0 && searchName.length === 0) {
    searchedFavorites.innerHTML += `<p class="search-error">No recipes matched your search!</p>`
  };
};

const createRecipesToCookList = () => {
  user.recipesToCook.forEach(recipe => {
    rtcButtonList.innerHTML += `
      <button class="rtc-list-button" id="${recipe.recipe.id}">
      <h2 class="rtc-titles">${recipe.recipe.name}</h2>
      <img class="display-picture" src="${recipe.recipe.image}" alt="${recipe.recipe.name}">
      </button>`;
  });
};

// ----------------- EXPORTS ----------------- //

 export {viewRecipesToCook, displayPantryIngredients, createRecipeList, displayRecipe, checkPantryInfo, searchByTagOrName, createFavoritesList, searchFavoritesByTagOrName, createRecipesToCookList};
