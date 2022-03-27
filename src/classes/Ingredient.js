class Ingredient {
  constructor(ingredientData) {
    this.ingredientData = ingredientData;
  }

  getIngredientName(id) {
    const findName = this.ingredientData.filter((ingredient) => ingredient.id === id);
    return findName[0].name;
  }

  // input - array of objects: id, name, cost
  // output - return name (string)
  //create a method that iterates through the ingredients array and returns the name associated with the ID passed in
    // call this method in the recipe class and compare if IDs match,
};


export default Ingredient;
