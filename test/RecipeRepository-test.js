import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from '../src/classes/Recipe';
import { recipeData } from './test-data'


describe('RecipeRepository', () => {
  let recipeRepository;

  beforeEach(() => {
    recipeRepository = new RecipeRepository(recipeData);
  });

  it('should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should be an instance of a RecipeRepository', () => {
    expect(recipeRepository).to.be.an.instanceof(RecipeRepository);
  });

  it('should be able to take in a recipe data set', () => {
    expect(recipeRepository.recipeData).to.equal(recipeData);
  });

  it('should be able to filter a recipe by tag and return recipe', () => {
    expect(recipeRepository.filterTags('hoop')).to.deep.equal([
      {
        id: 2,
        tags: [ 'hoop', 'baz', 'foo' ],
        name: 'pasta',
        ingredients: [
          {id: 3, quantity: {amount: 2, unit: 'cups'}},
          {id: 4, quantity: {amount: 1, unit: 'servings'}}
        ]
      },
      {
        id: 3,
        tags: [ 'hoop', 'baz', 'goop' ],
        name:'salad',
        ingredients: [
          {id: 3, quantity: {amount: 2, unit: 'cups'}}
        ]
      }
    ]);
  });

  it('should be able to filter a recipe by name and return recipe', () => {
    expect(recipeRepository.filterName('pizza')).to.deep.equal([
      {
        id: 1,
        tags: ['foo', 'baz', 'bat'],
        name: 'pizza',
        ingredients: [
          {id: 1, quantity: {amount: 1.5, unit: 'cups'}},
          {id: 2, quantity: {amount: 40, unit: 'tablespoon'}},
          {id: 4, quantity: {amount: 40, unit: 'tablespoon'}}
        ]
      },
      {
        id: 4,
        tags: ['baz', 'tee', 'goop'],
        name: 'pineapple pizza',
        ingredients: [{id: 5, quantity: {amount: 1, unit: 'cups'}}]
      }
    ]);
  });

  it('should be able to return a list of all the names of the recipes', () => {
    expect(recipeRepository.displayNames()).to.deep.equal(['pizza', 'pasta', 'salad', 'pineapple pizza']);
  });

  it('should be able to return a list of all the recipes', () => {
    expect(recipeRepository.createRecipes()).to.deep.equal([
      { recipe:
        { id: 1,
          tags: ['foo', 'baz', 'bat'],
          name: 'pizza',
          ingredients: [
            {id: 1, quantity: {amount: 1.5, unit: 'cups'}},
            {id: 2, quantity: {amount: 40, unit: 'tablespoon'}},
            {id: 4, quantity: {amount: 40, unit: 'tablespoon'}}
          ]}},
      { recipe:
        { id: 2,
          tags: ['hoop', 'baz', 'foo'],
          name: 'pasta',
          ingredients: [
            {id: 3, quantity: {amount: 2, unit: 'cups'}},
            {id: 4, quantity: {amount: 1, unit: 'servings'}}
          ]}},
      { recipe:
        { id: 3,
          tags: ['hoop', 'baz', 'goop'],
          name: 'salad', ingredients: [
            {id: 3, quantity: {amount: 2, unit: 'cups'}}
          ]}},
      { recipe:
        { id: 4,
          tags: ['baz', 'tee', 'goop'],
          name: 'pineapple pizza',
          ingredients: [
            {id: 5, quantity: {amount: 1, unit: 'cups'}}
          ]}}
    ]);
  });

  it('should hold instances of a Recipe class', () => {
    expect(recipeRepository.recipe[0]).to.be.an.instanceof(Recipe);
  });

  it('should be able to find a recipe by ID', () => {
    expect(recipeRepository.findRecipeById("1")).to.deep.equal(
      { recipe:
        { id: 1,
          tags: ['foo', 'baz', 'bat'],
          name: 'pizza',
          ingredients: [
            {id: 1, quantity: {amount: 1.5, unit: 'cups'}},
            {id: 2, quantity: {amount: 40, unit: 'tablespoon'}},
            {id: 4, quantity: {amount: 40, unit: 'tablespoon'}}
          ]
        }
      }
    );
  });
});
