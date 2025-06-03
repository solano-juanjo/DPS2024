const express = require('express');
const cors = require('cors');        
const corsOptions = {
            origin: process.env.ORIGIN,
            optionsSuccessStatus: 200
}

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
    }

    middlewares(){      
        this.app.use(cors(corsOptions))
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    listen(){
        this.app.listen( process.env.PORT || 3000, () =>
        {
                            console.log(process.cwd());
                            console.log('Private Server ', process.env.PORT || 3000);
        });
    }
 }
 module.exports = Server;