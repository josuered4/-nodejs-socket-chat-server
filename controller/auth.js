const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario  = require("../models/usuario");
const { generarJWT } = require("../helper/jwt");

//Esto es una funcion, el primer controlar
const crearUsuario = async (req, res = response) =>{ //asignamos que es una tarea asincrona 


    const {email, password} = req.body; //extraemos el valor del campo email, tambien se puede ser como abajo
    //const email = req.body.email;

    try{

        const existeEmail = await Usuario.findOne({email}); //buscamos dentro de la bd un registro que cumpla con la condicion
        //console.log(existeEmail.email);
        if(existeEmail){
            return res.status(400).json({
                ok:false, 
                msg: "El correo se encuentra registrado",
            });
        }


        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        //usuario.password = bcrypt.hashSync( password, salt );
        //creo que hay un erro en la encriptacion de contraseñas, con la libreria 


        const usuario = new Usuario(req.body);
        await usuario.save(); //guardamos un usuario 


        //Generar el Json Web Token JWT
        const token = await generarJWT(usuario.id);

        //respuesta 
        res.json({ 
            ok:true, 
            usuario, 
            token
        });


    }catch(e){ //en caso de ocurrir un error
        console.log(e);
        res.status(500).json({
            ok:false, 
            msg: "Comuniquese con el administrador",
        });
    }

}

const login = async (req, res = response) =>{

    const {email, password} = req.body;

    try {

        const usuarioBD = await Usuario.findOne({email});
        //Buscamos al usuario por medio del email

        if(!usuarioBD){
            return res.status(400).json({
                ok: false, 
                msg:"Email no encontrado"
            });
        }

        //validar el password
        //const validPassword = bcrypt.compareSync(password, usuarioBD.password);
        const validPassword = await Usuario.findOne({password});
        if(!validPassword){
            return res.status(400).json({
                ok: false, 
                msg:"Contraseña invalida"
            });
        }

        //si se llega a este punto se generara el JWT
        const token = await generarJWT(usuarioBD.id);
        //retornamos una respuesta 
        res.json({ 
            ok:true, 
            usuario: usuarioBD, 
            token
        });
        
    } catch (error) {

        return res.status(500).json({
            ok: false, 
            msg:"comuniquese con el admin"
        });
        
    }
}

const renewToken = async (req, res = response) =>{

    //obtenemos el usuario
    const uid = req.uid;

    //generamos un token
    const token = await generarJWT(uid);

    //busqueda de usuario por id
    const usuario = await Usuario.findById(uid);
 
    //envio de datos 
    res.json({
        ok:true, 
        usuario, 
        token
    });
}

module.exports = {
    //exportacion de funciones del archivo
    crearUsuario, 
    login, 
    renewToken

}