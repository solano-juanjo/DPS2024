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



