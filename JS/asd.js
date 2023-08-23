function gestorGastos(gastosArray) {
    let descripcion = prompt("Ingrese la descripción del gasto:");
    let monto = parseFloat(prompt("Ingrese el monto del gasto:"));

    const obtenerMetodoPago = () => {
        let metodoPago = parseInt(prompt("Ingrese el método de pago: 1 - Efectivo / 2 - Debito / 3 - Credito"));
        switch (metodoPago) {
            case 1:
                return "Efectivo";
            case 2:
                return "Debito";
            case 3:
                return "Credito";
            default:
                return "Desconocido";
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

    // ... (resto del código)
}

class Persona {
    constructor(nombre, sueldo) {
        this.nombre = nombre;
        this.sueldo = sueldo;
    }
}

let sueldoActual = parseInt(prompt("Ingrese su sueldo actual:"));
const persona = new Persona(nombre, sueldoActual);