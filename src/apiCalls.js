const getFetch = (address) => {
  return fetch(`http://localhost:3001/api/v1/${address}`)
  .then(response => response.json())
  .catch((error) => {
    console.log("Error in retrieving data!");
  });
};

export {getFetch};
