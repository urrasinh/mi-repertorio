const http = require("http")
const url = require('url')
const { insertar, editar, consultar,  eliminar } = require("./consultas")
const fs = require('fs') 

http.createServer(async (req, res) => {
    if (req.url == "/" && req.method === "GET") {
        res.setHeader("content-type", "text/html")
        const html = fs.readFileSync("index.html", "utf8")
        res.end(html)
    }

    if ((req.url == "/cancion" && req.method === "POST")) {
        let body = ""
        req.on("data", (chunk) => {
            body += chunk
        })
        req.on("end", async () => {
            
            const bodyObject = JSON.parse(body)
            const datos = [bodyObject.cancion, bodyObject.artista, bodyObject.tono ]
            
            const respuesta = await insertar(datos)
            
            
            if (respuesta) {
                res.writeHead(201, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(respuesta));

            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({
                    message: `El ejercicio '${bodyObject.nombre}' ya existe`
                }));
            }

        })
    }

   
    if (req.url == "/canciones" && req.method === "GET") {
        // Paso 2
        const registros = await consultar()
        // Paso 3
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(registros))
    }


    if (req.url == "/cancion" && req.method == "PUT") {
        let body = ""
        req.on("data", (chunk) => {
            body += chunk
        })
        req.on("end", async () => {
            const bodyObject = JSON.parse(body)
            const datos = [bodyObject.cancion, bodyObject.artista, bodyObject.tono, bodyObject.id]
            const respuesta = await editar(datos)
            res.end(JSON.stringify(respuesta))
        })
    }

    if (req.url.startsWith("/cancion?") && req.method == "DELETE") {
        
        const { id } = url.parse(req.url, true).query
        
        const respuesta = await eliminar(id)
        res.end(JSON.stringify(respuesta))
    }

})


.listen(3000)
