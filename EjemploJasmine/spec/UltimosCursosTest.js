var doneFn;
describe("UltimosCurso", function(){
    

    beforeEach(function() {
        jasmine.Ajax.install();
    });
    
    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("Comprobar la respuesta AJAX", function() {
        doneFn = jasmine.createSpy("success");

        arrayUltimosCursos = ultimosCursos();

        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/some/cool/url');
        expect(doneFn).not.toHaveBeenCalled();

        jasmine.Ajax.requests.mostRecent().respondWith({
            "status": 200,
            "contentType": 'text/plain',
            "responseText": '[{"id": 1,"titulo": "Git Básico","descripcion": "Curso de Git Básico", "url": "gitbasico"}, {"id": 2, "titulo": "Git Avanzado", "descripcion": "Curso de Git Avanzado", "url": "gitavanzado"}]'
        });

        expect(arrayUltimosCursos[0].titulo).toBe("Git Básico");
        expect(arrayUltimosCursos[1].titulo).toBe("Git Avanzado");
        expect(doneFn).toHaveBeenCalledWith('[{"id": 1,"titulo": "Git Básico","descripcion": "Curso de Git Básico", "url": "gitbasico"}, {"id": 2, "titulo": "Git Avanzado", "descripcion": "Curso de Git Avanzado", "url": "gitavanzado"}]');
    });
});