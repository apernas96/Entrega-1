

const formularioAumento = document.getElementById("formularioAumento");
const sueldoEl = document.getElementById("sueldo-el");
const mesesEl = document.getElementById("meses-el");

function aumento() {
    let sueldoActual = parseFloat(sueldoEl.value);
    let mesesSinaumento;
    const inflacion = [8, 7, 6, 9, 11, 10, 8, 5, 7, 13, 15, 9];

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
    if (isNaN(sueldoValue) || isNaN(mesesValue)) {
        mostrarError("Debes completar todos los campos");
        return
    } else {
        aumento();
    }
});


const formularioGastos = document.getElementById("formularioGastos");
console.log(formularioGastos);
const descripcionEl = document.getElementById("descripcion-el");
// console.log(descripcion);
const montoEl = document.getElementById("monto-el");
// console.log(monto);
const metodoPagoEl = document.getElementById("metodoPago-el");
// console.log(metodoPago);

let gastosArray = [];

function gestorGastos() {


    let descripcion = descripcionEl.value;
    if (!validarPalabra(descripcion)) {
        return; // Sal del flujo si hay un error
    }

    let monto = obtenerMonto();
    if (monto === null) {
        return; // Sal del flujo si hay un error
    }

    let metodoPago = obtenerMetodoPago();
    if (metodoPago === null) {
        return; // Sal del flujo si hay un error
    }

    let fecha = new Date();

    let gasto = {
        descripcion: descripcion,
        monto: monto,
        metodo: metodoPago,
        fecha: changeDateFormat(fecha),
    };

    gastosArray.push(gasto);
    console.log(gastosArray);
    mostrarGastosFiltrados(gastosArray, null, null)

};



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
        `;
        tablaGastosBody.appendChild(row);


        totalGastos += parseFloat(gasto.monto); // Sumar el monto del gasto al total
    }


    // Actualizar el total de gastos en el párrafo correspondiente
    const totalGastosElement = document.getElementById("totalGastos");
    totalGastosElement.textContent = `Total de gastos: $ ${totalGastos.toFixed(2)}`;
};
const btnFiltrar = document.getElementById("btn-filtrar");
btnFiltrar.addEventListener("click", function () {
    const descripcionBusqueda = document.getElementById("descripcionBusqueda").value;
    const metodoPagoBusqueda = document.getElementById("metodoPagoBusqueda").value;

    mostrarGastosFiltrados(gastosArray, descripcionBusqueda, metodoPagoBusqueda);
});