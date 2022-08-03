
const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');

class Server {
    constructor()
    {
        this.app = express();
        this.port=process.env.PORT;
        this.usuarioPath = '/api/users';

        //Conectar a BD
        this.ConectarDB();

        //Middlewares
        this.middlewares();

        this.routes();
    }

    async ConectarDB() {
        try
        {         
            await dbConnection();

        }catch(error) {
            console.log(`Error: ${error}`);
        }       
    }

   middlewares()
   {
      //CORS
      this.app.use(cors())

      //Lectura Body
      this.app.use(express.json());

      this.app.use(express.static('public'));
   }

    routes()  {
      this.app.use(this.usuarioPath , require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
