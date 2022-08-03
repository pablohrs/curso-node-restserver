const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const userGet= async(req, res = response) =>  {
        const {q, nombre='Sin Nombre', apikey} = req.query;
       
         res.json({                   
                message:'Get API Usuario Get',
                q,
                nombre,
                apikey
            });
  }

const userPut=(req, res = response) =>  {
    const id = req.params.id;

    res.json({                   
        message:'Get API Usuario Put',
        id
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
   
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json(errors);
    }

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar si el correo existe
    const existeEmail =  await Usuario.findOne({correo});
    if (existeEmail)
    {
        return res.status(400).json({
            msg:'Ese correo ya esta registrado'
        });
    }

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
