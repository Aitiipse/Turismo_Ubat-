const {Router} = require('express');
//const express = require('express');//ayuda a crear un servidor


const router = Router()

router.get('/',(req, res) => {
    res.render("index")
})

router.get('/iniciar',(req, res) => {
    res.render("iniciarsesion")
})

router.get('/atractivos',(req, res) => {
    res.render("atractivos")
})

router.get('/tipos',(req, res) => {
    res.render("tipos")
})

router.get('/administrador',(req, res) => {
    res.render("administrador")
})

router.get('/navegacion',(req, res) => {
    res.render("navegacion")
})

//AGREGAR

router.get('/agregaratractivo',(req, res) => {
    res.render("agregaratractivo")
})

router.get('/agregarevento',(req, res) => {
    res.render("agregarevento")
})

router.get('/agregarnoticia',(req, res) => {
    res.render("agregarnoticia")
})


router.get('/prueba',(req, res) => {
    res.render("prueba")
})



// EDITAR

router.get('/editaratractivos',(req, res) => {
    res.render("editaratractivos")
})

router.get('/editarevento',(req, res) => {
    res.render("editarevento")
})

router.get('/editarnoticia',(req, res) => {
    res.render("editarnoticia")
})

router.get('/editarruta',(req, res) => {
    res.render("editarruta")
})

// RUTAS

router.get('/ruta1',(req, res) => {
    res.render("ruta1")
})

router.get('/ruta2',(req, res) => {
    res.render("ruta2")
})

router.get('/ruta3',(req, res) => {
    res.render("ruta3")
})

router.get('/ruta4',(req, res) => {
    res.render("ruta4")
})

router.get('/ruta5',(req, res) => {
    res.render("ruta5")
})




module.exports = router;