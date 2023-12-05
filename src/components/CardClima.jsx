import React from "react";

const CardClima = ({data}) => {
  return (
    <div className="card">
      <h5>{data.weather[0].description}</h5>
      <img
        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
      ></img>
      <p>{data.main.temp} °C</p>
      <p>Veloc. del viento: {data.wind.speed} m/s</p>
    </div>
  );
};

export default CardClima;
