let nombre = prompt("Ingrese aquí su nombre:");
let condicionCierre = false;
let gastosArray = [];

function menuPrincipal() {
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
}
menuPrincipal();
function aumento() {
    let sueldoActual = parseFloat(prompt("Ingrese su sueldo actual:"));
    let mesesSinaumento;
    const inflacion = [8, 7, 6, 9, 11, 10, 8, 5, 7, 13, 15, 9];

    do {
        mesesSinaumento = parseInt(prompt("Cuantos meses hace que no te aumetan?"));
        if (mesesSinaumento > 12 || mesesSinaumento <= 0) {
            alert("Lo siento, solo podes ingresar un numero de meses entre 1 y 12");
        }
    }
    while (mesesSinaumento > 12 || mesesSinaumento <= 0);

    let nuevoSueldo = sueldoActual;

    for (let i = 11; i >= (12 - mesesSinaumento); i--) {
        let tasaDecimal = inflacion[i] / 100;
        nuevoSueldo = (1 + tasaDecimal) * nuevoSueldo;
        console.log(`indice:${i} , interes${nuevoSueldo}`);
    }
    alert(`Tu sueldo actualizado a la inflacion de los ultimos ${mesesSinaumento} meses deberia ser de ${nuevoSueldo.toFixed(2)}.`);
}


function gestorGastos() {
    let correr = true
    while (correr) {
        let descripcion = prompt("Ingrese la descripción de la compra:");
        let monto = parseFloat(prompt("Ingrese el monto de la compra:"));
        let metodoPago = obtenerMetodoPago();
        let fecha = new Date();
        let gasto = {
            descripcion: descripcion,
            monto: monto,
            metodo: metodoPago,
            fecha: fecha,
        }

        gastosArray.push(gasto);
        console.log(gastosArray);
        correr = prompt(`Quieres agregar otro gasto?
        Si - Ingresar otro gasto
        No - Volver al menu principal`).toLowerCase();

        if (correr === 'si') { correr = true; }
        else if (correr === 'no') {
            correr = false;
            console.log("Volver al menu principal ");
            menuPrincipal();
        }
        else {
            alert("Lo siento, solo puedes ingresar si o no");
        }
    }
}
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

menuPrincipal();
function mostrarGastos(gastos) {
    if (gastos.length === 0) {
        alert("No hay gastos registrados. Agrega gastos para ver la información.");
        return; // Salir de la función si no hay gastos
    }

    console.log("Lista de todos los gastos:");
    for (let i = 0; i < gastos.length; i++) {
        let gasto = gastos[i];
        console.log(`Descripción: ${gasto.descripcion}`);
        console.log(`Monto: ${gasto.monto}`);
        console.log(`Método de pago: ${gasto.metodo}`);
        console.log(`Fecha: ${gasto.fecha}`);
        console.log("----");
    }

    let opcionesFiltro = [
        "Filtrar por descripción",
        "Mostrar todos los gastos",
        "Volver al menú principal"
    ];

    let opcionSeleccionada = prompt(`Opciones de filtrado:\n\n1 - ${opcionesFiltro[0]}\n2 - ${opcionesFiltro[1]}\n3 - ${opcionesFiltro[2]}`);

    switch (opcionSeleccionada) {
        case "1":
            let descripcionBusqueda = prompt("Ingrese la descripción para filtrar los gastos:");
            mostrarGastosFiltrados(gastos, descripcionBusqueda);
            break;

        case "2":
            console.log("Mostrar todos los gastos:");
            for (let i = 0; i < gastos.length; i++) {
                let gasto = gastos[i];
                console.log(`Descripción: ${gasto.descripcion}`);
                console.log(`Monto: ${gasto.monto}`);
                console.log(`Método de pago: ${gasto.metodo}`);
                console.log(`Fecha: ${gasto.fecha}`);
                console.log("----");
            }
            break;

        default:
            alert("Volviendo al menú principal.");
            break;
    }
}

function mostrarGastosFiltrados(gastos, descripcionBusqueda) {
    let gastosFiltrados = gastos.filter(gasto => gasto.descripcion.toLowerCase().includes(descripcionBusqueda.toLowerCase()));

    if (gastosFiltrados.length === 0) {
        alert(`No se encontraron gastos para la descripción "${descripcionBusqueda}".`);
        return; // Salir de la función si no hay gastos filtrados
    }

    let mensaje = `Lista de gastos para la descripción "${descripcionBusqueda}":\n\n`;

    for (let i = 0; i < gastosFiltrados.length; i++) {
        let gasto = gastosFiltrados[i];
        mensaje += `Descripción: ${gasto.descripcion}\n`;
        mensaje += `Monto: ${gasto.monto}\n`;
        mensaje += `Método de pago: ${gasto.metodo}\n`;
        mensaje += `Fecha: ${gasto.fecha}\n`;
        mensaje += "----\n";
    }

    alert(mensaje);
}
