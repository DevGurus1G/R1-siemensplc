// Constantes
const btnInicio = document.querySelector("#inicio");
const btnParar = document.querySelector("#parar");
const btnConfirmarDestino = document.querySelector("#confirmarDestino");
const desplegableDestino = document.querySelector("#paradas");
const imgTranvia = document.querySelector(".tranvia");
const pilotoEncendido = document.querySelector(".estado");
const leyendaPiloto = pilotoEncendido.querySelector(".leyenda");
const bdd = '"DATOSWEB"';

let animacionesNombre = [
  "primeraSegunda",
  "segundaTercera",
  "terceraCuarta",
  "cuartaQuinta",
  "quintaCuarta",
  "cuartaTercera",
  "terceraSegunda",
  "segundaPrimera",
];

//Variables del plc que se utilizaran en la web
let homing;
let destino;
let confirmar_destino;
let inicio;
let orden_mover;

// Array donde se guardan todas las variables que se leen del archivo "leer_variables.html"
let arrayVariablesPlc = new Array();

//Intervalos para leer variables del plc
setInterval(
  () =>
    fetch("sites/leer_variables.html")
      .then((response) => response.text())
      .then((datos) => (arrayVariablesPlc = datos.split("/"))),
  10
);

setInterval(() => {
  homing = arrayVariablesPlc[0];
  destino = arrayVariablesPlc[1];
  confirmar_destino = arrayVariablesPlc[2];
  inicio = arrayVariablesPlc[3];
  orden_mover = arrayVariablesPlc[4];
}, 12);

//Intervalo de animacion
setInterval(() => movimientoCiclico(), 15);

//Intervalos para verificar el estado de homing e inicio
setInterval(() => {
  if (homing == 1) {
    if (inicio == 1) {
      inicioEncendido();
    } else {
      inicioApagado();
    }
  }
}, 500);

setInterval(() => {
  if (homing == 1) {
    homingEncendido();
  } else {
    homingApagado();
  }
}, 1000);

