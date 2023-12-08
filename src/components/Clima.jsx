import React, { useState, useEffect } from 'react'
import '../App.css'
import Buscador from './Buscador'
import CardClima from './CardClima'
import { useClima } from '../hooks/useClima'

const Clima = () => {
    const [data, setData] = useState('')
    const [errors, setErrors] = useState('')
    // importando la funcion para mostrar el clima por medio de la ubicacion
    const {getLocation} = useClima()
//  funcion para traer el clima por la ubicacion al inicior la app
    useEffect(() => {  
        getLocation(setData)
    }, [])

  return (
    <div className='clima'>
        <h1>App Clima</h1>
        {/* buscador para encontrar ciudad */}
        <Buscador setData={setData} errors={errors} setErrors={setErrors} />
            {/* mostrando las cards de el clima por cada dia */}
        {
            data &&
            <div className='container'>
                <h3>Ciudad: {data.city.name}</h3>
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