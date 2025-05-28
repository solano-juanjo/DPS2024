function Curso(id, titulo, descripcion){
    console.log("Curso creado");
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.estado = "Cerrado";
    this.estudiantes = [];
}

Curso.prototype.abrir = function(){
    console.log("Curso abierto");
    this.estado = "Abierto";
}

Curso.prototype.cerrar = function(){
    console.log("Cierro curso");
    this.estado = "Cerrado";
}

Curso.prototype.matricular = function(estudiante){
    console.log("Agrego estudiante");
    console.log(estudiante.nombre);
    this.estudiantes.push(estudiante);
}

Curso.prototype.expulsar = function(estudiante){ 
    console.log("Borro estudiante"); 
    this.estudiantes.splice(this.estudiantes.indexOf(estudiante),1);
}

Curso.prototype.enviarMensajeTodos = function(){
    this.estudiantes.forEach(function(element){
        element.enviarMensaje("Bienvenida");
        element.enviarMensaje("Listado de asignaturas");
    });
}

