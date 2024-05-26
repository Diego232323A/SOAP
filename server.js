const soap = require('soap');
const http = require('http');
const fs = require('fs');

// Leer el archivo WSDL
const wsdlPath = './helloWorld.wsdl';
const wsdlContent = fs.readFileSync(wsdlPath, 'utf8');

// Definir las funciones del servicio
const service = {
  HelloWorldService: {
    HelloWorldPort: {
      HelloWorld: function(args) {
        return { greeting: "¡Hola, mundo!" };
      }
    }
  }
};

// Crear un servidor HTTP
const server = http.createServer(function(request, response) {
  // Verificar si la solicitud es para /wsdl
  if (request.url === '/wsdl') {
    response.writeHead(200, {'Content-Type': 'application/xml'});
    response.end(wsdlContent);
  } else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('404 Not Found');
  }
});

// Escuchar en el puerto 8000
server.listen(8000);

console.log('Servidor HTTP iniciado en http://localhost:8000');
