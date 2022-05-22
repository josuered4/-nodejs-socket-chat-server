const {Schema, model} = require("mongoose");
//Schema nos ayudara a crear el modelo 
//model nos ayudara a la exportacion del modelo 

const UsuarioSchema = Schema({ //esto es un objeto o una instancia 

    //atributos del modelo 
    nombre:{
        type: String, 
        required: true
    }, 
    email:{
        type: String, 
        required: true, 
        unique:true
    }, 
    password:{
        type: String, 
        required: true
    }, 
    online:{ //para saber si un usuario esta conectado 
        type: Boolean, 
        default: false //por defecto todo usuario estara en desconectado 
    }, 
});

//de esta forma podremos sobre escribir metodos creo
//esto nos retornara un json, con datos en especifico.
UsuarioSchema.method("toJSON", function(){
    const { __v, _id, password, ...object} = this.toObject();//el object es la intancia del objeto creado en ese momento.
    //__v, _id, password, se van a sustraer y los demos "..." se almacenaran en una variable de tipo object
    object.uid = _id;
    return object;
});


module.exports = model("Usuario", UsuarioSchema);
//nombre del modelo y nombre del Schema