import { Option } from "./Option";
import { useClima } from "../hooks/useClima";

const Buscador = ({setData, setErrors,errors}) => {
  const {continent, setContinent, country,setCountry,countries,city, setCity, cities, continentes} = useClima(setData,setErrors);
  return (
    <div className="buscador">
      <div className="continent">
        {/* mostrando los continentes */}
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
          <b>País: </b>
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
      {/* mostramos el error */}
      {
        errors.mensaje && <p className="error">{errors.mensaje}</p>
      }
    </div>
  );
};

export default Buscador;
