
require('dotenv').config();
const axios = require('axios');

const URL = 'https://api.openweathermap.org/data/2.5/weather';

const fetchWeather = async city => {
  try {
    const { data } = await axios.get(`${URL}?q=${city}&appid=${process.env.API_KEY}&units=metric`);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { fetchWeather };
