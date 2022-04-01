import RecipeRepository from './RecipeRepository'

class User {
  constructor(userData) {
    this.userData = userData;
    this.favorites = [];
  };

  favoriteRecipe(id, recipeRepository) {
    this.favorites.push(recipeRepository.findRecipeById(id));
  }

  unfavoriteRecipe(id) {
    const unfavoriteIndex = this.favorites.findIndex(favoritedRecipe => {
      return favoritedRecipe.recipe.id === id
    })
    this.favorites.splice(unfavoriteIndex, 1);
  }

};

export default User;
