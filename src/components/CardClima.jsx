import React from "react";

const CardClima = ({data}) => {
    console.log(data);
    const day = () => {
        const opciones = { weekday: 'long' };
        const fechaObj = new Date(data.dt_txt);
        const nombreDia = fechaObj.toLocaleDateString('es-ES', opciones);

        return nombreDia;
    }
  return (
    <div className="card">
      <h2>{day()}</h2>
      <h3>{data.weather[0].description}</h3>
      <img
        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
      ></img>
      <p>{data.main.temp} °C</p>
      <p>Veloc. del viento: {data.wind.speed} m/s</p>
    </div>
  );
};

export default CardClima;
