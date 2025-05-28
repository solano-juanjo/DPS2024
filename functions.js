document.addEventListener("DOMContentLoaded", () => {
    fetchCursos('http://localhost:5000/api/Curso/valorados', 'cursos-valorados-container');

});











// Añadir efectos de animación cuando se carga la página
window.addEventListener('load', function() {
    // Animar elementos principales con una entrada suave
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
