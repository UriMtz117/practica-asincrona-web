const btnCargar = document.getElementById("btnCargar");
const lista = document.getElementById("listaProductos");
const mensaje = document.getElementById("mensaje");
const loader = document.getElementById("loader");
const buscador = document.getElementById("buscador");
const filtro = document.getElementById("filtroCategoria");

let productosData = []; // Cache de datos

// Cargar al iniciar la página
window.addEventListener("DOMContentLoaded", cargarProductos);
btnCargar.addEventListener("click", cargarProductos);

async function cargarProductos() {
    lista.innerHTML = "";
    loader.classList.remove("hidden");
    mensaje.textContent = "Sincronizando con el servidor...";

    try {
        const respuesta = await fetch("/api/productos");
        productosData = await respuesta.json();
        
        renderizar(productosData);
        mensaje.textContent = "";
    } catch (error) {
        mensaje.textContent = "❌ Error de conexión";
        console.error(error);
    } finally {
        loader.classList.add("hidden");
    }
}

function renderizar(datos) {
    lista.innerHTML = "";
    
    if (datos.length === 0) {
        lista.innerHTML = `<p class="status-msg">No se encontraron productos que coincidan.</p>`;
        return;
    }

    datos.forEach(p => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.innerHTML = `
            <span class="icon">${p.imagen}</span>
            <span class="categoria">${p.categoria}</span>
            <h3>${p.nombre}</h3>
            <span class="precio">$${p.precio.toLocaleString()}</span>
        `;
        lista.appendChild(tarjeta);
    });
}

// Lógica combinada de búsqueda y filtro
function filtrar() {
    const texto = buscador.value.toLowerCase();
    const cat = filtro.value;

    const resultados = productosData.filter(p => {
        const coincideNombre = p.nombre.toLowerCase().includes(texto);
        const coincideCat = (cat === "todos" || p.categoria === cat);
        return coincideNombre && coincideCat;
    });

    renderizar(resultados);
}

buscador.addEventListener("input", filtrar);
filtro.addEventListener("change", filtrar);