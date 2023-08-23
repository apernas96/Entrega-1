

let nombre = prompt("Ingrese aquí su nombre:");
let condicionCierre = false;
let gastos = [];

while (!condicionCierre) {
    let eleccion = parseInt(prompt(`Hola ${nombre}, ¿en qué puedo ayudarte hoy?
Las funciones permitidas son:
1 - Calcular que aumento te corresponde
2 - Gestor de gastos
3 - Mostrar gastos registrados
4 - Finalizar`));

    switch (eleccion) {
        case 1:
            // Llamar a la función 2
            alert("Elegiste la función 2 - Calculadora de aumento");
            aumento();
            break;

        case 2:
            alert("Elegiste la función 3 - Gestor de gastos");
            gestorGastos(gastos);
            break;
        case 3:
            mostrarGastos(gastos); // Mostrar gastos registrados
            break;
        case 4:
            alert("Que sigas bien! espero verte de nuevo pronto!")
            condicionCierre = true
            break;

        default:
            alert("El valor ingresado no es válido, por favor ingrese un número del 1 al 4");
            break;
    }
}



function aumento() {
    let sueldoActual = parseFloat(prompt("Ingrese su sueldo actual:"));
    let mesesSinaumento;
    const inflacion = [8, 7, 6, 9, 11, 10, 8, 5, 7, 13, 15, 9];
    do {
        mesesSinaumento = parseInt(prompt("Cuantos meses hace que no te aumetan?"));
        if (mesesSinaumento > 12 || mesesSinaumento <= 0) { alert = ("Lo siento, solo podes ingresar un numero de meses entre 1 y 12") };
    } while (mesesSinaumento > 12 || mesesSinaumento <= 0);

    let nuevoSueldo = sueldoActual;

    for (let i = 11; i >= (12 - mesesSinaumento); i--) {
        let tasaDecimal = inflacion[i] / 100;
        nuevoSueldo = (1 + tasaDecimal) * nuevoSueldo;
        console.log(`indice:${i} , interes${nuevoSueldo}`);
    }
    console.log(`interes ${nuevoSueldo}`)
    alert(`Tu sueldo actualizado a la inflacion de los ultimos ${mesesSinaumento} meses deberia ser de ${nuevoSueldo.toFixed(2)}.`);

}

// Aca empieza la funcion 3 agregada para la segunda entrega
function gestorGastos(gastosArray) {
    let descripcion = prompt("Ingrese la descripción del gasto:");
    let monto = parseFloat(prompt("Ingrese el monto del gasto:"));

    const obtenerMetodoPago = () => {
        let metodoPago = parseInt(prompt("Ingrese el método de pago: 1 - Efectivo / 2 - Debito / 3 - Credito"));
        switch (metodoPago) {
            case 1:
                return "Efectivo"
                break;
            case 2:
                return "Debito"
                break;
            case 3:
                return "Credito"
                break;
            default:
                return "Desconocido"
                break;
        }
    }

    let metodoPago = obtenerMetodoPago();
    let fecha = new Date();

    let gasto = {
        descripcion: descripcion,
        monto: monto,
        metodo: metodoPago,
        fecha: fecha
    };


    gastosArray.push(gasto);
    console.log("Gasto registrado:", gasto);

    class Persona {
        constructor(nombre, sueldo) {
            this.nombre = nombre;
            this.edad = sueldo;
        }
    }
    const persona = new Persona(nombre, sueldoActual2);
    let sueldoActual = parseInt(prompt("Ingrese su sueldo actual:"));
}

function mostrarGastos(gastosArray) {
    console.log("Lista de gastos:");

    for (let i = 0; i < gastosArray.length; i++) {
        let gasto = gastosArray[i];
        console.log(`Descripción: ${gasto.descripcion}`);
        console.log(`Monto: ${gasto.monto}`);
        console.log(`Método de pago: ${gasto.metodo}`);
        console.log(`Fecha: ${gasto.fecha}`);
        console.log("----");
    }
}