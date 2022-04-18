import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';
import { ingredientsData, pizzaRecipe, pastaRecipe, saladRecipe, pineapplePizzaRecipe } from './test-data'

describe('Recipe', () => {
  let recipe1, recipe2, ingredient1;

  beforeEach(() => {
      recipe1 = new Recipe(pizzaRecipe);
      recipe2 = new Recipe(pastaRecipe);
      ingredient1 = new Ingredient(ingredientsData)
  });

  it('should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of a Recipe', () => {
    expect(recipe1).to.be.an.instanceof(Recipe);
  });

  it('should be able to take in a recipe object', () => {
    expect(recipe1.recipe).to.equal(pizzaRecipe);
  });

  it('should be able to return the names of ingredients of a recipe', () => {
    expect(recipe1.getIngredient(ingredient1)).to.deep.equal('wheat flour, bicarbonate of soda');
    expect(recipe2.getIngredient(ingredient1)).to.deep.equal('bicarbonate of soda');
  });

  it('should be able to calculate the cost of recipe', () => {
    expect(recipe1.calculateCost(ingredient1)).to.equal('19.59');
    expect(recipe2.calculateCost(ingredient1)).to.equal('17.46');
  });

  it('should be able to return the instructions of a recipe', () => {
    expect(recipe1.getDirections()).to.deep.equal('In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy. Add egg and vanilla and mix until combined.');
    expect(recipe2.getDirections()).to.deep.equal('In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.');
  });
});
