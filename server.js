const express = require("express")
const app = express()
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');


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
                res.status(02)
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
        var dbCheck = `select * from tarjetas where id_usuario = '1'`
        con.query(dbCheck, function(err,data){
            console.log(req.query.monto)
            let saldoNuevo = parseInt(data[0].saldo) + parseInt(req.query.monto)
            var dbInsert = `update tarjetas set saldo = '${saldoNuevo}' where id_usuario = '1' `
            response = con.query(dbInsert)
            if (err) {
                console.log(err)
                res.status(02)
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
                res.status(02)
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


    


    
