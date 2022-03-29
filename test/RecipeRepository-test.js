import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';

describe('RecipeRepository', () => {

  let recipeRepository, recipeData;

  beforeEach(() => {

  recipeData = [
    {
      id: 1,
      tag: ['foo', 'baz', 'bat'],
      name: 'Pizza'
    },
    {
      id: 2,
      tag: ['hoop', 'baz', 'foo'],
      name: 'Pasta'
    },
    {
      id: 3,
      tag: ['hoop', 'baz', 'goop'],
      name: 'Salad'
    },
    {
      id: 4,
      tag: ['baz', 'tee', 'goop'],
      name: 'Pineapple Pizza'
    }
  ]

    recipeRepository = new RecipeRepository(recipeData);

  });


  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('should be an instance of a RecipeRepository', () => {
    expect(recipeRepository).to.be.an.instanceof(RecipeRepository);
  });

  it('should be able to take in a recipe data set', () => {
    expect(recipeRepository.recipeData).to.equal(recipeData);
  })

  it('should be able to filter a recipe by tag and return recipe', () => {
    expect(recipeRepository.filterTag('hoop')).to.deep.equal([
      { id: 2, tag: [ 'hoop', 'baz', 'foo' ], name: 'Pasta' },
      { id: 3, tag: [ 'hoop', 'baz', 'goop' ], name:'Salad'}
    ]);
  })

  it('should be able to filter a recipe by name and return recipe', () => {
    expect(recipeRepository.filterName('Pizza')).to.deep.equal([
      {
        id: 1,
        tag: ['foo', 'baz', 'bat'],
        name: 'Pizza'
      },
      {
        id: 4,
        tag: ['baz', 'tee', 'goop'],
        name: 'Pineapple Pizza'
      }
    ]);
  })

  it('should be able to return a list of all the recipes', () => {
    expect(recipeRepository.displayNames()).to.deep.equal(['Pizza', 'Pasta', 'Salad', 'Pineapple Pizza']);
  })

})
