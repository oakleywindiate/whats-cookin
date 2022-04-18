import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';
import { ingredientsData } from './test-data'


describe('Ingredient', () => {
  let ingredient1;

  beforeEach(() => {
    ingredient1 = new Ingredient(ingredientsData)
  });

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of an Ingredient', () => {
    expect(ingredient1).to.be.an.instanceof(Ingredient);
  });

  it('should be able to take in a ingredients data', () => {
    expect(ingredient1.ingredientData).to.equal(ingredientsData);
  });

  it('should return the name of an ingredient', () => {
    expect(ingredient1.getIngredientName(2)).to.deep.equal("bicarbonate of soda");
    expect(ingredient1.getIngredientName(3)).to.deep.equal("eggs");
  });

  it('should be able to return the estimated cost of ingredient', () => {
    expect(ingredient1.getEstimatedCost(2)).to.deep.equal(582);
    expect(ingredient1.getEstimatedCost(3)).to.deep.equal(472);
  });
});
