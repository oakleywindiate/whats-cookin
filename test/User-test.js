import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import RecipeRepository from '../src/classes/RecipeRepository';

describe('User', () => {

  let usersData;
  let users;
  // let pizzaRecipe;
  // let recipe1;
  let recipeData;
  let recipeRepository;

  beforeEach(() => {

    usersData = [
      {
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
      },
      {
        name: "Ephraim Goyette",
        id: 2,
        pantry: [
          {
            "ingredient": 6150,
            "amount": 3
          },
          {
            "ingredient": 1032009,
            "amount": 7
          }
        ]
      },
      {
        name: "Nelda Bosco",
        id: 3,
        pantry: [
          {
            "ingredient": 1009159,
            "amount": 3
          },
          {
            "ingredient": 19335,
            "amount": 10
          },
        ]
      },
    ];

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
    ]

    recipeRepository = new RecipeRepository(recipeData);
    users = new User(usersData, recipeRepository);

  });

  it('Should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of a RecipeRepository', () => {
    expect(users).to.be.an.instanceof(User);
  });

  it('should be able to take in a recipe data set', () => {
    expect(users.userData).to.equal(usersData);
  })


  it('should be able to favorite a recipe', () => {
    users.favoriteRecipe("2", recipeRepository)
    expect(users.favorites).to.deep.equal([{ recipe: { id: 2, tags: ['hoop', 'baz', 'foo'], name: 'Pasta' } }]);
  })

  it('should be able to unfavorite a recipe', () => {
    users.favoriteRecipe("1", recipeRepository)
    users.favoriteRecipe("2", recipeRepository)
    console.log('2 favorited recipes', users.favorites)
    users.unfavoriteRecipe(1)
    console.log('deleted recipe 2',users.favorites)
    expect(users.favorites).to.deep.equal([{ recipe: { id: 2, tags: ['hoop', 'baz', 'foo'], name: 'Pasta' } }]);
  })

})
