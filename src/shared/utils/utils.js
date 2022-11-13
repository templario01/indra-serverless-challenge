const axios = require("axios");

const SWAPI_URL = "https://swapi.py4e.com/api";

const getData = async (url) => {
  const response = await axios.get(url);

  return response;
};

module.exports = {
  getData,
  SWAPI_URL,
};
