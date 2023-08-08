/* let nombre = prompt("Ingrese aqui su nombre:")
let condicionCierre = false;

let eleccion = prompt(`Hola ${nombre}, en que puedo ayudarte hoy? \n Las funciones permitidas son: \n 1 - \n 2 - \n 3 - \n 4 - \n 5 - Finalizar! `)
while (!condicionCierre) {
    let eleccion = ;
    switch (eleccion) {
        case 1:
            //ingresar funcion 1
            break;
        case 2:
            //ingresar funcion 1
            break;
        case 3:
            //ingresar funcion 1
            break;
        case 4:
            //ingresar funcion 1
            break;
        case 5:
            condicionCierre = true
            alert("Hasta luego")
            break;
        default:
            alert("El valor ingresado no es valido, por favor ingrese un numero del 1 al 5")
            break;
    }
} */

let nombre = prompt("Ingrese aquí su nombre:");
let condicionCierre = false;

while (!condicionCierre) {
    let eleccion = parseInt(prompt(`Hola ${nombre}, ¿en qué puedo ayudarte hoy?
Las funciones permitidas son:
1 - Cambiar Nombre
2 - Calcular que aumento te corrresponde
3 - Realizar función 3
4 - Realizar función 4
5 - Finalizar`));

    switch (eleccion) {
        case 1:
            // Llamar a la función 1
            nombre = cambiarNombre();
            break;
        case 2:
            // Llamar a la función 2
            alert("Elegiste la función 2 - Calcular aumento");
            aumento();
            break;
        case 3:
            // Llamar a la función 3
            alert("Elegiste la función 3");
            break;
        case 4:
            // Llamar a la función 4
            alert("Elegiste la función 4");
            break;
        case 5:
            condicionCierre = true;
            alert("Hasta luego");
            break;
        default:
            alert("El valor ingresado no es válido, por favor ingrese un número del 1 al 5");
            break;
    }
}

function cambiarNombre() {
    let nuevoNombre = prompt("Elegiste cambiar tu nombre, por favor ingresa tu nuevo nombre aqui:");
    return nuevoNombre;
}

function aumento() {
    let sueldoActual = parseInt(prompt("Ingrese su sueldo actual:"));
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


