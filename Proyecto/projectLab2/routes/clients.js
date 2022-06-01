const express = require('express');
const { route } = require('.');
var router = express.Router();
const Client = require('../models/client');
//Rutas
router.get('/', (req, res) => {
    res.render('pages/brand/clientAddEdit', {
        viewTitle: "New Client"
    });
});
router.get('/clientList', (req, res) => {
    Client.find((error, docs) => {
        if (!error) {
            res.render("pages/brand/clientList", {
                viewTitle: "Clientes",
                list: docs
            })
        } else {
            console.log("Error: error");
        }
    });
});
router.get('/:id', (req, res) => {
    Client.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('pages/brand/clientAddEdit', {
                viewTitle: "Update Client",
                client: doc
            });
        }
    });
});


router.post('/', (req, res) => {
    if (req.body._id == '') {
        insertClient(req, res);
    } else {
        updateClient(req, res);
    }
});
//
function insertClient(req, res) {
    var client = new Client();
    client.patronid = req.body.patronid;
    client.nombre = req.body.nombre;
    client.apellido = req.body.apellido;
    client.direccion = req.body.direccion;
    client.ciudad = req.body.ciudad;
    client.estado = req.body.estado;
    client.codigoPostal = req.body.codigoPostal;
    client.localizacion = req.body.localizacion;

    client.save(e => {
        if (!e) {
            res.redirect('client/clientList');
        } else {
            console.log("Error: ", e)
        }
    })
}
function updateClient(req, res) {
    Client.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.render('brand/clientList', {
                viewTitle: "Update Client",
                client: req.body
            });
            res.redirect('client/clientList');
        } else {
            console.log("Error: ", err)
        }
    });
}
router.get('/delete/:id', (req, res) => {
    Client.findByIdAndRemove(req.params.id, (err) => {
        if (!err) {
            res.redirect('/client/clientList');
        } else {
            console.log("Error", err);
        }
    });
})
module.exports = router;