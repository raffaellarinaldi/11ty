const axios = require("axios").default;

module.exports = async () => {
  const response = await axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/posts'
  })
  .then(response => {
    console.log(response.data);
    return response.data
  })
  .catch(error => {
  })
  return response ? response : []
};
