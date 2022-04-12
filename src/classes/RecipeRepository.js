import Recipe from './Recipe'

class RecipeRepository {
  constructor(recipeData) {
    this.recipeData = recipeData;
    this.recipe = this.createRecipes();
  }

  filterTags(tag) {
    const filterRecipeByTag = this.recipeData.filter(recipe => recipe.tags.includes(tag));
    return filterRecipeByTag;
  }

  filterName(name) {
    const filterRecipeByName = this.recipeData.filter(recipe => recipe.name.includes(name));
    return filterRecipeByName;
  }

  displayNames() {
    const displayRecipeName = this.recipeData.map(recipe => recipe.name);
    return displayRecipeName;
  }

  createRecipes() {
    const mapRecipe = this.recipeData.map(recipe => {
      const createClass = new Recipe(recipe);
      createClass.recipe.name = createClass.recipe.name.toLowerCase();
      return createClass;
    });
    return mapRecipe;
  }

  findRecipeById(id) {
    const filterRecipe = this.recipe.find(recipe => {
      let stringifyId = recipe.recipe.id.toString();
      return stringifyId === id;
    });
    return filterRecipe;
  }
};

export default RecipeRepository;
