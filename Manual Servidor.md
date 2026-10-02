# Manual: Formulario web conectado a una base de datos SQLite

## 1. Preparación del proyecto

### Objetivo

El objetivo es crear una página web sencilla que permita ingresar un
nombre y una edad y guardar esos datos en una base de datos SQLite.

El proyecto utiliza:

-   HTML para crear el formulario.
-   JavaScript para tomar los datos y enviarlos.
-   Node.js para crear el servidor.
-   SQLite para guardar los datos.
-   Un archivo `datos.db` para almacenar la base de datos.

### Estructura del proyecto

La carpeta del proyecto contiene:

``` text
agenda/
├── index.html
├── script.js
├── server.js
└── datos.db
```

El archivo `datos.db` se crea automáticamente cuando se inicia el
servidor por primera vez.

### Requisitos

Se necesita:

1.  Node.js instalado.
2.  Visual Studio Code.
3.  Una extensión de SQLite para visualizar `datos.db`.

### Iniciar el proyecto

Abrir la terminal de VS Code dentro de la carpeta del proyecto y
ejecutar:

``` bash
node server.js
```

Después abrir en el navegador:

``` text
http://localhost:3000
```

------------------------------------------------------------------------

## 2. Funcionamiento y explicación

### HTML

El archivo `index.html` crea el formulario.

Tiene dos campos:

``` html
<input type="text" id="nombre">
<input type="number" id="edad">
```

El primero permite escribir el nombre y el segundo permite ingresar la
edad.

El botón:

``` html
<button id="guardar">Guardar</button>
```

permite enviar los datos.

Al final se carga el archivo JavaScript:

``` html
<script src="script.js"></script>
```

Esto permite que la página utilice el código de `script.js`.

### JavaScript

En `script.js` se detecta cuando el usuario presiona el botón:

``` javascript
document.getElementById("guardar").onclick = function() {
```

Después se obtienen los valores de los campos:

``` javascript
let nombre = document.getElementById("nombre").value;
let edad = document.getElementById("edad").value;
```

Luego se utiliza `fetch()` para enviar los datos al servidor:

``` javascript
fetch("/contactos", {
    method: "POST",
    body: JSON.stringify({
        nombre: nombre,
        edad: edad
    })
})
```

`POST` indica que estamos enviando información.

`JSON.stringify()` convierte los datos en un formato que puede enviarse
al servidor.

Después se recibe la respuesta del servidor:

``` javascript
.then(function(respuesta) {
    return respuesta.text();
})
```

Finalmente se muestra el mensaje:

``` javascript
.then(function(mensaje) {
    alert(mensaje);
});
```

Si todo funciona correctamente, aparece:

``` text
Contacto guardado
```

### Servidor Node.js

El archivo `server.js` crea el servidor.

Primero se cargan las herramientas necesarias:

``` javascript
const http = require("http");
const fs = require("fs");
const { DatabaseSync } = require("node:sqlite");
```

`http` permite crear el servidor.

`fs` permite leer archivos.

`DatabaseSync` permite trabajar con SQLite.

Después se abre o crea la base de datos:

``` javascript
const db = new DatabaseSync("datos.db");
```

Si `datos.db` no existe, SQLite lo crea.

Luego se crea la tabla:

``` javascript
db.exec("CREATE TABLE IF NOT EXISTS contactos (id INTEGER PRIMARY KEY, nombre TEXT, edad INTEGER)");
```

La tabla tiene tres columnas:

-   `id`: identifica cada contacto.
-   `nombre`: guarda el nombre.
-   `edad`: guarda la edad.

El servidor recibe las solicitudes:

``` javascript
const servidor = http.createServer(function(req, res) {
```

Cuando el navegador solicita la página principal, el servidor entrega
`index.html`:

``` javascript
if (req.url == "/" && req.method == "GET") {
    res.end(fs.readFileSync("index.html"));
}
```

Cuando el navegador solicita `script.js`, el servidor también lo
entrega:

``` javascript
if (req.url == "/script.js" && req.method == "GET") {
    res.end(fs.readFileSync("script.js"));
}
```

Cuando se reciben los datos enviados por JavaScript:

``` javascript
if (req.url == "/contactos" && req.method == "POST") {
```

el servidor los recibe:

``` javascript
let datos = "";

req.on("data", function(parte) {
    datos += parte;
});
```

Después convierte los datos recibidos a un objeto:

``` javascript
let contacto = JSON.parse(datos);
```

Finalmente prepara la consulta SQL:

``` javascript
let consulta = db.prepare(
    "INSERT INTO contactos (nombre, edad) VALUES (?, ?)"
);
```

Y la ejecuta:

``` javascript
consulta.run(contacto.nombre, contacto.edad);
```

Esto guarda el nombre y la edad en la tabla `contactos`.

El servidor responde:

``` javascript
res.end("Contacto guardado");
```

Por último, el servidor comienza a escuchar en el puerto 3000:

``` javascript
servidor.listen(3000);
```

------------------------------------------------------------------------

## 3. Demostración de funcionamiento

Para demostrar que el proyecto funciona:

### Paso 1: iniciar el servidor

En la terminal:

``` bash
node server.js
```

### Paso 2: abrir la página

En el navegador:

``` text
http://localhost:3000
```

### Paso 3: ingresar datos

Por ejemplo:

``` text
Nombre: Bautista
Edad: 18
```

Presionar **Guardar**.

### Paso 4: comprobar el mensaje

El navegador muestra:

``` text
Contacto guardado
```

### Paso 5: comprobar la base de datos

Abrir `datos.db` con una extensión de SQLite en Visual Studio Code.

Dentro de la tabla `contactos` aparecerá el registro guardado, por
ejemplo:

    id nombre       edad
  ---- ---------- ------
     1 Bautista       18

Esto demuestra que los datos pasaron desde el formulario web, mediante
JavaScript y Node.js, hasta la base de datos SQLite.

------------------------------------------------------------------------

## Resumen del funcionamiento

El proceso completo es:

``` text
Usuario
   ↓
Formulario HTML
   ↓
script.js
   ↓
fetch()
   ↓
server.js
   ↓
SQLite
   ↓
datos.db
```

De esta manera se puede enviar información desde una página web y
almacenarla en una base de datos local sin utilizar XAMPP ni MySQL.
