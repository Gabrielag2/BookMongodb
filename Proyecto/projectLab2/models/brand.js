const mongoose = require('mongoose');
const { router } = require('../app');
const Schema = mongoose.Schema();

const brandSchema = ({
    id: String,
    title: String,
    apellido: String,
    nombre: String,
    clasificacion: String
});



const Brand = mongoose.model('Brand', brandSchema);


module.exports = Brand;