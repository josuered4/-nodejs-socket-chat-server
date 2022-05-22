/*
    path: api/login

*/


const { Router, response } = require ("express");
const { check } = require("express-validator");
const { crearUsuario, login, renewToken } = require("../controller/auth");
const { validarCampos } = require("../middleware/validar_campos");
const { validarJWT } = require("../middleware/validar_jwt");

const router = Router();


//es una ruta y su controlador 
router.post(
    "/new", 
    [   //middleware para verificar campo por campo
        check("nombre","Campo obligatorio").not().isEmpty(), 
        check("password","Campo obligatorio").not().isEmpty(), 
        check("email","Campo obligatorio").isEmail(), 
        validarCampos
    ],
    crearUsuario);


router.post(
    "/", 
    [
        check("email","Campo obligatorio").isEmail(),
        check("password","Campo obligatorio").not().isEmpty(),
    ], 
    login
);    


//par verificar si el token que se envio sigue vigente
router.get(
    "/renew", 
    validarJWT, 
    renewToken
);

module.exports = router; 
//cuando alguien utilize este archivo estar utilizando esta funxion