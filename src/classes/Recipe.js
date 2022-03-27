class Recipe {
  constructor(recipe) {
    this.recipe = recipe;
  }

  getIngredient(ingredientsData) {
    const findIngredient = this.recipe.ingredients.map(ingredient => ingredientsData.getIngredientName(ingredient.id));
    return findIngredient
    };

  calculateCost(ingredientsData) {
    const getCost = this.recipe.ingredients.reduce((acc, ingredient) => {
      acc += ingredient.quantity.amount * ingredientsData.getEstimatedCost(ingredient.id)
      return acc
    }, 0)
    return getCost
  };
};

export default Recipe;
