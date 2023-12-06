import { useState, useEffect } from "react";
import axios from "axios";
import { useFilter } from '../elements/useFilter';
import { Option } from "./Option";

const Buscador = ({setData}) => {
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);

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
      .catch((error) => console.log(error));
  };

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
      .catch((error) => console.log(error));
  };

  const getTime = async() => {
    await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}&lang=es`)
    .then(res => {
        const data = useFilter(res.data);

        // console.log(data)

        setData(data)
    })
    .catch(error => console.log(error))
}

  // traer los paises por el continente cada vez que se selecciine uno
  useEffect(() => {
    if (continent) {
      getCountries();
    }
  }, [continent]);

  useEffect(() => {
    if (country) {
      getCity();
    }
  }, [country]);

  useEffect(()=>{
    if (city) {
        getTime();
    }
},[city])

  return (
    <div className="buscador">
      <div className="continent">
        <label>Continente: </label>
        <select
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
        >
          <option value="Asia">Asia</option>
          <option value="Africa">África</option>
          <option value="America">América</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceanía</option>
          <option value="Antarctica">Antártida</option>
        </select>
      </div>

      {countries && (
        <div className="continent">
          <label>Pais: </label>
          <select
            id="ciudades"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countries.map((value) => (
                <Option key={value.area} value={value.altSpellings[0]} state={value.name.common} />
            ))}
          </select>
        </div>
      )}

      {cities && (
        <div className="continent">
          <label>Ciudad: </label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            {cities.map((item) => (
                <Option key={item.id} value={item.name}/>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Buscador;
