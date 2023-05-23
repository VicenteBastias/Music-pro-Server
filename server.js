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


app.get("/api", (req,res) =>{
    res.setHeader('Content-Type', 'application/json')
    res.json({"users": ["userOne", "userTwo", "userThree","uwu"] })
})

app.listen(5000, () => {console.log("Server stated on port 5000")})

app.get("/login", (req,res)=>{
    try{     
        var dbCheck = `select * from usuarios where username = '${req.query.usuario}' and password = '${req.query.contrasena}'`
        con.query(dbCheck, function(err,data){
            console.log(JSON.stringify(data))
            if (err) {
                console.log(err)
                res.status(02)
                throw err; 
               }
            else{
                console.log(data)
                res.status(200).send("localhost:3000/Tarjeta");
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
        var dbCheck = `select * from tarjetas where id_usuario = '1'`
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
    


    