//Funcion para mandar datos al plc
function mandarDatos(variable, valor) {
  fetch(window.location.href, {
    method: "POST",
    body: "" + bdd + "." + variable + "=" + valor + "",
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

//Funciones para cambiar los colores y disponibilidad de los botones
function inicioEncendido() {
  btnConfirmarDestino.disabled = true;
  desplegableDestino.disabled = true;
  btnInicio.classList.add("active");
  btnParar.classList.remove("active");
}

function inicioApagado() {
  btnConfirmarDestino.disabled = false;
  desplegableDestino.disabled = false;
  btnInicio.classList.remove("active");
  btnParar.classList.add("active");
}

function homingEncendido() {
  btnInicio.disabled = false;
  btnParar.disabled = false;
  pilotoEncendido.classList.add("encendido");
  leyendaPiloto.innerText = "Encendido";
}

function homingApagado() {
  btnInicio.disabled = true;
  btnParar.disabled = true;
  btnConfirmarDestino.disabled = true;
  desplegableDestino.disabled = true;
  pilotoEncendido.classList.remove("encendido");
  leyendaPiloto.innerText = "Apagado";
}

//Funciones para la logica del movimiento ciclico

let posicionActual = 0;
let entrado = false;
let ejecutado = false;
function movimientoCiclico() {
  if (inicio == 1) {
    if (comprobarListoMoverCiclico()) {
      if (!entrado) {
        imgTranvia.classList.add("homePrimera");
        entrado = true;
        ejecutado = true;
      }
      if (!ejecutado) {
        if (posicionActual == 8) posicionActual = 0;
        empezarAnimacion(posicionActual);
        posicionActual++;
        ejecutado = true;
      }
    } else {
      ejecutado = false;
    }
  }
}

function comprobarListoMoverCiclico() {
  return orden_mover == 1 ? true : false;
}

function empezarAnimacion(posicionActual) {
  btnInicio.classList.add("active");
  imgTranvia.classList.remove(...animacionesNombre);
  imgTranvia.classList.add(animacionesNombre[posicionActual]);
}

//Funciones para la logica del movimiento manual
const arrayCoincidentePosicion = [1, 2, 3, 4, 3, 2, 1, 0];
function encontrarPosicionesDestino(destino) {
  const posiciones = [];
  for (let i = 0; i < arrayCoincidentePosicion.length; i++) {
    if (arrayCoincidentePosicion[i] === destino) {
      posiciones.push(i);
    }
  }
  return posiciones;
}

function movimientoManual(destinoSeleccionado) {
  destinoPorcentajes = [19, 36, 53, 70, 86]; //Array con los porcentajes para el movimiento
  imgTranvia.classList.remove(...animacionesNombre);
  imgTranvia.classList.remove("homePrimera");
  //Variables con el left antes de entrar al switch con y sin el simbolo %
  let leftAnterior = imgTranvia.style.left;
  let leftAnteriorLimpio = leftAnterior.substring(0, leftAnterior.length - 1);
  //Array con las posiciones de los dos posibles destinos de la animacion (ida y vuelta)
  const posiciones = encontrarPosicionesDestino(Number(destinoSeleccionado));
  //Switch que comprueba en el array anterior si el tranvia se mueve hacia delante o detras (eje y positivo o negativo)
  switch (Number(destinoSeleccionado)) {
    case 0:
      imgTranvia.style.left = destinoPorcentajes[0] + "%";
      if (leftAnteriorLimpio < destinoPorcentajes[0])
        posicionActual = posiciones[0] + 1;
      else posicionActual = posiciones[1] + 1;
      break;
    case 1:
      imgTranvia.style.left = destinoPorcentajes[1] + "%";
      if (leftAnteriorLimpio < destinoPorcentajes[1])
        posicionActual = posiciones[0] + 1;
      else posicionActual = posiciones[1] + 1;
      break;
    case 2:
      imgTranvia.style.left = destinoPorcentajes[2] + "%";
      if (leftAnteriorLimpio < destinoPorcentajes[2])
        posicionActual = posiciones[0] + 1;
      else posicionActual = posiciones[1] + 1;
      break;
    case 3:
      imgTranvia.style.left = destinoPorcentajes[3] + "%";
      if (leftAnteriorLimpio < destinoPorcentajes[3])
        posicionActual = posiciones[0] + 1;
      else posicionActual = posiciones[1] + 1;
      break;
    case 4:
      imgTranvia.style.left = destinoPorcentajes[4] + "%";
      if (leftAnteriorLimpio < destinoPorcentajes[4])
        posicionActual = posiciones[0] + 1;
      else posicionActual = posiciones[1] + 1;
      break;
    default:
      break;
  }
  entrado = true;
}

//Eventos relativos al click de botones o desplegables
btnInicio.addEventListener("click", () => {
  mandarDatos("INICIO", 1);
});
btnParar.addEventListener("click", () => mandarDatos("INICIO", 0));
btnConfirmarDestino.addEventListener("click", () => {
  mandarDatos("CONFIRMAR_DESTINO", 1);
  movimientoManual(desplegableDestino.value);
  guardarEstadisticas();
  setTimeout(() => mandarDatos("CONFIRMAR_DESTINO", 0), 500);
});
desplegableDestino.addEventListener("click", () => {
  mandarDatos("DESTINO", desplegableDestino.value);
});

//Funciones para guardar las estadisticas en localStorage
let stats;
function guardarEstadisticas() {
  if (localStorage.getItem("estadistica") == null) {
    stats = {
      parada1: 0,
      parada2: 0,
      parada3: 0,
      parada4: 0,
      parada5: 0,
    };
    localStorage.setItem("estadistica", JSON.stringify(stats));
  } else {
    stats = JSON.parse(localStorage.getItem("estadistica"));
    switch (Number(destino)) {
      case 0:
        stats.parada1 += 1;
        break;
      case 1:
        stats.parada2 += 1;
        break;
      case 2:
        stats.parada3 += 1;
        break;
      case 3:
        stats.parada4 += 1;
        break;
      case 4:
        stats.parada5 += 1;
        break;
    }
    localStorage.setItem("estadistica", JSON.stringify(stats));
  }
}

//Funciones para cambiar orden mover desde la web (Solo para realizar las pruebas)
document.getElementById("enOrdenMover").addEventListener("click", () => {
  mandarDatos("ORDEN_MOVER", 1);
});

document.getElementById("apOrdenMover").addEventListener("click", () => {
  mandarDatos("ORDEN_MOVER", 0);
});

setInterval(() => {
  document.getElementById("tOrdenMover").innerHTML = orden_mover;
}, 100);
