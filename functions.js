

        function hacerLlamadaAjax(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    var data = JSON.parse(xhr.responseText);
                    callback(data);
                } else {
                    console.error('Error al hacer la solicitud:', xhr.statusText);
                }
            };

            xhr.onerror = function() {
                console.error('Error en la conexión.');
            };

            xhr.send();
        }

        // Llamada 1: Obtener los últimos cursos publicados
        hacerLlamadaAjax('http://localhost:5000/api/Curso/ultimos', function(data) {
            console.log(data);
            var listaCursos = document.getElementById('cursos-recientes-lista');
            data.forEach(function(curso) {
                var li = document.createElement('li');
                li.textContent = curso;
                listaCursos.appendChild(li.titulo);
            });
        });

        // visio
        // Llamada 2: Obtener los cursos mejor valorados
        hacerLlamadaAjax('http://localhost:5000/api/autores', function(data) {
            console.log(data);
            var listaMejorValorados = document.getElementById('cursos-mejor-valorados-lista');
            data.forEach(function(curso) {
                var li = document.createElement('li');
                li.textContent = curso.nombre + ' - ' + curso.valoracion + ' estrellas';
                listaMejorValorados.appendChild(li);
            });
        });

        // Llamada 3: Obtener los autores mejor valorados
        hacerLlamadaAjax('http://localhost:5000/api/categorias', function(data) {
            console.log(data);
            var listaAutores = document.getElementById('autores-mejor-valorados-lista');
            data.forEach(function(autor) {
                var li = document.createElement('li');
                li.textContent = autor.nombre + ' - ' + autor.valoracion + ' puntos';
                listaAutores.appendChild(li);
            });
        });



