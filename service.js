const axios = require('axios');
const mysql = require('mysql');
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: "music_pro"
})

async function hacerTransferencia(nroTarjeta,tarjeta_destino, comentario, monto, id_usuario) {
    console.log(tarjeta_destino)
    try {
        if (monto <= 0) {
          throw new Error('El monto tiene que ser mayor a 0');
        }
        const body = {
            tarjeta_origen: nroTarjeta,
            tarjeta_destino: tarjeta_destino,
            comentario: comentario,
            monto: monto,
            codigo: "FREECODE",
            token: "FREECODE123"
        }
        const response = await axios.post(`https://musicpro.bemtorres.win/api/v1/tarjeta/transferir`, body);
        await saveTransfer(body, id_usuario)
    console.log(body); 
    } catch (error) {
    console.error(error.message); 
    }
}
async function saveTransfer(body, id_usuario){
    var dbCheck = `insert into transferencia (id_usuario, tarjeta_origen, tarjeta_destino, comentario, monto) values(${id_usuario},${body.tarjeta_origen},${body.tarjeta_destino},'${body.comentario}',${body.monto})`
        con.query(dbCheck, function(err,data){
            console.log(data)
            console.log(err)
        });
}


module.exports ={
    hacerTransferencia
}