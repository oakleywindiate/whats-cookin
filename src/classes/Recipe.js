class Recipe {
  constructor(recipe) {
    this.recipe = recipe;
  }

  getIngredient(ingredientsData) {
    const findIngredient = this.recipe.ingredients.map(ingredient => ingredientsData.getIngredientName(ingredient.id));
    return findIngredient.join(', ');
  }

  calculateCost(ingredientsData) {
    const getCost = this.recipe.ingredients.reduce((acc, ingredient) => {
      acc += ingredient.quantity.amount * ingredientsData.getEstimatedCost(ingredient.id);
      return acc;
    }, 0);
    return (getCost / 100).toFixed(2);
  }

  getDirections() {
    const getInstructions = this.recipe.instructions.map(instruction => {
    return instruction.instruction;
    });
    return getInstructions.join(' ');
  }
};

export default Recipe;
