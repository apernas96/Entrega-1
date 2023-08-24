

let nombre = prompt("Ingrese aquí su nombre:");
let condicionCierre = false;
let gastos = [];

while (!condicionCierre) {
    let eleccion = parseInt(prompt(`Hola ${nombre}, ¿en qué puedo ayudarte hoy?
Las funciones permitidas son:
1 - Calcular tu aumento por inflacion
2 - Gestor de gastos
3 - Mostrar gastos registrados
4 - Finalizar`));

    switch (eleccion) {
        case 1:
            // Llamar a la función 2
            alert("Elegiste la función 1 - Calculadora de aumento");
            aumento();
            break;

        case 2: // Agregar gastos
            alert("Elegiste la función 2 - Gestor de gastos");
            gestorGastos(gastos);
            break;
        case 3: // Mostrar gastos registrados
            alert("Elegiste la función 3 - Mostrar gastos registrados");
            mostrarGastos(gastos);
            break;
        case 4: //Finalizar la ejecucion
            alert("Que sigas bien! espero verte de nuevo pronto!")
            condicionCierre = true
            break;

        default: //Validacion de datos
            alert("El valor ingresado no es válido, por favor ingrese un número del 1 al 4");
            break;
    }
}


// Logica del Case 1 del switch
function aumento() {
    let sueldoActual = parseFloat(prompt("Ingrese su sueldo actual:"));
    let mesesSinaumento;
    const inflacion = [8, 7, 6, 9, 11, 10, 8, 5, 7, 13, 15, 9];
    do {
        mesesSinaumento = parseInt(prompt("Cuantos meses hace que no te aumetan?"));
        if (mesesSinaumento > 12 || mesesSinaumento <= 0) { alert("Lo siento, solo podes ingresar un numero de meses entre 1 y 12") };
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


// Aca empieza la funcion 3 agregada para la segunda entrega
// function obtenerMetodoPago() {
//     let metodoPago;
//     // QUIERO OBTENER UN NUMERO VALIDO
//     do {
//         metodoPago = parseInt(prompt("Ingrese el método de pago: \n 1 - Efectivo \n 2 - Debito \n 3 - Credito \n 4 - Otro"));
//         if (!(metodoPago >= 1 && metodoPago <= 4)) {
//             alert("Lo siento, solo podes ingresar un numero entre 1 y 4");
//         };
//     }
//     while (!(metodoPago >= 1 && metodoPago <= 4));

//     switch (metodoPago) {
//         case 1:
//             return "Efectivo";
//             break;
//         case 2:
//             return "Debito";
//             break;
//         case 3:
//             return "Credito";
//             break;
//         default:
//             return "Otro";
//             break;
//     }

// }
const obtenerMetodoPago = () => {
    let metodoPago;
    debugger
    do {
        metodoPago = parseInt(prompt("Ingrese el método de pago: \n 1 - Efectivo \n 2 - Debito \n 3 - Credito \n 4 - Otro"));
        if (!(metodoPago >= 1 && metodoPago <= 4)) {
            alert("Lo siento, solo podes ingresar un numero entre 1 y 4")
        };
    }
    while (!(metodoPago >= 1 && metodoPago <= 4));

    switch (metodoPago) {
        case 1:
            return "Efectivo";
            break;
        case 2:
            return "Debito";
            break;
        case 3:
            return "Credito";
            break;
        default:
            return "Otro";
            break;
    }

    return metodoPago;
}
function gestorGastos(gastosArray) {
    //volver tiene que ser false para que entre la primera vez
    // let volver = false;
    // while (!volver) {
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
    // break;
}
let opcion = parseInt(prompt(`Quieres volver al menu principal o agregar otro gasto?
1 - Ingresar otro gasto
2 - Volver al menu principal`));

if (opcion === 2) {
    volver = true;
}


//codigo despues



console.log("Gasto registrado:", gasto);

class Persona {
    constructor(nombre, sueldo) {
        this.nombre = nombre;
        this.edad = sueldo;
    }
}
const persona = new Persona(nombre, sueldoActual);
//esto se ejecuta solo despues del while de condicion cierre
let sueldoActual = parseInt(prompt("Ingrese su sueldo actual:"));


function mostrarGastos(gastos) {
    console.log("Lista de gastos:");
    let volverAlMenu = confirm("¿Deseas volver al menú principal?");
    if (volverAlMenu) {
        return; // Salir de la función y volver al menú principal
    }

    for (let i = 0; i < gastosArray.length; i++) {
        let gasto = gastosArray[i];
        console.log(`Descripción: ${gasto.descripcion}`);
        console.log(`Monto: ${gasto.monto}`);
        console.log(`Método de pago: ${gasto.metodo}`);
        console.log(`Fecha: ${gasto.fecha}`);
        console.log("----");
    }
}

