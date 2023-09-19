

const formularioAumento = document.getElementById("formularioAumento");
const sueldoEl = document.getElementById("sueldo-el");
const mesesEl = document.getElementById("meses-el");

let inflacion = []; //[8, 7, 6, 9, 11, 10, 8, 5, 7, 13, 15, 9]

function aumento() {
    let sueldoActual = parseFloat(sueldoEl.value);
    let mesesSinaumento;

    do {
        mesesSinaumento = parseFloat(mesesEl.value);
        if (mesesSinaumento > 12 || mesesSinaumento <= 0) {
            mostrarError("Lo siento, solo podes ingresar un numero de meses entre 1 y 12");
            break;
        }
    }
    while (mesesSinaumento > 12 || mesesSinaumento <= 0);

    let nuevoSueldo = sueldoActual;

    for (let i = 11; i >= (12 - mesesSinaumento); i--) {
        let tasaDecimal = inflacion[i] / 100;
        nuevoSueldo = (1 + tasaDecimal) * nuevoSueldo;
        console.log(`indice:${i} , interes${nuevoSueldo}`);
    }
    document.getElementById("sueldoActualizado").innerHTML = (`Tu sueldo actualizado a la inflacion de los ultimos ${mesesSinaumento} meses deberia ser de  $${nuevoSueldo.toFixed(2)} por mes.`);
}
formularioAumento.addEventListener("submit", function (e) {
    e.preventDefault();
    const sueldoValue = parseFloat(sueldoEl.value);
    const mesesValue = parseFloat(mesesEl.value);

    //ternario para mostar error
    (isNaN(sueldoValue) || isNaN(mesesValue)) ? mostrarError("Debes completar todos los campos") : aumento();
});

// Trae los elementos del HTML
const formularioGastos = document.getElementById("formularioGastos");
console.log(formularioGastos);

const descripcionEl = document.getElementById("descripcion-el");
;
const montoEl = document.getElementById("monto-el");

const metodoPagoEl = document.getElementById("metodoPago-el");


let gastosArray = [];
let descripcionesUnicas = [];

function gestorGastos() {


    let descripcion = descripcionEl.value;
    if (!validarPalabra(descripcion)) {
        return; // Sale del flujo si hay un error
    }

    let monto = obtenerMonto();
    if (monto === null) {
        return; // Sale del flujo si hay un error
    }

    let metodoPago = obtenerMetodoPago();
    if (metodoPago === null) {
        return; // Sale del flujo si hay un error
    }

    let fecha = new Date();

    let gasto = {
        id: generarIdUnico(),
        descripcion: descripcion,
        monto: monto,
        metodo: metodoPago,
        fecha: changeDateFormat(fecha),
    };

    gastosArray.push(gasto);
    if (!descripcionesUnicas.includes(descripcion)) {
        descripcionesUnicas.push(descripcion);
        actualizarListaDesplegable(descripcionesUnicas);
    }
    guardarEnLocalStorage();
    lanzarToast('Se ha agregado un nuevo gasto')

    console.log(gastosArray);
    mostrarGastosFiltrados(gastosArray, null, null)

};

function actualizarListaDesplegable(descripciones) {
    const descripcionBusquedaEl = document.getElementById("descripcionBusqueda");
    descripcionBusquedaEl.innerHTML = ""; // Limpia la lista desplegable

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Seleccionar descripción";
    descripcionBusquedaEl.appendChild(defaultOption);

    for (const descripcion of descripciones) {
        const option = document.createElement("option");
        option.value = descripcion;
        option.text = descripcion;
        descripcionBusquedaEl.appendChild(option);
    }
}

function generarIdUnico() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function mostrarError(mensaje) {
    const errorModalBody = document.getElementById("errorModalBody");
    errorModalBody.textContent = mensaje;

    // Muestra el modal de error utilizando Bootstrap 5
    const myModal = new bootstrap.Modal(document.getElementById('errorModal'));
    myModal.show();
};

function validarPalabra(descripcion) {
    if (!/^[a-zA-Z\s]+$/.test(descripcion)) {
        mostrarError("La descripción debe contener solo letras y espacios.");
        return false;
    }
    return true;
}
function obtenerMonto() {
    let monto = montoEl.value;
    if (isNaN(monto) || monto <= 0 || monto === "" || monto === null) {
        mostrarError("El monto debe ser un número válido mayor que cero.");
        return null; // Devuelve null en caso de error
    }
    return monto;
}

// recibe newdate() y devuelve string dd/mm/yyyy
function changeDateFormat(fecha) {
    let day = fecha.getDate();
    let month = fecha.getMonth() + 1;
    let year = fecha.getFullYear();
    //agrega 0 adelante a los dias menores y meses menores a 10
    day = day.toString().padStart(2, "0");
    month = month.toString().padStart(2, "0");


    return `${day}/${month}/${year}`;
};


function obtenerMetodoPago() {
    let metodoPago = metodoPagoEl.value;
    if (
        metodoPago !== "Efectivo" &&
        metodoPago !== "Debito" &&
        metodoPago !== "Credito" &&
        metodoPago !== "Otro"
    ) {
        mostrarError("Lo siento, solo puedes ingresar método de pago de la lista.");
        return null; // Devuelve null en caso de error
    }
    return metodoPago;
};

