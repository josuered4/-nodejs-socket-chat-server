const jwt = require("jsonwebtoken");


//el JWT, debe no debe contener informacion importante
const generarJWT = (uid) =>{ //creo que asi se crea una funcion en js, se crean como si fueran variables 

    //promesa con callbaks
    return new Promise((resolve, reject)=>{
        const payload = {uid};
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn:"24h", //tiempo de vida de un token
        }, (err, token)=>{
            if(err){
                reject("No se pudo generar el JWT")
            }else{
                resolve(token);
            }
        });
        //el segundo argumeto es una palabra clave que nadie debera saber, dado a que con esa se firmaran los 
        //token
    });

}

module.exports = {
    generarJWT
}