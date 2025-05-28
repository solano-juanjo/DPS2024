document.addEventListener("DOMContentLoaded", () => {
    fetchCursos('http://localhost:5000/api/Curso/ultimos', 'ultimos-cursos-container');
    fetchCursos('http://localhost:5000/api/Curso/valorados', 'cursos-valorados-container');
    fetchCategorias('http://localhost:5000/api/categorias', 'categorias-container')
    fetchAutores('http://localhost:5000/api/autores', 'autores-valorados-container');
});





async function fetchCursos(endpoint, containerId) {
    try {
        const response = await fetch(endpoint);
        const cursos = await response.json();
        const container = document.getElementById(containerId);
        
        // Crear una lista con tarjetas mejoradas
        let listaHTML = '<div class="list-group shadow-sm">';
        cursos.forEach(curso => {
            listaHTML += `
                <div class="list-group-item border-0 mb-2 rounded">
                    <div class="d-flex align-items-center py-2">
                        <div class="me-3" style="width: 120px; height: 80px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                            <img src="${curso.thumbnail}" class="rounded" alt="${curso.titulo}" style="max-width: 100%; max-height: 100%; object-fit: contain; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        </div>
                        <div class="flex-grow-1">
                            <h5 class="mb-1 fw-bold text-primary">${curso.titulo}</h5>
                            <p class="text-muted small mb-1" style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${curso.descripcion}</p>
                            <div class="d-flex align-items-center">
                                <span class="badge bg-primary me-2">Nuevo</span>
                                <small class="text-muted">Calificación: ⭐ ${curso.calificacion || "N/A"}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }); 
        listaHTML += '</div>';
        container.innerHTML = listaHTML;
    } catch (error) {
        console.error(`Error fetching cursos from ${endpoint}:`, error);
        const container = document.getElementById(containerId);
        container.innerHTML = `<div class="alert alert-danger">Error al cargar los cursos: ${error.message}</div>`;
    }
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
