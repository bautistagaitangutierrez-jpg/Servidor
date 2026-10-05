Manual del proyecto
1. ¿Qué necesitamos?

Para hacer el proyecto usamos:

Visual Studio Code
Node.js
SQLite
Una extensión de SQLite para ver la base de datos

Los archivos que usamos son:

index.html
style.css
script.js
server.js
datos.db

La página tiene dos campos: uno para el nombre y otro para la edad.

2. ¿Cómo funciona?

Primero abrimos la terminal en la carpeta del proyecto y ponemos:

node server.js

Después entramos desde el navegador a:

http://localhost:3000

Ahí aparece el formulario.

Cuando escribimos un nombre y una edad y apretamos Guardar, script.js toma esos datos y los manda a server.js.

Por ejemplo:

Nombre: Bautista
Edad: 18

JavaScript manda esos datos al servidor usando fetch().

En server.js se reciben los datos y se hace una consulta SQL:

INSERT INTO contactos (nombre, edad) VALUES (?, ?)

Con esa consulta los datos se guardan en la tabla contactos de datos.db.

El archivo datos.db lo creamos previamente y contiene la tabla:

contactos

con las columnas:

id
nombre
edad
3. Prueba del proyecto

Para comprobar que funciona:

Ejecutamos:
node server.js
Abrimos:
http://localhost:3000
Escribimos un nombre y una edad.
Apretamos Guardar.
Aparece el mensaje:
Contacto guardado
Abrimos datos.db con SQLite Viewer.
Entramos a la tabla contactos.

Ahí podemos ver los datos que acabamos de guardar.

Por ejemplo:

id	nombre	edad
1	Bautista	18
Resumen

El funcionamiento es:

Formulario
↓
JavaScript
↓
Node.js
↓
SQLite
↓
datos.db

El HTML muestra el formulario, CSS le da el diseño, JavaScript manda los datos, Node.js recibe la información y SQLite la guarda.
