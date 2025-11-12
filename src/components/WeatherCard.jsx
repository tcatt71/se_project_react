function WeatherCard({ temperature }) {
  return (
    <div className="weather-card">
      {typeof temperature === "number" && (
        <div className="weather-card__temperature">
          {Math.trunc(temperature)}&deg;F
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
