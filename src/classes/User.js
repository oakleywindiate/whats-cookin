import RecipeRepository from './RecipeRepository'
import Ingredient from './Ingredient'

class User {
  constructor(userData) {
    this.userData = userData;
    this.favorites = [];
    this.recipesToCook = [];
  }

  favoriteRecipe(id, recipeRepository) {
    const recipeObject = recipeRepository.findRecipeById(id);
    if (!this.favorites.includes(recipeObject)) {
      this.favorites.push(recipeRepository.findRecipeById(id));
    };
  }

  unfavoriteRecipe(id) {
    const unfavoriteIndex = this.favorites.findIndex(favoritedRecipe => {
      return favoritedRecipe.recipe.id === id;
    });
    this.favorites.splice((unfavoriteIndex - 1), 1);
  }

  filterFavoriteTags(tag) {
    const filterFavoriteByTag = this.favorites.filter(favorite =>
      favorite.recipe.tags.includes(tag));
    return filterFavoriteByTag;
  }

  filterFavoriteNames(name) {
    const filterFavoriteRecipesByName = this.favorites.filter(favorite => favorite.recipe.name.includes(name));
    return filterFavoriteRecipesByName;
  }

  addRecipesToCook(id, recipeRepository) {
    const recipeObject = recipeRepository.findRecipeById(id);
    if (!this.recipesToCook.includes(recipeObject)) {
      this.recipesToCook.push(recipeRepository.findRecipeById(id));
    };
  }

  getPantryInfo(ingredientData) {
    const pantryList = this.userData.pantry.map(ingredient => {
      return {
        name: ingredientData.getIngredientName(ingredient.ingredient),
        amount: ingredient.amount
      }
    })
    return pantryList
  }

  determineIngredientsNeeded(recipeId, recipeRepository, ingredientData) {
    const ingredientsNeededById = [];
    const recipeObj = recipeRepository.findRecipeById(recipeId).recipe.ingredients
    const pantryData = this.userData.pantry.map(pantry => pantry.ingredient)

    this.userData.pantry.forEach(pantryIngredient => {
      recipeObj.forEach(recipeIngredient => {
        if ((pantryIngredient.ingredient === recipeIngredient.id) && (pantryIngredient.amount < recipeIngredient.quantity.amount)) {
          ingredientsNeededById.push(recipeIngredient.id)
        }
      })
    })

    recipeObj.forEach(recipeIngredient => {
      if (!pantryData.includes(recipeIngredient.id)) {
        ingredientsNeededById.push(recipeIngredient.id)
      }
    })

    const ingredientsNeededByName = ingredientsNeededById.map(ingredientId => {
      return ingredientData.getIngredientName(ingredientId)
    })

    return ingredientsNeededByName
  }
};


export default User;
