import { useState, useEffect } from "react";
import axios from "axios";
import { useFilter } from '../elements/useFilter';
import { Option } from "./Option";
// arreglo de lista de continentes
const continentes = [
  {value:'Asia',name: 'Asia'},
  {value:'Africa',name: 'África'},
  {value:'America',name:'América'},
  {value:'Europe',name:'Europa'},
  {value:'Oceania',name:'Oceanía'},
  {value:'Antarctica',name:'Antarctica'}
]

const Buscador = ({setData}) => {
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState('');
  // una id para enviar a la app de clima 
  const key = "a639150c002cc356e846d87b435d16c4";

  // funcion para traer los paises dependiendo de el continente
  const getCountries = async () => {
    await axios
      .get(`https://restcountries.com/v3.1/region/${continent}?lang=es`)
      .then((response) => {
        // guarda los paises en el estado por orden alfabetico
        setCountries(
          response.data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        );
      })
      .catch((error) => setErrors({mensaje:'¡Error no se encontralos los paises!'}));
  };
  //funcion para traer las ciudades de un pais
  const getCity = async () => {
    await axios
      .get(
        `http://api.geonames.org/searchJSON?country=${country}&username=joseartero`
      )
      .then((response) => {
        const uniqueIds = new Set();
        const uniqueData = response.data.geonames.filter((obj) => {
          if (!uniqueIds.has(obj.adminName1)) {
            uniqueIds.add(obj.adminName1);
            return true;
          }
          return false;
        });
        setCities(uniqueData.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch((error) => setErrors({mensaje:'¡Error no se contraron las ciudades!'}));
  };
  // funcion para traer el clima de los proximos 5 dias 
  const getTime = async() => {
    setErrors('');
    await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}&lang=es`)
    .then(res => {
        // realiza un filtro para traer solo el clima de la hora mas cercana
        const data = useFilter(res.data);
        //llamando la funcion para traer el clima del dia 
        getTimeDay(data)
      })
      .catch(error => setErrors({mensaje:"¡Error País no se encuentra para mostrar el clima!"}))
  }
  //funcion para traer el clima del dia de hoy
  const getTimeDay = async(data) => {
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}&lang=es`)
        .then(response => {
          // agragando la fracha al clima del dia 
            response.data.dt_txt = new Date();
            const newData = {...data};
            newData.list = [ response.data, ...newData.list]
        // guardando el los datos para mostrarlos
        setData(newData)
        })
        .catch(error => setErrors({mensaje:"¡Error el clima del dia de hoy no se encontro!"}))
  }

  // traer los paises por el continente cada vez que se selecciine uno
  useEffect(() => {
    if (continent) {
      getCountries();
    }
  }, [continent]);
  //traer las ciudades cada vez que selecciones un nuevo pais 
  useEffect(() => {
    if (country) {
      getCity();
    }
  }, [country]);
  // traer el clima cada vez que cambie la ciudad seleccionada 
  useEffect(()=>{
    if (city) {
        getTime();
    }
},[city])

  return (
    <div className="buscador">
      <div className="continent">
        <b>Continente: </b>
        <select
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
        >
          <option value="">Seleccione un Continente</option>
          {continentes.map((value,index) => (
            <Option key={index} value={value.value} state={value.name}/>
          ))}
        </select>
      </div>
    {/* recorriendo los paises a mostrar en el select */}
      {countries && (
        <div className="continent">
          <b>Pais: </b>
          <select
            id="ciudades"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="" >Seleccione un país</option>
            {countries.map((value) => (
                <Option key={value.area} value={value.altSpellings[0]} state={value.name.common} />
            ))}
          </select>
        </div>
      )}
  {/* recorriendo las ciudades a mostrar en el select  */}
      {cities && (
        <div className="continent">
          <b>Ciudad: </b>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="" >Seleccione un ciudad</option>
            {cities.map((item) => (
                <Option key={item.geonameId} value={item.name}/>
            ))}
          </select>
        </div>
      )}
      {
        errors.mensaje && <p className="error">{errors.mensaje}</p>
      }
    </div>
  );
};

export default Buscador;