formularioGastos.addEventListener("submit", function (e) {
    e.preventDefault();
    gestorGastos();
});


function mostrarGastosFiltrados(gastosArray, descripcionBusqueda, metodoPagoBusqueda) {
    let gastosFiltrados = gastosArray.filter(gasto => {
        let matchDescripcion = true;
        let matchMetodoPago = true;

        if (descripcionBusqueda) {
            matchDescripcion = gasto.descripcion.toLowerCase().includes(descripcionBusqueda.toLowerCase());
        }

        if (metodoPagoBusqueda) {
            matchMetodoPago = gasto.metodo.toLowerCase() === metodoPagoBusqueda.toLowerCase();
        }

        return matchDescripcion && matchMetodoPago;
    });

    if (gastosFiltrados.length === 0) {
        let tablaGastosBody = document.getElementById("tablaGastosBody");
        tablaGastosBody.innerHTML = "";
        alert("No se encontraron gastos con los filtros seleccionados.");
        return;
    }

    let totalGastos = 0;
    let tablaGastosBody = document.getElementById("tablaGastosBody");
    tablaGastosBody.innerHTML = ""; // Limpiar la tabla antes de llenarla nuevamente

    for (const gasto of gastosFiltrados) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${gasto.descripcion}</td>
            <td>$ ${gasto.monto}</td>
            <td>${gasto.metodo}</td>
            <td>${gasto.fecha}</td>
            <td><button class="btn btn-danger btn-sm" data-gasto-id="${gasto.id}">Eliminar</button></td>
        `;
        tablaGastosBody.appendChild(row);


        totalGastos += parseFloat(gasto.monto); // Sumar el monto del gasto al total
        const eliminarBoton = row.querySelector("button");
        eliminarBoton.addEventListener("click", function () {
            const gastoId = this.getAttribute("data-gasto-id");
            eliminarGasto(gastoId);
        });
    }


    // Actualizar el total de gastos en el párrafo correspondiente
    const totalGastosElement = document.getElementById("totalGastos");
    totalGastosElement.textContent = `Total de gastos: $ ${totalGastos.toFixed(2)}`;
};

function eliminarGasto(gastoId) {
    console.log(gastoId);

    // Filtrar el array de gastos para eliminar el gasto con el ID correspondiente
    gastosArray = gastosArray.filter(gasto => gasto.id !== gastoId);
    console.log(gastosArray);
    mostrarGastosFiltrados(gastosArray, null, null);

    // Actualizar el total de gastos después de eliminar un gasto
    actualizarTotalGastos();
    guardarEnLocalStorage();
    //mostrar toast
    lanzarToast('Se ha eliminado un gasto')
}

function guardarEnLocalStorage() {
    // Convierte el arreglo gastosArray a JSON
    const datosJSON = JSON.stringify(gastosArray);

    // Guarda los datos JSON en LocalStorage bajo una clave específica
    localStorage.setItem('mis_gastos', datosJSON);

};

function lanzarToast(mensaje) {
    Toastify({
        text: mensaje,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
}

function actualizarTotalGastos() {
    let totalGastos = 0;
    for (const gasto of gastosArray) {
        totalGastos += parseFloat(gasto.monto);
    }

    const totalGastosElement = document.getElementById("totalGastos");
    totalGastosElement.textContent = `Total de gastos: $ ${totalGastos.toFixed(2)}`;
};

const btnFiltrar = document.getElementById("btn-filtrar");
btnFiltrar.addEventListener("click", function () {
    const descripcionBusqueda = document.getElementById("descripcionBusqueda").value;
    const metodoPagoBusqueda = document.getElementById("metodoPagoBusqueda").value;

    mostrarGastosFiltrados(gastosArray, descripcionBusqueda, metodoPagoBusqueda);
});


async function obtenerDatos() {
    const cantidadDatos = 12;
    try {
        const url = `https://apis.datos.gob.ar/series/api/series/?ids=173.1_INUCLEOLEO_DIC-_0_10&limit=${cantidadDatos}&sort=desc`;
        const response = await fetch(url);
        const dataJson = await response.json();
        const { data } = dataJson;
        inflacion = data.map(([fecha, ipc]) => ipc * 100) //destructuro el elemento del map para usar solo su segunda posicion del array
        console.log(inflacion)
    } catch (error) {
        lanzarToast('Se genero un error al intentar llegar a la api')
    }
}

window.addEventListener("load", function cargarDesdeLocalStorage() {
    const datosJSON = localStorage.getItem('mis_gastos');

    obtenerDatos();

    if (datosJSON) {
        // Si se encuentran datos en LocalStorage, conviértelos de JSON a un arreglo
        gastosArray = JSON.parse(datosJSON);

        gastosArray.forEach(gasto => {
            const descripcion = gasto.descripcion;
            if (!descripcionesUnicas.includes(descripcion)) {
                descripcionesUnicas.push(descripcion);
                actualizarListaDesplegable(descripcionesUnicas);
            }
        });
        // Actualiza la lista desplegable y muestra los gastos filtrados
        mostrarGastosFiltrados(gastosArray, null, null);
    }
});