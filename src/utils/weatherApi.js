import * as constants from "./constants.js";
import { request } from "./api.js";

function fetchData() {
  return request(
    `https://api.openweathermap.org/data/2.5/weather?lat=${constants.LATITUDE}&lon=${constants.LONGITUDE}&units=imperial&appid=${constants.API_KEY}`,
  );
}

function getWeatherCondition(temp) {
  if (temp >= 86) {
    return "hot";
  } else if (temp < 86 && temp >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}

export { fetchData, getWeatherCondition };
