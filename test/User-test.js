import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import RecipeRepository from '../src/classes/RecipeRepository';

describe('User', () => {
  let user, user1, recipeData, recipeRepository;

  beforeEach(() => {
    user = {
        name: "Saige O'Kon",
        id: 1,
        pantry: [
          {
            "ingredient": 11297,
            "amount": 4
          },
          {
            "ingredient": 1082047,
            "amount": 10
          }
        ]
      };
    recipeData = [
      {
        id: 1,
        tags: ['foo', 'baz', 'bat'],
        name: 'Pizza'
      },
      {
        id: 2,
        tags: ['hoop', 'baz', 'foo'],
        name: 'Pasta'
      },
      {
        id: 3,
        tags: ['hoop', 'baz', 'goop'],
        name: 'Salad'
      },
      {
        id: 4,
        tags: ['baz', 'tee', 'goop'],
        name: 'Pineapple Pizza'
      }
    ];
    recipeRepository = new RecipeRepository(recipeData);
    user1 = new User(user);
  });

  it('Should be a function', () => {
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
    expect(user1.favorites).to.deep.equal([{ recipe: { id: 2, tags: ['hoop', 'baz', 'foo'], name: 'Pasta' } }]);
  });

  it('should be able to unfavorite a recipe', () => {
    user1.favoriteRecipe("1", recipeRepository);
    user1.favoriteRecipe("2", recipeRepository);
    user1.unfavoriteRecipe(1);
    expect(user1.favorites).to.deep.equal([{ recipe: { id: 2, tags: ['hoop', 'baz', 'foo'], name: 'Pasta' } }]);
  });

  it('it should not be able to favorite a recipe more than once', () => {
    user1.favoriteRecipe("2", recipeRepository);
    user1.favoriteRecipe("2", recipeRepository);
    expect(user1.favorites).to.deep.equal([{ recipe: { id: 2, tags: ['hoop', 'baz', 'foo'], name: 'Pasta' } }]);
  });

  it('should be able to filter a favorited recipe by tag', () => {
    user1.favoriteRecipe("1", recipeRepository);
    user1.favoriteRecipe("2", recipeRepository);
    user1.favoriteRecipe("3", recipeRepository);
    expect(user1.filterFavoriteTags('hoop')).to.deep.equal([
      { recipe: { id: 2, tags: ['hoop', 'baz', 'foo'], name: 'Pasta' } },
      { recipe: { id: 3, tags: ['hoop', 'baz', 'goop'], name: 'Salad' } }
    ]);
  });

  it('should be able to filter a favorited recipe by tag', () => {
    user1.favoriteRecipe("1", recipeRepository);
    user1.favoriteRecipe("2", recipeRepository);
    user1.favoriteRecipe("4", recipeRepository);
    expect(user1.filterFavoriteNames('Pizza')).to.deep.equal([
      { recipe: { id: 1, tags: ['foo', 'baz', 'bat'], name: 'Pizza' } },
      { recipe: { id: 4, tags: ['baz', 'tee', 'goop'], name: 'Pineapple Pizza' } }
    ]);
  });

  it('should be able to add recipes that a user wants to cook to a list', () => {
    user1.addRecipesToCook("1", recipeRepository);
    expect(user1.recipesToCook).to.deep.equal([
      { recipe: { id: 1, tags: ['foo', 'baz', 'bat'], name: 'Pizza' } }]
    );
  });

  it(`should not be able to add duplicates of a recipe to cook`, () => {
    user1.addRecipesToCook("1", recipeRepository);
    user1.addRecipesToCook("1", recipeRepository);
    expect(user1.recipesToCook).to.deep.equal([
      { recipe: { id: 1, tags: ['foo', 'baz', 'bat'], name: 'Pizza' } }]
    );
  });
});
