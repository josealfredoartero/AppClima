import { useState, useEffect } from "react";
import { useFilter } from "../elements/useFilter"
import axios from 'axios'
// ----------------------- key para enviar a la api de clima --------------------------------------------------
const key = "a639150c002cc356e846d87b435d16c4";

export function useClima (setData, setErrors) {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [continent, setContinent] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

    // arreglo de lista de continentes
    const continentes = [
        {value:'Asia',name: 'Asia'},
        {value:'Africa',name: 'África'},
        {value:'America',name:'América'},
        {value:'Europe',name:'Europa'},
        {value:'Oceania',name:'Oceanía'},
        {value:'Antarctica',name:'Antarctica'}
    ]
    // -------------------------------- funcion para buscar el clima por medio de la ubicacion --------------------------
    const getLocation = (setData) => {
        // condicion para ver si el navegador puede acceder a la ubicacion
        if("geolocation" in navigator){
            // metodo donde se obtiene la ubicacion
            navigator.geolocation.getCurrentPosition(function(position){
                // obteniendo la latitud y oongitud
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                // llama la funcion para buscar el clima por latitud y longitud
                getClimaDias(lat, long, setData)
            })

        }
    }
    // funcion para realozar la peticion de el clima de 5 dias 
    const getClimaDias = async(lat, long, setData) => {
        await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=${key}&lang=es`)
        .then(response => {
            // fitro la data para mostrar el clima mas sercano a la hora 
            const data = useFilter(response.data);
            // llamando la funcion para traer el clima de hoy
            getClimaHoy(data,setData,lat,long);
            
        })
        .catch(error => setError({mensaje: "Error no se encontro el clima del País"}))
    }
    // funcion para realizar la peticion de el clima del dia de hoy
    const getClimaHoy = async(data,setData,lat,lon) => {
        await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}&lang=es`)
        .then(response => {
            // agregar la fecha al arreglo
            response.data.dt_txt = new Date();
            data.list = [response.data, ...data.list];
            setData(data)
        })
        .catch(error => setErrors({mensaje:"Error no se encontro el pronostico del dia de hoy"}))
    }

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
      .catch((error) => setErrors({mensaje:'¡Error no se a encontrado los paises!'}));
  };
  //funcion para traer las ciudades de un pais
  const getCity = async() => {
    await axios
      .get(
        `http://api.geonames.org/searchJSON?country=${country}&username=joseartero`
      )
      .then((response) => {
        const uniqueIds = new Set();
        const uniqueData = response.data.geonames.filter((obj) => {
          return !uniqueIds.has(obj.adminName1) && uniqueIds.add(obj.adminName1)
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


    return {
        getLocation,
        countries,
        setCountries,
        cities,
        setCities,
        continent,
        setContinent,
        country,
        setCountry,
        city,
        setCity,
        continentes
    }
}