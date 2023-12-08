import tempMin from '../assets/img/tempMin.svg'
import tempMax from '../assets/img/tempMax.svg'
import humedad from '../assets/img/humedad.svg'
import viento from '../assets/img/viento.png'
const CardClima = ({data}) => {
  // sacar el dia solo con la fecha
    const day = () => {
        const opciones = { weekday: 'long' };
        const fechaObj = new Date(data.dt_txt);
        const nombreDia = fechaObj.toLocaleDateString('es-ES', opciones);
        //retorna el nombre del dia 
        return nombreDia;
    }
  return (
    // card para mostrat los datos
    <div className="card">
      <h2>{day()}</h2>
      <h3>{data.weather[0].description}</h3>
      <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} />
      <h3 className='grados'>{Math.round(data.main.temp)} °C</h3>
      <div className="datosClima">
        <p><img src={tempMin} alt="" height="13" title='Temperatura Minima'/> {Math.round(data.main.temp_min)} °C</p>
        <p><img src={humedad} alt="" height="13" title='Humedad'/> {data.main.humidity}</p>
        <p><img src={tempMax} alt="" height="13" title='Temperatura Maxima'/> {Math.round(data.main.temp_max)} °C</p>
        <p><img src={viento} alt="" height="13" title='Velocidad del Viento'/> {data.wind.speed} km/h</p>
      </div>
    </div>
  );
};

export default CardClima;
