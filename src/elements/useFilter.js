export function useFilter (data) {
    const horaActual = new Date().getHours();
    const horaActual3 = horaActual + 3;

    const datos = data.list.filter(item => {
        const hora = new Date(item.dt_txt).getHours();
        return hora >= horaActual && hora < horaActual3;
    })
    
    data.list = datos;

    return data;
}   