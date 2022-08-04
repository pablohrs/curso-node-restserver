const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol ='') =>{
    const existeRol = await Role.findOne({rol});
    if (!existeRol){
      throw new Error('El Rol No es Valido BD')
    }
}

const esMailValido = async(correo='')=>
{
    const existeEmail =  await Usuario.findOne({correo});
    
    if (existeEmail)
    {
        throw new Error('El correo ya esta registrado')     
    }
}

const existeUsuarioPorId = async(id)=>
{
    const existeUsuarioId =  await Usuario.findById(id);
    
    if (!existeUsuarioId)
    {
        throw new Error('El Id del Usuario NO existe')     
    }
}

module.exports= {esRolValido, esMailValido, existeUsuarioPorId}