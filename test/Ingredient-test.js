import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';


describe('Ingredient', () => {
  // variables
  // let recipe;
  // let recipe1;
  // let recipe2;
  // let recipe3;
  // let recipe4;
  let ingredientsData;
  let ingredient1;

  beforeEach(() => {
    ingredientsData = [
        {
          "id": 1,
          "name": "wheat flour",
          "estimatedCostInCents": 142
        },
        {
          "id": 2,
          "name": "bicarbonate of soda",
          "estimatedCostInCents": 582
        },
        {
          "id": 3,
          "name": "eggs",
          "estimatedCostInCents": 472
        }
      ];

    ingredient1 = new Ingredient(ingredientsData)

  });

  it('Should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of a Ingredient', () => {
    expect(ingredient1).to.be.an.instanceof(Ingredient);
  });

  it('should be able to take in a ingredients data', () => {
    expect(ingredient1.ingredientData).to.equal(ingredientsData);
  })

  it('should return the name of an ingredient', () => {
    expect(ingredient1.getIngredientName(2)).to.deep.equal("bicarbonate of soda");
    expect(ingredient1.getIngredientName(3)).to.deep.equal("eggs");
  })

  it('should be able to return the estimated cost of ingredient', () => {
    expect(ingredient1.getEstimatedCost(2)).to.deep.equal(582);
    expect(ingredient1.getEstimatedCost(3)).to.deep.equal(472);
  })
});
