"use strict";

var express = require('express');

var path = require('path');

var app = express();
var PORT = 3000; // Servir archivos estáticos (HTML, CSS, JS) desde la carpeta 'public'

app.use(express["static"](path.join(__dirname, 'public'))); // Base de datos de productos con la propiedad 'imagen' añadida

var productos = [{
  id: 1,
  nombre: "Laptop",
  precio: 14500,
  categoria: "Tecnología",
  imagen: "💻"
}, {
  id: 2,
  nombre: "Mouse Gamer",
  precio: 650,
  categoria: "Accesorios",
  imagen: "🖱️"
}, {
  id: 3,
  nombre: "Teclado Mecánico",
  precio: 1200,
  categoria: "Accesorios",
  imagen: "⌨️"
}, {
  id: 4,
  nombre: "Monitor Professional",
  precio: 3200,
  categoria: "Tecnología",
  imagen: "🖥️"
}, {
  id: 5,
  nombre: "Audífonos Bluetooth",
  precio: 980,
  categoria: "Audio",
  imagen: "🎧"
}, {
  id: 6,
  nombre: "Sony WH-1000XM5",
  precio: 7800,
  categoria: "Audio",
  imagen: "🎶"
}, {
  id: 7,
  nombre: "iPad Air",
  precio: 14000,
  categoria: "Tecnología",
  imagen: "📱"
}, {
  id: 8,
  nombre: "Hub USB-C Premium",
  precio: 850,
  categoria: "Accesorios",
  imagen: "🔌"
}]; // Ruta de la API que devuelve el JSON

app.get('/api/productos', function (req, res) {
  // Simulamos un retraso de 1.2 segundos para que se aprecie la animación de carga (Skeleton)
  setTimeout(function () {
    res.json(productos);
  }, 1200);
}); // Iniciar el servidor

app.listen(PORT, function () {
  console.log("\n\uD83D\uDE80 Servidor corriendo exitosamente.\n\uD83C\uDF0D Localhost: http://localhost:".concat(PORT, "\n\uD83D\uDCC2 Archivos servidos desde: ").concat(path.join(__dirname, 'public'), "\n    "));
});
//# sourceMappingURL=server.dev.js.map
