const express = require('express');
const { route } = require('.');
var router = express.Router();

//llamado al modelo
const Brand = require('../models/brand')


router.get('/', (req, res) => {
    res.render('pages/brand/brandAddEdit',{
        viewTitle: 'Categoria de Libros'

    });

})




router.post('/', (req, res) => {
    if(req.body._id == '')
    saveBrand(req, res);
    else
    updateBrand(req, res);

});


function saveBrand(req, res){
    var brand = new Brand();
    brand.id = req.body.id;
    brand.title = req.body.title;
    brand.apellido = req.body.apellido;
    brand.nombre = req.body.nombre;
    brand.clasificacion = req.body.clasificacion
    brand.save(e =>{
        if(e)
        console.log("Error", e)
        else
        res.redirect('brand/brandList');
    });
}

router.get('/clients', (req, res) => {
    res.render('pages/prueba',{
        viewTitle: 'Categoria de Libros'

    });
})



router.post('/clients', (req, res) => {
    if(req.body._id == '')
    saveClient(req, res);
    
    else
    updateClient(req, res);

})

function saveClient(req, res){
    var client = new Client();
    client.patronid = req.body.patronid;
    client.nombre = req.body.nombre;
    client.apellido = req.body.apellido;
    client.direccion = req.body.direccion;
    client.ciudad = req.body.ciudad;
    client.estado = req.body.estado;
    client.codigo = req.body.codigo;
    client.localizacion = req.body.localizacion;
    client.save(e =>{
        if(e)
        console.log("Error", e)
        else
        res.redirect('brand/MostarClient');
    });
}

function updateClient(req, res){
    Client.findOneAndUpdate({_id: req.body._id},
        req.body, {new:true}, (err, doc) => {
            if(!err){
                res.redirect('brand/MostarClient');
            } else{
                console.log("Error", err);
            }
        });

}



function updateBrand(req, res){
    Brand.findOneAndUpdate({_id: req.body._id},
        req.body, {new:true}, (err, doc) => {
            if(!err){
                res.redirect('brand/brandList');
            } else{
                console.log("Error", err);
            }
        });

}
router.get('/brandList', (req, res) =>{
    Brand.find((err, docs) =>{
        if(!err){
            res.render('pages/brand/brandList', {
                viewTitle: "Listado de Libros",
                list: docs
            });
        } else{
            console.log("Error", err);

        }
    });
});

router.get('/MostrarClient', (req, res) =>{
    Client.find((err, docs) =>{
        if(!err){
            res.render('pages/brand/MostrarClient', {
                viewTitle: "Listado de Clientes",
                list: docs
            });
        } else{
            console.log("Error", err);

        }
    });
});

router.get('/:id', (req, res) => {
    Brand.findById(req.params.id, (err, doc) => {
        if (!err){
            res.render('pages/brand/brandAddEdit', {
                viewTitle: "Actualizar Marca", 
                brand: doc
            })
        }

    });
});

router.get('/delete/:id', (req, res) =>{
    Brand.findOneAndRemove(req.params.id, e=>{
        if(e)
        console.log("Error", e);
        else
        res.redirect('/brand/brandList');
    });
});


router.get('/:id', (req, res) => {
    Client.findById(req.params.id, (err, doc) => {
        if (!err){
            res.render('pages/brand/MostrarClient', {
                viewTitle: "Actualizar Cliente", 
                brand: doc
            })
        }

    });
});

router.get('/delete/:id', (req, res) =>{
    Client.findOneAndRemove(req.params.id, e=>{
        if(e)
        console.log("Error", e);
        else
        res.redirect('/brand/MostrarClient');
    });
});


module.exports = router; 