const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const userGet= async(req, res = response) =>  {
        const {q, nombre='Sin Nombre', apikey} = req.query;
       
         res.json({                   
                message:'Get API Usuario Get',
                q,
                nombre,
                apikey
            });
  }

const userPut= async(req, res = response) =>  {
    const id = req.params.id;

    const {_id, password, google, correo, ...resto} = req.body;

    if (password)
    {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({                   
        message:'Get API Usuario Put',
        usuario
    });
}

const userDelete=(req, res = response) =>  {
    const id = req.params.id;

    res.json({                   
        message:'Get API Usuario Delete',
        id
    });
}

const userPatch=(req, res = response) =>  {
    const id = req.params.id;

    res.json({                   
        message:'Get API Usuario Patch',
        id
    });
}

const userPost=async(req, res = response) =>  {
    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //Guardar la BD
    await usuario.save();

    res.json({      
        usuario
    });
}

  module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}
