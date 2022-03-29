class RecipeRepository {
  constructor(recipeData) {
    this.recipeData = recipeData;
  };

  filterTags(tag) {
    const filterRecipeByTag = this.recipeData.filter(recipe => recipe.tags.includes(tag))
    return filterRecipeByTag
  };

  filterName(name) {
    const filterRecipeByName = this.recipeData.filter(recipe => recipe.name.includes(name))
    return filterRecipeByName
  };

  displayNames() {
    const displayRecipeName = this.recipeData.map(recipe => recipe.name)
    return displayRecipeName
  };

  //As a user, I should be able to view a list of all recipes.
    //display all the recipes from RecipeRepository
    //just the names



};

export default RecipeRepository;
