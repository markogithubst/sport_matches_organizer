
require('dotenv').config();

const URL = 'https://api.openweathermap.org/data/2.5/weather';

const fetchWeather = async query => {
  const { data } = await fetch(URL, {
    params: {
      q: query,
      units: 'metric',
      APPID: process.env.API_KEY
    }
  });

  return data;
};

module.exports = { fetchWeather };
