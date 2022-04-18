import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import RecipeRepository from '../src/classes/RecipeRepository';
import Ingredient from '../src/classes/Ingredient';
import { user, recipeData, ingredientsData } from './test-data'

describe('User', () => {
  let user1, recipeRepository, ingredientData;

  beforeEach(() => {
    recipeRepository = new RecipeRepository(recipeData);
    user1 = new User(user);
    ingredientData = new Ingredient(ingredientsData)
  });

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of a User', () => {
    expect(user1).to.be.an.instanceof(User);
  });

  it('should be able to take in a user data set', () => {
    expect(user1.userData).to.equal(user);
  });

  it('should be able to favorite a recipe', () => {
    user1.favoriteRecipe("2", recipeRepository);
    expect(user1.favorites).to.deep.equal([{ recipe: { id: 2, tags: ['hoop', 'baz', 'foo'], name: 'pasta', ingredients: [{ id: 3, quantity: { amount: 2, unit: 'cups' } },
      { id: 4, quantity: { amount: 1, unit: 'servings' } }] } }]);
  });

  it('should be able to unfavorite a recipe', () => {
    user1.favoriteRecipe("1", recipeRepository);
    user1.favoriteRecipe("2", recipeRepository);
    user1.unfavoriteRecipe("1");
    expect(user1.favorites).to.deep.equal([{ recipe: { id: 2, tags: ['hoop', 'baz', 'foo'], name: 'pasta', ingredients: [{ id: 3, quantity: { amount: 2, unit: 'cups' } },
      { id: 4, quantity: { amount: 1, unit: 'servings' } }] } }]);
  });

  it('should not be able to favorite a recipe more than once', () => {
    user1.favoriteRecipe("2", recipeRepository);
    user1.favoriteRecipe("2", recipeRepository);
    expect(user1.favorites).to.deep.equal([{ recipe: { id: 2, tags: ['hoop', 'baz', 'foo'], name: 'pasta', ingredients: [{ id: 3, quantity: { amount: 2, unit: 'cups' } },
      { id: 4, quantity: { amount: 1, unit: 'servings' } }] } }]);
  });

  it('should be able to filter a favorited recipe by tag', () => {
    user1.favoriteRecipe("1", recipeRepository);
    user1.favoriteRecipe("2", recipeRepository);
    user1.favoriteRecipe("3", recipeRepository);
    expect(user1.filterFavoriteTags('hoop')).to.deep.equal([
      { recipe: { id: 2, tags: ['hoop', 'baz', 'foo'], name: 'pasta', ingredients: [{ id: 3, quantity: { amount: 2, unit: 'cups' } },
        { id: 4, quantity: { amount: 1, unit: 'servings' } }] } },
      { recipe: { id: 3, tags: ['hoop', 'baz', 'goop'], name: 'salad', ingredients: [{ id: 3, quantity: { amount: 2, unit: 'cups' } }]} }
    ]);
  });

  it('should be able to filter a favorited recipe by name', () => {
    user1.favoriteRecipe("1", recipeRepository);
    user1.favoriteRecipe("2", recipeRepository);
    user1.favoriteRecipe("4", recipeRepository);
    expect(user1.filterFavoriteNames('pizza')).to.deep.equal([
      { recipe: { id: 1, tags: ['foo', 'baz', 'bat'], name: 'pizza', ingredients: [ { id: 1, quantity: { amount: 1.5, unit: 'cups' } },
        { id: 2, quantity: { amount: 40, unit: 'tablespoon' } },
        { id: 4, quantity: { amount: 40, unit: 'tablespoon' } }] } },
      { recipe: { id: 4, tags: ['baz', 'tee', 'goop'], name: 'pineapple pizza', ingredients: [{ id: 5, quantity: { amount: 1, unit: 'cups' } }]} }
    ]);
  });

  it('should be able to add recipes that a user wants to cook to a list', () => {
    user1.addRecipesToCook("1", recipeRepository);
    expect(user1.recipesToCook).to.deep.equal([
      { recipe: { id: 1, tags: ['foo', 'baz', 'bat'], name: 'pizza', ingredients: [ { id: 1, quantity: { amount: 1.5, unit: 'cups' } },
        { id: 2, quantity: { amount: 40, unit: 'tablespoon' } },
        { id: 4, quantity: { amount: 40, unit: 'tablespoon' } }] } }
    ]);
  });

  it('should not be able to add duplicates of a recipe to cook', () => {
    user1.addRecipesToCook("1", recipeRepository);
    user1.addRecipesToCook("1", recipeRepository);
    expect(user1.recipesToCook).to.deep.equal([
      { recipe: { id: 1, tags: ['foo', 'baz', 'bat'], name: 'pizza', ingredients: [ { id: 1, quantity: { amount: 1.5, unit: 'cups' } },
        { id: 2, quantity: { amount: 40, unit: 'tablespoon' } },
        { id: 4, quantity: { amount: 40, unit: 'tablespoon' } }] } }
    ]);
  });

  it('should create a list of ingredients in a users pantry', () => {
    user1.getPantryInfo(ingredientData);
    expect(user1.getPantryInfo(ingredientData)).to.deep.equal([
      {
      "amount": 4,
       "name": "wheat flour"
     },
     {
      "amount": 10,
       "name": "bicarbonate of soda"
    }]);
  });

  it('should be able to determine ingredients needed from a users pantry to cook a recipe', () => {
    expect(user1.determineIngredientsNeeded("1", recipeRepository, ingredientData)).to.deep.equal(['bicarbonate of soda', 'sugar']);
    expect(user1.determineIngredientsNeeded("4", recipeRepository, ingredientData)).to.deep.equal(['salt']);
  });
});
