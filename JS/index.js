/* let nombre = prompt("Ingrese aquí su nombre:");
let condicionCierre = false; */
let gastosArray = [];

/* function menuPrincipal() {
    while (!condicionCierre) {
        let eleccion = parseInt(prompt(`Hola ${nombre}, ¿en qué puedo ayudarte hoy?
Las funciones permitidas son:
1 - Calcular tu aumento por inflacion
2 - Gestor de gastos
3 - Mostrar gastos registrados
4 - Finalizar`));

        console.log("Opcion seleccionada:", eleccion);

        switch (eleccion) {
            case 1:
                console.log("Opcion seleccionada: aumento");
                aumento();
                break;

            case 2:
                console.log("Opcion seleccionada: gestorGastos");
                gestorGastos();
                break;

            case 3:
                console.log("Opcion seleccionada: mostrarGastos");
                mostrarGastos(gastosArray);
                break;

            case 4:
                console.log("Opcion seleccionada: Finalize");
                alert("Que sigas bien! Espero verte de nuevo pronto!");
                condicionCierre = true;
                break;

            default:
                alert("El valor ingresado no es válido, por favor ingrese un número del 1 al 4");
                break;
        }
    }
} */
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
            alert("Lo siento, solo podes ingresar un numero de meses entre 1 y 12");
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
    e.preventDefault(); // Evitar que el formulario se envíe
    aumento();
});


function gestorGastos() {
    while (true) {
        let descripcion = prompt("Ingrese la descripción de la compra:");
        if (!validarPalabra(descripcion)) {
            alert("La descripción debe contener solo letras y espacios.");
            console.log("La descripción debe contener solo letras y espacios.");
            continue;
        }

        let monto = obtenerMonto();
        if (monto === null) {
            alert("El monto debe ser un número válido mayor que cero.");
            console.log("El monto debe ser un número válido mayor que cero.");
            continue;
        }

        let metodoPago = obtenerMetodoPago();
        let fecha = new Date();
        let gasto = {
            descripcion: descripcion,
            monto: monto,
            metodo: metodoPago,
            fecha: changeDateFormat(fecha),
        }

        gastosArray.push(gasto);
        console.log(gastosArray);

        let otroGasto = prompt(`Quieres agregar otro gasto?
Si - Ingresar otro gasto
No - Volver al menú principal`).toLowerCase();

        if (otroGasto !== 'si' && otroGasto !== 'no') {
            alert("Respuesta inválida. Por favor, ingresa 'si' o 'no'.");
            otroGasto = prompt(`Quieres agregar otro gasto?
Si - Ingresar otro gasto
No - Volver al menú principal`).toLowerCase();
        } else if (otroGasto === 'no') {
            console.log("Volver al menú principal");
            //amenuPrincipal();
            break;
        } a
    }
};
console.log(gastosArray);
function validarPalabra(descripcion) {
    return /^[a-zA-Z\s]+$/.test(descripcion);
}
// Obtiene monto lo valida y si es correcto lo envia a monto para el array
function obtenerMonto() {
    let monto;
    while (true) {
        monto = parseFloat(prompt("Ingrese el monto de la compra:"));

        if (isNaN(monto) || monto <= 0) {
            alert("El monto debe ser un número válido mayor que cero.");
        } else {
            break;
        }
    }
    return monto;
};
// Obtiene monto lo valida y si es correcto lo envia a metodo para el array
function obtenerMetodoPago() {
    let metodoPago;
    do {
        metodoPago = parseInt(prompt("Ingrese el método de pago: \n 1 - Efectivo \n 2 - Debito \n 3 - Credito \n 4 - Otro"));
        if (!(metodoPago >= 1 && metodoPago <= 4)) {
            alert("Lo siento, solo puedes ingresar un número entre 1 y 4");
        }
    } while (!(metodoPago >= 1 && metodoPago <= 4));

    switch (metodoPago) {
        case 1:
            return "Efectivo";
        case 2:
            return "Debito";
        case 3:
            return "Credito";
        default:
            return "Otro";
    }
}



