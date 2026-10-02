document.getElementById("guardar").onclick = function() {

    let nombre = document.getElementById("nombre").value;
    let edad = document.getElementById("edad").value;

    fetch("/contactos", {
        method: "POST",
        body: JSON.stringify({
            nombre: nombre,
            edad: edad
        })
    })
    .then(function(respuesta) {
        return respuesta.text();
    })
    .then(function(mensaje) {
        alert(mensaje);
    });

};