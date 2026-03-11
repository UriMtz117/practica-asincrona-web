"use strict";

var btnCargar = document.getElementById("btnCargar");
var lista = document.getElementById("listaProductos");
var mensaje = document.getElementById("mensaje");
var loader = document.getElementById("loader");
var buscador = document.getElementById("buscador");
var filtro = document.getElementById("filtroCategoria");
var productosData = []; // Cache de datos
// Cargar al iniciar la página

window.addEventListener("DOMContentLoaded", cargarProductos);
btnCargar.addEventListener("click", cargarProductos);

function cargarProductos() {
  var respuesta;
  return regeneratorRuntime.async(function cargarProductos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          lista.innerHTML = "";
          loader.classList.remove("hidden");
          mensaje.textContent = "Sincronizando con el servidor...";
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch("/api/productos"));

        case 6:
          respuesta = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(respuesta.json());

        case 9:
          productosData = _context.sent;
          renderizar(productosData);
          mensaje.textContent = "";
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](3);
          mensaje.textContent = "❌ Error de conexión";
          console.error(_context.t0);

        case 18:
          _context.prev = 18;
          loader.classList.add("hidden");
          return _context.finish(18);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 14, 18, 21]]);
}

function renderizar(datos) {
  lista.innerHTML = "";

  if (datos.length === 0) {
    lista.innerHTML = "<p class=\"status-msg\">No se encontraron productos que coincidan.</p>";
    return;
  }

  datos.forEach(function (p) {
    var tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.innerHTML = "\n            <span class=\"icon\">".concat(p.imagen, "</span>\n            <span class=\"categoria\">").concat(p.categoria, "</span>\n            <h3>").concat(p.nombre, "</h3>\n            <span class=\"precio\">$").concat(p.precio.toLocaleString(), "</span>\n        ");
    lista.appendChild(tarjeta);
  });
} // Lógica combinada de búsqueda y filtro


function filtrar() {
  var texto = buscador.value.toLowerCase();
  var cat = filtro.value;
  var resultados = productosData.filter(function (p) {
    var coincideNombre = p.nombre.toLowerCase().includes(texto);
    var coincideCat = cat === "todos" || p.categoria === cat;
    return coincideNombre && coincideCat;
  });
  renderizar(resultados);
}

buscador.addEventListener("input", filtrar);
filtro.addEventListener("change", filtrar);
//# sourceMappingURL=app.dev.js.map
