function Estudiante(nombre,edad){
    this.nombre = nombre;
    this.edad = edad;
    this.alta = 1;
    this.notas =[];
}

Estudiante.prototype.enviarMensaje = function(texto){
    //Enviar mensaje de correo
    console.log(`Mensaje a ${this.nombre}: ${texto}`);
    return true;
}

Estudiante.prototype.realizarAlta = function(){
    if (this.alta == 0){
        this.alta = 1;
        console.log("Estudiante dado de alta");
    }
}

Estudiante.prototype.realizarBaja = function(){
    if (this.alta == 1){
        this.alta = 0;
        console.log("Estudiante dado de baja");
    }
}

Estudiante.prototype.agregarNota = function(nota){
    this.notas.push(nota);
    console.log(`Nota agregada: ${nota.valor} (${nota.unidad})`);

}

Estudiante.prototype.eliminarNota = function(nota){
    const index = this.notas.indexOf(nota);

    if (index !== -1) {
        this.notas.splice(index, 1);
        console.log(`Nota eliminada: ${nota.valor} (${nota.unidad})`);

    } else {
                return;
    }
    
}

Estudiante.prototype.calcularMedia = function(){
    if (this.notas.length>0){
    const suma = this.notas.reduce((acc, n) => acc + n.valor, 0);
    const media = suma / this.notas.length;
    console.log(`Media calculada: ${media}`);
        return media;
    }else{
        console.log("Array de notas vacío. Media: 0");
        return 0;
    }
}