const mongoose = require('mongoose');
const { router } = require('../app');
const Schema = mongoose.Schema()

const clientSchema =({
    patronid: String,
    nombre: String,
    apellido: String,
    dirección: String,
    ciudad: String,
    estado: String,
    codigoPostal: String,
    localizacion: String
  });
  
  const Client = mongoose.model('Client', clientSchema);

  module.exports = Client;