describe("Curso", function(){
    var curso;
    var estudiante1, estudiante2;

    beforeAll(function(){
        curso = new Curso(1, "GIT", "Un sistema de control de versiones");
        estudiante1 = new Estudiante("Daniel Pérez", 42);
        estudiante2 = new Estudiante("Juanjo Pérez", 42);
    });

    beforeEach(function(){
        curso.estudiantes = [];
    });

    it("Apertura de un curso", function(){
        curso.abrir();
        expect(curso.estado).toEqual("Abierto");
    });

    it("Cierre de un curso", function(){
        curso.cerrar();
        expect(curso.estado).toEqual("Cerrado");
    });

    it("Matricular un estudiante", function(){
        curso.matricular(estudiante1);
        expect(curso.estudiantes).toEqual(jasmine.arrayContaining([estudiante1]));
 
    });

    it("Expulsar un estudiante",function(){
        curso.matricular(estudiante1);
        curso.matricular(estudiante2);
        curso.expulsar(estudiante1);
        expect(curso.estudiantes).not.toEqual(jasmine.arrayContaining([estudiante1]));
        expect(curso.estudiantes).toEqual(jasmine.arrayContaining([estudiante2]));
    });

    it("Enviar mensaje",function(){
        curso.matricular(estudiante1);

        spyOn(estudiante1,"enviarMensaje");
        curso.enviarMensajeTodos();
        expect(estudiante1.enviarMensaje).toHaveBeenCalledTimes(2);
    });

});