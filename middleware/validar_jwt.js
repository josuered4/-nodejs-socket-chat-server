const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next ) => {

    //Leer el token
    //Para mandar le token este se mandara por los heder de la peticion 
    const token = req.header("x-token"); //x-token es el nombre del elemento que tiene el token

    if(!token){ //si esta nulo 
        return res.status(401).json({
            ok:false,
            msg: "null token"
        });
    }

    try {
        //validacion del token

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        //Se va extraer el udi, del token

        req.uid = uid;


        next();    
    } catch (error) {
        return res.status(401).json({
            ok:false, 
            msg:"invalid Token"
        });
    }


}

module.exports = {
    validarJWT
}