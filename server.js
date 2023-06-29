const express = require("express")
const app = express()
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');
const axios = require('axios');
const httpConfig = require('./http');
const service = require('./service');

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: "music_pro"
})


/*app.get("/api", (req,res) =>{
    res.setHeader('Content-Type', 'application/json')
    res.json({"users": ["userOne", "userTwo", "userThree","uwu"] })
})*/
httpConfig(app)
app.listen(5000, () => {console.log("Server stated on port 5000")})

app.get("/login", (req,res)=>{
    res.setHeader('Content-Type', 'application/json')
    try{     
        var dbCheck = `select * from usuarios where username = '${req.query.usuario}' and password = '${req.query.contrasena}'`
        con.query(dbCheck, function(err,data){
            if (data.length  < 1) {
                console.log(err)
                res.status(500).json({'uwu': 'uwu'})
               }
            else{
                res.status(200).json(data)
            }
        });

     //res.redirect("localhost:3000/Tarjeta") 
        console.log("Connected!");
    }catch (ex) {
        console.log(ex)
    }
    });

app.get("/tarjeta", (req,res) =>{
    res.setHeader('Content-Type', 'application/json')
    try{     
        var dbCheck = `select * from tarjetas where id_usuario = ${req.query.id_usuario}`
        con.query(dbCheck, function(err,data){
            if (err) {
                console.log(err)
                res.status(400)
                throw err; 
               }
            else{
                res.status(200).json(data);
            }
        });

     //res.redirect("localhost:3000/Tarjeta") 
    }catch (ex) {
        console.log(ex)
    }
});

app.get("/tarjetaSaldo", (req,res) =>{
    res.setHeader('Content-Type', 'application/json')
    try{     
        var dbCheck = `select * from tarjetas where id_usuario = ${req.query.id_usuario}`
        con.query(dbCheck, function(err,data){
            console.log(req.query.monto)
            let saldoNuevo = parseInt(data[0].saldo) + parseInt(req.query.monto)
            var dbInsert = `update tarjetas set saldo = '${saldoNuevo}' where id_usuario = '${req.query.id_usuario}' `
            response = con.query(dbInsert)
            if (err) {
                console.log(err)
                res.status(400)
                throw err; 
               }
            else{
                res.status(200).json(data);
            }
        });

     //res.redirect("localhost:3000/Tarjeta") 
    }catch (ex) {
        console.log(ex)
    }
});

app.get("/Api", (req,res) =>{
    res.setHeader('Content-Type', 'application/json')
    try{     
        var dbCheck = `select * from usuarios`
        con.query(dbCheck, function(err,data){
            console.log(JSON.stringify(data))
            if (err) {
                console.log(err)
                res.status(400)
                throw err; 
               }
            else{
                res.status(200).json(data);
            }
        });

     //res.redirect("localhost:3000/Tarjeta") 
    }catch (ex) {
        console.log(ex)
    }
});
app.post("/Transferencia", (req, res) => {
    const nroTarjeta = req.body.nroTarjeta;
    const monto = req.body.monto;
    console.log(nroTarjeta, monto);
    try {
      const dbCheck = `select * from tarjetas where nro='${nroTarjeta}'`;
      con.query(dbCheck, function (err, data) {
        console.log(JSON.stringify(data));
        let saldo = data[0].saldo + parseInt(monto);
        const dbInsert = `update tarjetas set saldo = ${saldo} where nro='${nroTarjeta}'`;
        con.query(dbInsert);
        if (err) {
          console.log(err);
          res.status(400).send("Error en la solicitud"); // Enviar una respuesta con error
        } else {
          res.status(200).send("Transferencia exitosa"); // Enviar una respuesta exitosa
        }
      });
    } catch (ex) {
      console.log(ex);
      res.status(500).send("Error en el servidor"); // Enviar una respuesta con error del servidor
    }
  });


app.get("/TransferenciaExterno", (req, res) => {
    service.hacerTransferencia( req.body.monto)
    const usuario = req.query.idUsuario;
    const monto = req.query.monto
    console.log(req.query.tarjet, monto);
    try {
        var dbCheck = `select * from tarjetas where id_usuario = ${usuario}`
        con.query(dbCheck, function(err,data){
            console.log(req.query.monto)
            let saldoNuevo = parseInt(data[0].saldo) - parseInt(monto)
            var dbInsert = `update tarjetas set saldo = '${saldoNuevo}' where id_usuario = '${usuario}' `
            response = con.query(dbInsert)
            if (err) {
                console.log(err)
                res.status(400)
                throw err; 
               }
            else{
                res.status(200).json(data);
            }
        });
    } catch (ex) {
      console.log(ex);
    }
  });





    


    
