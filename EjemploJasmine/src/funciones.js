function ultimosCursos() {
  var xhttp;
  var arrayUltimosCursos = [];

  if (window.XMLHttpRequest) {
    // code for modern browsers
    xhttp = new XMLHttpRequest();
    } else {
    // code for IE6, IE5
    xhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var arrayCursos = JSON.parse(this.responseText);
        for (var i = 0; i < arrayCursos.length; i++) {
            var curso = new Curso(i,arrayCursos[i].titulo,arrayCursos[i].descripcion);
            arrayUltimosCursos.push(curso);
        }
        //Para realizar la prueba
        doneFn(this.responseText);        
    }
  };
  xhttp.open("GET", "/some/cool/url", true);
  xhttp.send();
  return arrayUltimosCursos;
}