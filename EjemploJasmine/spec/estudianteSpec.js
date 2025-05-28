describe("Estudiante", function() {
    let estudiante;
  
    beforeEach(function() {
      estudiante = new Estudiante("Carlos", 21);
    });
  
    it("debería dar de alta al estudiante", function() {
      estudiante.alta = 0;
      estudiante.realizarAlta();
      expect(estudiante.alta).toBe(1);
    });
  

    
    it("debería dar de baja al estudiante", function() {
      estudiante.realizarBaja();
      expect(estudiante.alta).toBe(0);
    });
  


    it("debería agregar una nota", function() {
      const nota = new Nota("Unidad 1", 8);
      estudiante.agregarNota(nota);
      expect(estudiante.notas).toContain(nota);
    });


    it("debería eliminar una nota", function() {
      const nota = new Nota("Unidad 1", 8);
      estudiante.agregarNota(nota);
      estudiante.eliminarNota(nota);
      expect(estudiante.notas).not.toContain(nota);
    });


  
    it("debería calcular media = 0 si no hay notas", function() {
      expect(estudiante.calcularMedia()).toBe(0);
    });
  

    
    it("debería calcular media correctamente", function() {
      estudiante.agregarNota(new Nota("Unidad 1", 8));
      estudiante.agregarNota(new Nota("Unidad 2", 9));
      expect(estudiante.calcularMedia()).toBe(8.5);
    });

    
  });