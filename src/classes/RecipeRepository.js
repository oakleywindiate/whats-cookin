class RecipeRepository {
  constructor(recipeData) {
    this.recipeData = recipeData;
  }

  filterTag(tag) {
    const filterRecipeByTag = this.recipeData.filter(recipe => recipe.tag.includes(tag))
    return filterRecipeByTag
  }

  filterName() {

  }
  
}

export default RecipeRepository;
