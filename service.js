const axios = require('axios');

async function hacerTransferencia(nroTarjeta,tarjeta_destino, comentario, monto) {
    console.log(tarjeta_destino)
    try {
        if (monto <= 0) {
          throw new Error('El monto tiene que ser mayor a 0');
        }
        const response = await axios.post(`https://musicpro.bemtorres.win/api/v1/tarjeta/transferir`, {
            tarjeta_origen: nroTarjeta,
            tarjeta_destino: tarjeta_destino,
            comentario: comentario,
            monto: monto,
            codigo: "FREECODE",
            token: "FREECODE123"    
    });

    console.log(response.data); 
    } catch (error) {
    console.error(error.message); 
    }
}
module.exports ={
    hacerTransferencia
}