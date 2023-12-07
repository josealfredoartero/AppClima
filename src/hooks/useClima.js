// import { useEffect } from "react";
import { useFilter } from "../elements/useFilter"
import axios from 'axios'
// ----------------------- key para enviar a la api de clima --------------------------------------------------
const key = "a639150c002cc356e846d87b435d16c4";
export function useClima () {
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
        .catch(error => console.log(error))
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
        .catch(error => console.log(error))
    }

    return {
        getLocation
    }
}