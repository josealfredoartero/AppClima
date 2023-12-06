import React, { useState, useEffect } from 'react'
import '../App.css'
import Buscador from './Buscador'
import CardClima from './CardClima'
import { useClima } from '../hooks/useClima'

// let urlImg = "http://openweathermap.org/img/w/10d.png"

// let keiTomTom = "cMPDk4ZJFaQhOURWTChtjuEVw19VxxW2";


// let urlApi = "https://api.openweathermap.org/data/2.5/forecast?lat=13.68935&lon=-89.18718&appid=a639150c002cc356e846d87b435d16c4"

const Clima = () => {
    const {getLocation} = useClima()
    const [data, setData] = useState('')

    useEffect(() => {
      
        getLocation(setData)
    
    }, [])
 
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
                            <CardClima key={clima.dt} data={clima} />
                        ))
                    }
                </div>
            </div>
        }
            
    </div>
  )
}

export default Clima;