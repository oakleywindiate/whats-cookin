class RecipeRepository {
  constructor(recipeData) {
    this.recipeData = recipeData;
  };

  filterTag(tag) {
    const filterRecipeByTag = this.recipeData.filter(recipe => recipe.tag.includes(tag))
    return filterRecipeByTag
  };

  filterName(name) {
    const filterRecipeByName = this.recipeData.filter(recipe => recipe.name.includes(name))
    return filterRecipeByName
  };

};

export default RecipeRepository;
