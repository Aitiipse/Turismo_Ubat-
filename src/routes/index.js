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

router.get('/agregarruta',(req, res) => {
    res.render("agregarruta")
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





module.exports = router;