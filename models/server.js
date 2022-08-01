
const express = require('express');
const cors = require('cors');

class Server {
    constructor()
    {
        this.app = express();
        this.port=process.env.PORT;
        this.usuarioPath = '/api/users';

        //Middlewares
        this.middlewares();

        this.routes();
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
