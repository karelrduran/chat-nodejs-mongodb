const http = require('http');
const path = require('path');

const express = require('express');
const { Server } = require('socket.io');

const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.listen(server)

// Coneccion a la BD
// Se conecta a una BD en mongoDB Cloud, cambiar <user> y <password> por el usuario y el password correspondiente
mongoose.connect('mongodb+srv://<user>:<password>@mi-chat-database.bhbsmjx.mongodb.net/test')
    .then(db => console.log('db is connected'))
    .catch(err => console.log(err));

//configuracion
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);


//enviando archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));



//iniciando el servidor
server.listen(app.get('port'), () => {
    console.log('Server on port' + app.get('port'));
}); //ejecuta un servidor escuchando por un puerto