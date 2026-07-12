import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE, API_KEY } from "./constants.js";
import { request } from "./api.js";

function fetchData() {
  return request(
    `https://api.openweathermap.org/data/2.5/weather?lat=${DEFAULT_LATITUDE}&lon=${DEFAULT_LONGITUDE}&units=imperial&appid=${API_KEY}`,
  );
}

function cleanWeatherData(data) {
  return {
    location: data.name,
    temperature: {
      F: data.main.temp,
      C: Math.round(((data.main.temp - 32) * 5) / 9),
    },
  };
}

function getWeatherCondition(temp) {
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";
  return "cold";
}

export { fetchData, cleanWeatherData, getWeatherCondition };
