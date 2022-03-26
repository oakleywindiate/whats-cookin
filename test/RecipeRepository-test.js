import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';

describe('Recipe', () => {

  let recipeRepository1;
  let recipe1;
  let recipe2;
  let recipe3;

  beforeEach(() => {

    recipe1 = {
      id: 1,
      tag: ["foo", "baz", "bat"],
      name: "Pizza"
    };

    recipe2 = {
      id: 2,
      tag: ["hoop", "baz", "foo"],
      name: "Pasta"
    };

    recipe3 = {
      id: 3,
      tag: ["hoop", "baz", "goop"],
      name: "Salad"
    };

    recipeRepository1 = new RecipeRepository(recipe1)

  });


  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should be an instance of a RecipeRepository', () => {
    expect(recipeRepository1).to.be.an.instanceof(RecipeRepository);
  });

  it('should be able to take in a recipe', () => {
    expect(recipeRepository1.recipe).to.equal(recipe1);
    // expect(round2.deck).to.equal(deck2);
  })


})
