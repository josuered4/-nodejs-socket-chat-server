const {validationResult} = require("express-validator");

//next es un callback que nos ayudara pasar con el siguiente middleware
const validarCampos = (req, res, next ) => {

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            msg:errores.mapped()
        });
    }

    next();

}


module.exports = {
    validarCampos
}