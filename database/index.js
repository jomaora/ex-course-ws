'use strict'

var mongoose = require('mongoose');

var mongolabStringConnexion = process.env.MONGO_STRING_CONNECTION || 'mongodb://localhost:27017/ws-restapi';

mongoose.connect(mongolabStringConnexion);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Connexion establish to ' + mongolabStringConnexion);
});
