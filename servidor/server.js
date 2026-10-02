const http = require("http");
const fs = require("fs");
const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync("datos.db");

db.exec("CREATE TABLE IF NOT EXISTS contactos (id INTEGER PRIMARY KEY, nombre TEXT, edad INTEGER)");

const servidor = http.createServer(function(req, res) {

    if (req.url == "/" && req.method == "GET") {
        res.end(fs.readFileSync("index.html"));
    }

    if (req.url == "/script.js" && req.method == "GET") {
        res.end(fs.readFileSync("script.js"));
    }

    if (req.url == "/contactos" && req.method == "POST") {
        console.log("Llegaron los datos");
        let datos = "";

        req.on("data", function(parte) {
            datos += parte;
        });

        req.on("end", function() {

            let contacto = JSON.parse(datos);

            let consulta = db.prepare(
                "INSERT INTO contactos (nombre, edad) VALUES (?, ?)"
            );

            consulta.run(contacto.nombre, contacto.edad);

            res.end("Contacto guardado");
        });
    }

});

servidor.listen(3000);