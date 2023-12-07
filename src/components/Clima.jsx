import React, { useState, useEffect } from 'react'
import '../App.css'
import Buscador from './Buscador'
import CardClima from './CardClima'
import { useClima } from '../hooks/useClima'

// let urlImg = "http://openweathermap.org/img/w/10d.png"

// let keiTomTom = "cMPDk4ZJFaQhOURWTChtjuEVw19VxxW2";


// let urlApi = "https://api.openweathermap.org/data/2.5/forecast?lat=13.68935&lon=-89.18718&appid=a639150c002cc356e846d87b435d16c4"

const Clima = () => {
    const [data, setData] = useState('')
    // importando la funcion para mostrar el clima por medio de la ubicacion
    const {getLocation} = useClima()
    useEffect(() => {  
        getLocation(setData)
    }, [])
 
  return (
    <div className='clima'>
        <h1>App Clima</h1>
        {/* buscador para encontrar ciudad */}
        <Buscador setData={setData} />
            {/* mostrando las cards de el clima por cada dia */}
        {
            data &&
            <div className='container'>
                <h3>ciudad: {data.city.name}</h3>
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