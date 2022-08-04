const {Schema, model} = require('mongoose');


const UsuarioSchema = Schema({
    nombre:{
        type:String,
        requiered: [true, 'El nombre es obligatorio']
    },
    correo:
    {
        type:String,
        requiered: [true, 'El correo es obligatorio'],
        unique:true
    },
    password:
    {
        type:String,
        requiered: [true, 'El password es obligatorio']         
    },
    img:
    {
        type:String        
    },
    rol:
    {
        type:String,
        requiered:true    
    },
    estado:
    {
        type:Boolean,
        default:true        
    },
    google:
    {
        type:Boolean,
        default:false        
    }
})

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario} =this.toObject();
    return usuario;
}

module.exports = model('Usuario',UsuarioSchema);