const getFetch = (address) => {
  return fetch(`https://what-s-cookin-starter-kit.herokuapp.com/api/v1/${address}`)
  .then(response => response.json())
  .catch((error) => {
    console.log("Error in retrieving data!");
  });
};

export {getFetch};
