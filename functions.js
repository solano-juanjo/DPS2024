document.addEventListener("DOMContentLoaded", () => {
    fetchCursos('http://localhost:5000/api/Curso/ultimos', 'ultimos-cursos-container');
    fetchCursos('http://localhost:5000/api/Curso/valorados', 'cursos-valorados-container');
    fetchAutores('http://localhost:5000/api/autores', 'autores-valorados-container');
});





async function fetchCursos(endpoint, containerId) {

}







async function fetchCategorias(endpoint, containerId) {

}









async function fetchAutores(endpoint, containerId) {

}










window.addEventListener('load', function() {
    const elements = document.querySelectorAll('.list-group-item, .autor-card');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });
});