function mostrarGastos(gastosArray) {
    if (gastosArray.length === 0) {
        alert("No hay gastos registrados. Agrega gastos para ver la información.");
        return;
    } else {
        recorrerArray(gastosArray);
    }

    let opcionesFiltro = [
        "Filtrar por descripción",
        "Filtrar por método de pago",
        "Mostrar todos los gastos",
        "Volver al menú principal"
    ];

    let opcionSeleccionada = prompt(`Opciones de filtrado:\n\n1 - ${opcionesFiltro[0]}\n2 - ${opcionesFiltro[1]}\n3 - ${opcionesFiltro[2]}\n4 - ${opcionesFiltro[3]}`);

    switch (opcionSeleccionada) {
        case "1":
            mostrarOpcionesDescripciones(gastosArray);
            break;

        case "2":
            mostrarOpcionesMetodoPago(gastosArray);
            break;

        case "3":
            mostrarGastosFiltrados(gastosArray, null, null);
            break;

        default:
            alert("Volviendo al menú principal.");
            menuPrincipal();
            break;
    }
};

function mostrarOpcionesDescripciones(gastosArray) {
    let descripciones = gastosArray.map(gasto => gasto.descripcion);
    let opcionesDescripciones = [...new Set(descripciones)]; // Eliminar duplicados

    let descripcionSeleccionada = prompt(`Opciones de filtrado por descripción:\n\n${opcionesDescripciones.join('\n')}`);

    if (opcionesDescripciones.includes(descripcionSeleccionada)) {
        mostrarGastosFiltrados(gastosArray, descripcionSeleccionada, null);
    } else {
        alert("Descripción inválida. Volviendo al menú principal.");
    }
}

function mostrarOpcionesMetodoPago(gastosArray) {
    let metodosPago = gastosArray.map(gasto => gasto.metodo);
    let opcionesMetodosPago = [...new Set(metodosPago)]; // Eliminar duplicados

    let metodoPagoSeleccionado = prompt(`Opciones de filtrado por método de pago:\n\n${opcionesMetodosPago.join('\n')}`);

    if (opcionesMetodosPago.includes(metodoPagoSeleccionado)) {
        mostrarGastosFiltrados(gastosArray, null, metodoPagoSeleccionado);
    } else {
        alert("Método de pago inválido. Volviendo al menú principal.");
    }
}
function recorrerArray(gastosArray) {
    for (const gasto of gastosArray) {
        console.log(`Descripción: ${gasto.descripcion}`);
        console.log(`Monto: $ ${gasto.monto}`);
        console.log(`Método de pago: ${gasto.metodo}`);
        console.log(`Fecha: ${gasto.fecha}`);
        console.log("----");
    }
}

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
    let mensaje = "Lista de gastos:\n\n";

    for (const gasto of gastosFiltrados) {
        mensaje += `Descripción: ${gasto.descripcion}\n`;
        mensaje += `Monto: $ ${gasto.monto}\n`;
        mensaje += `Método de pago: ${gasto.metodo}\n`;
        mensaje += `Fecha: ${gasto.fecha}\n`;
        mensaje += "----\n";
        totalGastos += gasto.monto; // Acumulamos los montos
    }

    mensaje += `Total de gastos: $ ${totalGastos}`;

    alert(mensaje);
}


//create a function that will recieve the date of gasto and change it to dd/mm/aaaa formating
function changeDateFormat(fecha) {
    // this function reciever a date objets and converts it to a string like dd/mm/yyyy
    let day = fecha.getDate();
    let month = fecha.getMonth() + 1;
    let year = fecha.getFullYear();
    //now make it a padstart so a day or month with a single digit will be shown as a 0
    day = day.toString().padStart(2, "0");
    month = month.toString().padStart(2, "0");
    //now return the string in the required format

    return `${day}/${month}/${year}`;
};



// Llamar a la función principal con el array de gastos
mostrarGastos(gastosArray);
 * /