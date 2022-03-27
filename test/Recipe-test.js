import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';

describe('Recipe', () => {
  // variables
  let recipe;
  let recipe1;
  let recipe2;
  let recipe3;
  let recipe4;
  let ingredientsData;
  let ingredient1;

  beforeEach(() => {
    recipe1 =
      {
        id: 1,
        tag: ['foo', 'baz', 'bat'],
        name: 'Pizza',
        ingredients: [
          {
            id: 1,
            quantity: {
              amount: 1.5,
              unit: 'c'
            }
          },
          {
            id: 2,
            quantity: {
              amount: 3,
              unit: 'tsp'
            }
          }
        ]
      };
    recipe2 =
      {
        id: 2,
        tag: ['hoop', 'baz', 'foo'],
        name: 'Pasta',
        ingredients: [
          {
            id: 2,
            quantity: {
              amount: 3,
              unit: 'tsp'
            }
          }
        ]
      };
    recipe3 =
      {
        id: 3,
        tag: ['hoop', 'baz', 'goop'],
        name: 'Salad',
        ingredients: [
          {
            id: 3,
            quantity: {
              amount: 2,
              unit: 'Tbsp'
            }
          }
        ]
      };
    recipe4 =
      {
        id: 4,
        tag: ['baz', 'tee', 'goop'],
        name: 'Pineapple Pizza',
        ingredients: [
          {
            id: 4,
            quantity: {
              amount: 1,
              unit: 'c'
            }
          }
        ]
      };

      recipe = new Recipe(recipe1);

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
  })

  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of a Recipe', () => {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should be able to take in a recipe object', () => {
    expect(recipe.recipe).to.equal(recipe1);
  });

  it('should be able to return the names of ingredients of a recipe', () => {
    expect(recipe.getIngredient(ingredient1)).to.deep.equal(['wheat flour', 'bicarbonate of soda']);
  });

  it('should be able to calculate the cost of recipe', () => {
    expect(recipe.calculateCost(ingredient1)).to.equal(1959);
  })
});
