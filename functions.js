document.addEventListener("DOMContentLoaded", () => {

    fetchAutores('http://localhost:5000/api/autores', 'autores-valorados-container');
});









async function fetchAutores(endpoint, containerId) {
    try {
        const response = await fetch(endpoint);
        const autores = await response.json();
        const container = document.getElementById(containerId);
        
        let gridHTML = '<div class="d-flex flex-wrap gap-3 justify-content-center">';
        autores.forEach(autor => {
            gridHTML += `
                <div class="autor-card d-flex flex-column align-items-center p-3">
                    <div class="position-relative">
                        <img src="${autor.thumbnail}" class="rounded-circle shadow" alt="${autor.nombre}" style="width: 70px; height: 70px; object-fit: cover; border: 3px solid #fff;">
                        <span class="position-absolute bottom-0 end-0 badge rounded-pill bg-primary">
                            ⭐ ${autor.calificacion}
                        </span>
                    </div>
                    <h6 class="mt-3 mb-2 text-center fw-bold">${autor.nombre}</h6>
                    <div class="d-flex mt-1 gap-2">
                        <a href="#" class="btn btn-sm btn-outline-primary">Cursos</a>
                        <a href="#" class="btn btn-sm btn-primary">Perfil</a>
                    </div>
                </div>
            `;
        });
        gridHTML += '</div>';
        
        container.innerHTML = gridHTML;
    } catch (error) {
        console.error(`Error fetching autores from ${endpoint}:`, error);
        const container = document.getElementById(containerId);
        container.innerHTML = `<div class="alert alert-danger">Error al cargar los autores: ${error.message}</div>`;
    }
}









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
