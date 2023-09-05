

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
    e.preventDefault();
    const sueldoValue = parseFloat(sueldoEl.value);
    const mesesValue = parseFloat(mesesEl.value);
    if (isNaN(sueldoValue) || isNaN(mesesValue)) {
        alert("Debes completar todos los campos");
    } else {
        aumento();
    }
});


const formularioGastos = document.getElementById("formularioGastos");
console.log(formularioGastos);
const descripcion = document.getElementById("descripcion-el");
console.log(descripcion);
const monto = document.getElementById("monto-el");
console.log(monto);
const metodoPago = document.getElementById("metodoPago-el");
console.log(metodoPago);

let gastosArray = [];

function gestorGastos() {

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
};

function validarPalabra(descripcion) {
    return /^[a-zA-Z\s]+$/.test(descripcion);
}