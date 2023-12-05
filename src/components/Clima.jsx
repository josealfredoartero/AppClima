import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../App.css'
import Buscador from './Buscador'
import CardClima from './CardClima'


// let urlImg = "http://openweathermap.org/img/w/10d.png"

// let keiTomTom = "cMPDk4ZJFaQhOURWTChtjuEVw19VxxW2";


// let urlApi = "https://api.openweathermap.org/data/2.5/forecast?lat=13.68935&lon=-89.18718&appid=a639150c002cc356e846d87b435d16c4"


const Clima = () => {
    // const {useFilter} = useFilter();
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')

    const [data, setData] = useState('')

    const getLocation = () => {
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(function(position){
                setLat(position.coords.latitude)
                setLon(position.coords.longitude)
            })
        }
    }

    // getLocation();
    // getTime();
 
  return (
    <div className='clima'>
        <h1>App Clima</h1>

        <Buscador setData={setData} />
            
        {
            data &&
            <div className='container'>
                <h4>ciudad: {data.city.name}</h4>
                <div className='containerCard'>
                    {
                        data.list.map(clima => (
                            <CardClima data={clima} />
                        ))
                    }
                </div>
            </div>
        }
            
    </div>
  )
}

export default Clima