let nombre = prompt("Ingrese aquí su nombre:");
let condicionCierre = false;
let gastos = [];

// ... rest of the code ...

// Aca empieza la funcion 3 agregada para la segunda entrega
const obtenerMetodoPago = () => {
    // ... function logic ...
}

function gestorGastos(gastosArray) {
    let descripcion = prompt("Ingrese la descripción de la compra:");
    let monto = parseFloat(prompt("Ingrese el monto de la compra:"));
    let metodoPago = obtenerMetodoPago();
    let fecha = new Date();

    let gasto = {
        descripcion: descripcion,
        monto: monto,
        metodo: metodoPago,
        fecha: fecha,
    };

    gastosArray.push(gasto);
    console.log("Gasto registrado:", gasto);
}