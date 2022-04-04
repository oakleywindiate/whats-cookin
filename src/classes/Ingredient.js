class Ingredient {
  constructor(ingredientData) {
    this.ingredientData = ingredientData;
  }

  getIngredientName(id) {
    const findName = this.ingredientData.filter((ingredient) => ingredient.id === id);
    return findName[0].name;
  }

  getEstimatedCost(id) {
    const findCost = this.ingredientData.filter((ingredient) => ingredient.id === id);
    return findCost[0].estimatedCostInCents;
  }
};

export default Ingredient;
