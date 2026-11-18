// Dirección de la API del backend.
const URL_API = "http://localhost:3000/api/perks";

// Elementos del HTML que utilizaremos.
const tablaProductos = document.getElementById("tablaProductos");
const mensaje = document.getElementById("mensaje");
const buscarNombre = document.getElementById("buscarNombre");
const filtroCategoria = document.getElementById("filtroCategoria");
const limpiarFiltros = document.getElementById("limpiarFiltros");

// Arreglo que almacenará los perks obtenidos desde la API.
let perks = [];

// Obtiene los perks desde el backend y los muestra en la página.
async function cargarPerks() {
    try {
        mensaje.textContent = "Cargando perks...";

        // Realiza una solicitud al servidor.
        const respuesta = await fetch(URL_API);

        // Comprueba si la respuesta del servidor fue correcta.
        if (!respuesta.ok) {
            throw new Error("Error del servidor: " + respuesta.status);
        }

        // Convierte la respuesta a formato JSON.
        perks = await respuesta.json();

        // Carga las categorías y muestra los perks.
        cargarCategorias();
        mostrarPerks(perks);

        mensaje.textContent = "Se encontraron " + perks.length + " perks.";

    } catch (error) {
        // Muestra un mensaje si ocurre algún problema con la conexión.
        console.error("Error al cargar los perks:", error);
        mensaje.textContent = "No fue posible cargar los datos. Revisa el servidor y la conexión.";
    }
}

// Obtiene las categorías disponibles y las agrega al selector.
function cargarCategorias() {
    const categorias = [];

    // Recorre los perks para encontrar sus categorías sin repetirlas.
    for (const perk of perks) {
        if (!categorias.includes(perk.categoria)) {
            categorias.push(perk.categoria);
        }
    }

    // Ordena las categorías alfabéticamente.
    categorias.sort();

    // Limpia las opciones anteriores del selector.
    filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>';

    // Crea una opción para cada categoría encontrada.
    for (const categoria of categorias) {
        const opcion = document.createElement("option");
        opcion.value = categoria;
        opcion.textContent = categoria;
        filtroCategoria.appendChild(opcion);
    }
}

// Muestra los perks recibidos dentro de la tabla HTML.
function mostrarPerks(lista) {
    tablaProductos.innerHTML = "";

    if (lista.length === 0) {
        tablaProductos.innerHTML = '<tr><td colspan="6">No hay resultados.</td></tr>';
        return;
    }

    for (const perk of lista) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>
                <img src="${perk.imagen}" alt="${perk.nombre}" class="imagen-perk">
            </td>
            <td>${perk.nombre}</td>
            <td>${perk.descripcion ?? ""}</td>
            <td>${perk.categoria}</td>
            <td>${perk.obtencion}</td>
            <td>${Number(perk.precio).toLocaleString("es-CL")} puntos</td>
        `;

        tablaProductos.appendChild(fila);
    }
}

// Filtra los perks según el nombre escrito y la categoría seleccionada.
function filtrarPerks() {
    const texto = buscarNombre.value.toLowerCase().trim();
    const categoria = filtroCategoria.value;

    const resultado = perks.filter(perk => {
        // Comprueba si el nombre contiene el texto buscado.
        const coincideNombre = perk.nombre.toLowerCase().includes(texto);

        // Comprueba si coincide con la categoría seleccionada.
        const coincideCategoria = categoria === "" || perk.categoria === categoria;

        return coincideNombre && coincideCategoria;
    });

    // Actualiza la tabla y el mensaje de resultados.
    mostrarPerks(resultado);
    mensaje.textContent = "Resultados: " + resultado.length;
}

// Ejecuta el filtro cada vez que se escribe en el buscador.
buscarNombre.addEventListener("input", filtrarPerks);

// Ejecuta el filtro cuando cambia la categoría seleccionada.
filtroCategoria.addEventListener("change", filtrarPerks);

// Limpia los filtros y vuelve a mostrar todos los perks.
limpiarFiltros.addEventListener("click", () => {
    buscarNombre.value = "";
    filtroCategoria.value = "";

    mostrarPerks(perks);
    mensaje.textContent = "Se muestran " + perks.length + " perks.";
});

// Inicia la carga de los datos cuando se ejecuta el archivo.
cargarPerks();
