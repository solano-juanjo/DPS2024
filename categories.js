document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias();    
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaIndice = urlParams.get('categoria');
    
    if (!categoriaIndice) {
        cargarTodosLosCursos();
    }

    const categoriaSelector = document.getElementById('categoria-selector');
    if (categoriaSelector) {
        categoriaSelector.addEventListener('change', function() {
            const indice = this.value;            
            if (indice) {
                const idParaAPI = parseInt(indice) + 1;
                cargarCursosPorCategoria(idParaAPI, indice);             
                document.querySelectorAll('.categoria-item').forEach(item => {
                    item.classList.remove('active');
                });                
                document.querySelector(`.categoria-item[data-indice="${indice}"]`)?.classList.add('active');
            }
        });
    }
});



let categoriasGlobales = [];

async function cargarCategorias() {
    const sidebarContainer = document.getElementById('categorias-sidebar-container');
    const categoriaSelector = document.getElementById('categoria-selector');
    
    try {
        const response = await fetch('http://localhost:5000/api/categorias');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const categorias = await response.json();    
        categoriasGlobales = categorias;
        
        if (!categorias || categorias.length === 0) {
            if (sidebarContainer) {
                sidebarContainer.innerHTML = '<p>No hay categorías disponibles</p>';
            }
            return;
        }
        
        if (categoriaSelector) {
            let optionsHTML = '<option value="">Todas las categorías</option>';
            
            categorias.forEach((categoria, indice) => {
                optionsHTML += `<option value="${indice}">${categoria.nombre}</option>`;
            });
            categoriaSelector.innerHTML = optionsHTML;
        }
        
        if (sidebarContainer) {
            let sidebarHTML = '<ul class="list-group">';           
            categorias.forEach((categoria, indice) => {
                sidebarHTML += `
                    <li class="list-group-item categoria-item" data-id="${categoria.id}" data-indice="${indice}">
                        <a href="javascript:void(0)" class="text-decoration-none d-block">
                            ${categoria.nombre}
                        </a>
                    </li>
                `;
            });
            
            sidebarHTML += '</ul>';
            sidebarContainer.innerHTML = sidebarHTML;
            
            document.querySelectorAll('.categoria-item').forEach(item => {
                item.addEventListener('click', function() {
                    const indice = this.getAttribute('data-indice');
                    
                    if (categoriaSelector) {
                        categoriaSelector.value = indice;
                    }
                    
                    document.querySelectorAll('.categoria-item').forEach(i => {
                        i.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    const idParaAPI = parseInt(indice) + 1;
                    cargarCursosPorCategoria(idParaAPI, indice);
                    
                    const url = new URL(window.location);
                    url.searchParams.set('categoria', indice);
                    window.history.pushState({}, '', url);
                });
            });
            
            const urlParams = new URLSearchParams(window.location.search);
            const categoriaIndice = urlParams.get('categoria');
            
            if (categoriaIndice) {
                if (categoriaSelector) {
                    categoriaSelector.value = categoriaIndice;
                }
                
                const categoriaItem = document.querySelector(`.categoria-item[data-indice="${categoriaIndice}"]`);
                if (categoriaItem) {
                    categoriaItem.classList.add('active');
                    
                    const idParaAPI = parseInt(categoriaIndice) + 1;
                    cargarCursosPorCategoria(idParaAPI, categoriaIndice);
                }
            }
        }
        
    } catch (error) {
        console.error("Error cargando categorías:", error);
        if (sidebarContainer) {
            sidebarContainer.innerHTML = `
                <div  style="height: 850px; visitibility: hidden;"  class="alert alert-danger">
                    Error al cargar las categorías: ${error.message}
                </div>
            `;
        }
    }
}





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

