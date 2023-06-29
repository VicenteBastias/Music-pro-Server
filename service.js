const axios = require('axios');

async function hacerTransferencia(monto, nroTarjeta, userId, callback) {
    try {
    const response = await axios.get(`https://musicpro.bemtorres.win/api/v1/tarjeta/transferir_get`, {
        params:{
            userId: 1,
            secret_key: 1,
            monto: monto,
            callback: 1,
            nroTarjeta: nroTarjeta


        }
    });
    
    console.log(response.data); 
    } catch (error) {
    console.error(error); 
    }
}
module.exports ={
    hacerTransferencia
}