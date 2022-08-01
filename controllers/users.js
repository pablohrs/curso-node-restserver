const {response} = require('express');

const userGet=(req, res = response) =>  {
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

const userPost=(req, res = response) =>  {
   
    const {nombre, edad} = req.body;


    res.json({                   
        message:'Get API Usuario Post',
        nombre, 
        edad
    });
}

  module.exports = {
    userGet,
    userPut,
    userPost
}
