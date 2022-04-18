let user = {
    name: "Saige O'Kon",
    id: 1,
    pantry: [
      {
        "ingredient": 1,
        "amount": 4
      },
      {
        "ingredient": 2,
        "amount": 10
      }
    ]
  };

let usersData = [
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

let recipeData = [
  {
    id: 1,
    tags: ['foo', 'baz', 'bat'],
    name: 'Pizza',
    ingredients: [
      {
        id: 1,
        quantity: {amount: 1.5, unit: 'cups'}
      },
      {
        id: 2,
        quantity: {amount: 40, unit: 'tablespoon'}
      },
      {
        id: 4,
        quantity: {amount: 40, unit: 'tablespoon'}
      }
    ]
  },
  {
    id: 2,
    tags: ['hoop', 'baz', 'foo'],
    name: 'Pasta',
    ingredients: [
      {
        id: 3,
        quantity: {amount: 2, unit: 'cups'}
      },
      {
        id: 4,
        quantity: {amount: 1, unit: 'servings'}
      }
    ]
  },
  {
    id: 3,
    tags: ['hoop', 'baz', 'goop'],
    name: 'Salad',
    ingredients: [
      {
        id: 3,
        quantity: {amount: 2, unit: 'cups'}
      },
    ]
  },
  {
    id: 4,
    tags: ['baz', 'tee', 'goop'],
    name: 'Pineapple Pizza',
    ingredients: [
      {
        id: 5,
        quantity: {amount: 1, unit: 'cups'}
      },
    ]
  }
];

let ingredientsData = [
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
  },
  {
    "id": 4,
    "name": "sugar",
    "estimatedCostInCents": 16
  },
  {
    "id": 5,
    "name": "salt",
    "estimatedCostInCents": 10
  }
];

let pizzaRecipe =
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
  
let pastaRecipe =
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

let saladRecipe =
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

let pineapplePizzaRecipe =
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

export { user, usersData, recipeData, ingredientsData, pizzaRecipe, pastaRecipe, saladRecipe, pineapplePizzaRecipe };
