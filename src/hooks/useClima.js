// import { useEffect } from "react";
import { useFilter } from "../elements/useFilter"
import axios from 'axios'

const key = "a639150c002cc356e846d87b435d16c4";

export function useClima () {
    const getLocation = (setData) => {
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(function(position){
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${key}&lang=es`)
                .then(response => {
                    const data = useFilter(response.data);
                    setData(data)
                })
                .catch(error => console.log(error))
            })
        }
    }

    return {
        getLocation
    }
}