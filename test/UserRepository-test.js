import { expect } from 'chai';
import UserRepository from '../src/classes/UserRepository';
import User from '../src/classes/User';

describe('UserRepository', () => {

  let usersData;
  let users;

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
          }
        ]
      },
    ];

    users = new UserRepository(usersData);

  });

  it('Should be a function', () => {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of a UserRepository', () => {
    expect(users).to.be.an.instanceof(UserRepository);
  });

  it('should be able to take in a user data set', () => {
    expect(users.userData).to.equal(usersData);
  })

  it('should be able to return a list of all the users', () => {
    expect(users.createUsers()).to.deep.equal([
  {
    favorites: [],
    recipesToCook: [],
    userData: { name: "Saige O'Kon", id: 1, pantry: [
    {
      "ingredient": 11297,
      "amount": 4
    },
    {
      "ingredient": 1082047,
      "amount": 10
    }
  ] } },
  {
    favorites: [],
    recipesToCook: [],
    userData: { name: 'Ephraim Goyette', id: 2, pantry: [{
      "ingredient": 6150,
      "amount": 3
    },
    {
      "ingredient": 1032009,
      "amount": 7
    }] }
  },
  {
    favorites: [],
    recipesToCook: [],
    userData: { name: 'Nelda Bosco', id: 3, pantry: [          {
      "ingredient": 1009159,
      "amount": 3
    },
    {
      "ingredient": 19335,
      "amount": 10
    }] }
  }
]);
  });

  it('should hold instances of a User class', () => {
    expect(users.userObjects[0]).to.be.an.instanceof(User);
  });

})
