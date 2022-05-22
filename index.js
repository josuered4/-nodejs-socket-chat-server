const express = require('express');
const path = require('path');
require('dotenv').config();

//DB Config
require("./database/config").dbConnection(); //importamos la conexion a la BD

// App de Express
const app = express();

// Lectura y parseo del body 
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );


//Rutas 
//miderware, funciones que se ejecuta cuendo el codigo va pasando
app.use("/api/login", require("./routes/auth")); 
//asignamos las rutas a nuestro servidor



server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});


