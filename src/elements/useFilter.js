// filtrando los climas de los dias a uno por dia 
export function useFilter (data) {
    const horaActual = new Date().getHours();
    const horaActual3 = horaActual + 3;
    // filtrando los datos y solo dejando uno que este mas serca de la hora 
    const datos = data.list.filter(item => {
        const hora = new Date(item.dt_txt).getHours();
        return hora >= horaActual && hora < horaActual3
    })
    data.list = datos;

    return data;
}   