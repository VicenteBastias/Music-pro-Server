const axios = require('axios');

async function hacerTransferencia(monto, nroTarjeta) {
    try {
    const response = await axios.post('http://localhost:3000/Transferencia', {
        monto: monto,
        nroTarjeta: nroTarjeta
    });

    console.log(response.data); // Manejar la respuesta recibida del servicio
    } catch (error) {
    console.error(error); // Manejar el error, si ocurre
    }
}
module.exports ={
    hacerTransferencia
}