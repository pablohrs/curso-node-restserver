const mongoose = require('mongoose');

const dbConnection = async() => {
    try { 

       await mongoose.connect(process.env.MONGODB_CNN, 
        {
            useNewUrlParser: true,           
            useUnifiedTopology: true
       }); 

       console.log('Base de Datos Conectada');
     }
    catch (error)
    {
        console.log(error);
    }
}

module.exports.dbConnection=dbConnection;
