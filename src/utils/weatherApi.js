import * as constants from "./constants.js";

function fetchData() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${constants.LATITUDE}&lon=${constants.LONGITUDE}&units=imperial&appid=${constants.API_KEY}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Server returned ${res.status}`);
    }
  });
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
