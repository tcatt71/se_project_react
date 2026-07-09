import { LATITUDE, LONGITUDE, API_KEY } from "./constants.js";
import { request } from "./api.js";

function fetchData() {
  return request(
    `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&units=imperial&appid=${API_KEY}`,
  );
}

function getWeatherCondition(temp) {
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";
  return "cold";
}

export { fetchData, getWeatherCondition };
