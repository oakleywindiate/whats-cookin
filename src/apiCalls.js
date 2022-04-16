const form = document.querySelector('#pantryForm');

const getFetch = (address) => {
  return fetch(`http://localhost:3001/api/v1/${address}`)
  .then(response => response.json())
  .catch((error) => {
    console.log("Error in retrieving data!");
  });
};

const addIngredients = (newIngredient) => {
  fetch("http://localhost:3001/api/v1/users", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newIngredient)
  })
  .then(response => response.json())
  .then(response => console.log(response));
  // .then(animal => addAnimalToPage(animal));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newIngredient = {
    userID: parseInt(formData.get('userId')),
    ingredientID: parseInt(formData.get('ingredientId')),
    ingredientModification: parseInt(formData.get('ingredientModification'))
  };
  console.log(newIngredient)
  addIngredients(newIngredient);
  e.target.reset();
  getFetch("users");
});

export {getFetch};
