import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';

describe('Recipe', () => {
  let recipe1, recipe2, pizzaRecipe, pastaRecipe, saladRecipe, pineapplePizzaRecipe, ingredientsData, ingredient1;

  beforeEach(() => {
    pizzaRecipe =
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
        ],
        instructions: [
          {
            "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
            "number": 1
          },
          {
            "instruction": "Add egg and vanilla and mix until combined.",
            "number": 2
          }
        ]
      };
    pastaRecipe =
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
        ],
        instructions: [
          {
            "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
            "number": 1
          }
        ]
      };
    saladRecipe =
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
        ],
        instructions: [
          {
            "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.",
            "number": 1
          }
        ]
      };
    pineapplePizzaRecipe =
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

      recipe1 = new Recipe(pizzaRecipe);
      recipe2 = new Recipe(pastaRecipe);

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
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of a Recipe', () => {
    expect(recipe1).to.be.an.instanceof(Recipe);
  });

  it('should be able to take in a recipe object', () => {
    expect(recipe1.recipe).to.equal(pizzaRecipe);
  });

  it('should be able to return the names of ingredients of a recipe', () => {
    expect(recipe1.getIngredient(ingredient1)).to.deep.equal(['wheat flour', 'bicarbonate of soda']);
    expect(recipe2.getIngredient(ingredient1)).to.deep.equal(['bicarbonate of soda']);
  });

  it('should be able to calculate the cost of recipe', () => {
    expect(recipe1.calculateCost(ingredient1)).to.equal(1959);
    expect(recipe2.calculateCost(ingredient1)).to.equal(1746);
  });

  it('should be able to return the instructions of a recipe', () => {
    expect(recipe1.getDirections()).to.deep.equal([
      {
        instruction: 'In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.',
        number: 1
      },
      {
        instruction: 'Add egg and vanilla and mix until combined.',
        number: 2
      }
    ]);
    expect(recipe2.getDirections()).to.deep.equal([
      {
        instruction: 'In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy.',
        number: 1
      }
    ]);
  });
});
