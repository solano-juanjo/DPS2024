const express = require('express');
const cors = require('cors');

const corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
};

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        // Datos de cursos de INDIeUPCT
        this.courses = [
            {
                id: 1,
                nombre: "Introducción a la Programación",
                url: "https://indie.upct.es/course/intro-programming",
                descripcion: "Curso básico de programación con Python y conceptos fundamentales de algoritmos."
            },
            {
                id: 2,
                nombre: "Desarrollo Web con HTML5 y CSS3",
                url: "https://indie.upct.es/course/web-development",
                descripcion: "Aprende a crear sitios web modernos utilizando HTML5, CSS3 y diseño responsive."
            },
            {
                id: 3,
                nombre: "JavaScript Avanzado",
                url: "https://indie.upct.es/course/advanced-javascript",
                descripcion: "Domina JavaScript ES6+, async/await, DOM manipulation y APIs modernas."
            },
            {
                id: 4,
                nombre: "Node.js y Express",
                url: "https://indie.upct.es/course/nodejs-express",
                descripcion: "Desarrollo de aplicaciones backend con Node.js, Express y bases de datos."
            },
            {
                id: 5,
                nombre: "DevOps y CI/CD",
                url: "https://indie.upct.es/course/devops-cicd",
                descripcion: "Implementación de pipelines CI/CD con Azure DevOps, Docker y automatización."
            }
        ];
        
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors(corsOptions));
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    
    routes() {
        // Ruta principal
        this.app.get('/', (req, res) => {
            res.sendFile(__dirname + '/../public/content/index.html');
        });
        
        // Endpoint REST para obtener todos los cursos
        this.app.get('/cursos', (req, res) => {
            res.json({
                success: true,
                message: "Cursos de INDIeUPCT obtenidos correctamente",
                data: this.courses,
                total: this.courses.length
            });
        });

        // Endpoint REST para obtener un curso específico
        this.app.get('/cursos/:id', (req, res) => {
            const courseId = parseInt(req.params.id);
            const course = this.courses.find(c => c.id === courseId);
            
            if (course) {
                res.json({
                    success: true,
                    message: "Curso encontrado",
                    data: course
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Curso no encontrado"
                });
            }
        });
    }

    listen() {
        this.app.listen(process.env.PORT || 4000, () => {
            console.log(process.cwd());
            console.log('Private Server ', process.env.PORT || 4000);
        });
    }
}

module.exports = Server;