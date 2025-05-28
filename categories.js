

async function cargarCursosPorCategoria(idParaAPI, indice) {
    const resultadosContainer = document.getElementById('resultados-cursos');
    if (!resultadosContainer) return;
    
    try {
        resultadosContainer.innerHTML = `
            <div class="text-center py-3">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p class="mt-2">Cargando cursos de la categoría...</p>
            </div>
        `;
        
        const response = await fetch(`http://localhost:5000/api/Curso/categoria/${idParaAPI}`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const cursos = await response.json();
        mostrarCursos(cursos, resultadosContainer);
        
    } catch (error) {
        console.error(`Error cargando cursos de la categoría ${idParaAPI}:`, error);
        resultadosContainer.innerHTML = `
            <div class="alert alert-danger">
                Error al cargar los cursos: ${error.message}
            </div>
        `;
    }
}





function mostrarCursos(cursos, container) {
    if (!cursos || cursos.length === 0) {
        container.innerHTML = `
            <div class="alert alert-warning">
                <i class="fas fa-exclamation-triangle me-2"></i>
                No se encontraron cursos para esta categoría.
            </div>
        `;
        return;
    }
    
    let cursosCompletos = [...cursos];
    
    const numCursosReales = cursosCompletos.length;
    const proximoMultiploDeTres = Math.ceil(numCursosReales / 3) * 3;
    
    const elementosFaltantes = Math.max(proximoMultiploDeTres + 1, numCursosReales + 1) - numCursosReales;
    
    for (let i = 0; i < elementosFaltantes; i++) {
        cursosCompletos.push({
            titulo: "Curso próximamente",
            descripcion: "Nuevo curso estará disponible pronto.",
            calificacion: 0,
            esFicticio: true 
        });
    }
    
    let html = '<div class="row">';
    
    cursosCompletos.forEach((curso, index) => {
        let nombreCategoria = "Sin categoría";
        if (!curso.esFicticio && curso.categoriaId && categoriasGlobales.length > 0) {
            const categoria = categoriasGlobales.find(cat => cat.id == curso.categoriaId);
            if (categoria) {
                nombreCategoria = categoria.nombre;
            }
        }
        
        const estiloFicticio = curso.esFicticio ? 'opacity: 0.5;' : '';
        
        html += `
            <div class="col-md-4 mb-3">
                <div class="card h-100" style="${estiloFicticio}">
                    <div class="card-body">
                        <h5 class="card-title">${curso.titulo || 'Sin título'}</h5>
                        <p class="card-text small">${curso.descripcion || 'Sin descripción'}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            ${!curso.esFicticio ? `<span class="badge bg-light text-dark">${nombreCategoria}</span>` : ''}
                        </div>
                    </div>
                    <div class="card-footer bg-transparent">
                        <button class="btn btn-sm btn-primary w-100" ${curso.esFicticio ? 'disabled' : ''}>
                            ${curso.esFicticio ? 'Próximamente' : 'Ver curso'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        if ((index + 1) % 3 === 0 && index < cursosCompletos.length - 1) {
            html += '</div><div class="row">';
        }
    });
    
    html += '</div>';
    container.innerHTML = html;
}

