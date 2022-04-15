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
    this.favorites.splice(unfavoriteIndex, 1);
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

  determineAmountOfIngredients(recipeId, recipeRepository) {
    const ingredientsNeeded = [];
    const recipeObj = recipeRepository.findRecipeById(recipeId).recipe.ingredients
    const pantryData = this.userData.pantry.map(pantry => pantry.ingredient)
    const pantryAmount = this.userData.pantry.map(pantry => pantry.amount)
    console.log("pantryAmount", pantryAmount)
    // if the ids match each favoritesHeartButton
    const compareIngredientId = recipeObj.filter(ingredient => pantryData.includes(ingredient.id))
    const compareIngredientAmt = compareIngredientId.forEach(ingredient => {
      console.log(this.userData.pantry)
      console.log("pantryData", pantryData)
      if (ingredient.quantity.amount > pantryData) {
        ingredientsNeeded.push(ingredient)
      }
    })
    console.log("ing", ingredientsNeeded)
    // see if ingedients match
    // pass in id
    // if recipesToCook.includes(name)
    // determing if recipes in RTC if (!ingredient) {
    // return get this ingredient and cant cook it('
    // if it is in there then compare
    // pantry.amount > recipesToCook.amount
    // if left is larger than right allow to cook
    // return "you don't have enough to cook this" message box injected
    // grey out button
    // end result = an array of ingredients that the user does not have enough of
    }
};

export default User;
