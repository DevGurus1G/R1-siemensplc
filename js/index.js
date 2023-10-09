/**
 * Constantes utilizadas en la aplicación.
 * @constant
 * @type {HTMLElement}
 */
const btnInicio = document.querySelector("#inicio");
const btnParar = document.querySelector("#parar");
const btnConfirmarDestino = document.querySelector("#confirmarDestino");
const desplegableDestino = document.querySelector("#paradas");
const imgTranvia = document.querySelector(".tranvia");
const pilotoEncendido = document.querySelector(".estado");
const leyendaPiloto = pilotoEncendido.querySelector(".leyenda");

/**
 * Base de datos utilizada para mandar datos al PLC.
 * @constant
 * @type {string}
 */
const bdd = '"DATOSWEB"';

/**
 * Nombres de las animaciones utilizadas.
 * @type {string[]}
 */
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

/**
 * Variables del PLC que se utilizan en la web.
 * @type {number}
 */
let homing;
let destino;
let confirmar_destino;
let inicio;
let orden_mover;

/**
 * Array donde se guardan todas las variables que se leen del archivo "leer_variables.html".
 * @type {string[]}
 */
let arrayVariablesPlc = new Array();

/**
 * Intervalo para leer variables del PLC.
 * @type {number}
 */
setInterval(
  /**
   * Función para leer variables del PLC y actualizar el array.
   * @param {Response} response - La respuesta de la solicitud HTTP.
   * @param {string} response.text - Los datos del archivo "leer_variables.html".
   */
  () =>
    fetch("sites/leer_variables.html")
      .then((response) => response.text())
      .then((datos) => (arrayVariablesPlc = datos.split("/"))),
  10
);

/**
 * Intervalo para actualizar las variables del PLC.
 * @type {number}
 */
setInterval(() => {
  homing = arrayVariablesPlc[0];
  destino = arrayVariablesPlc[1];
  confirmar_destino = arrayVariablesPlc[2];
  inicio = arrayVariablesPlc[3];
  orden_mover = arrayVariablesPlc[4];
}, 12);

/**
 * Intervalo de animación que llama a la función `movimientoCiclico`.
 * @type {number}
 */
setInterval(() => movimientoCiclico(), 15);

/**
 * Intervalos para verificar el estado de homing e inicio.
 */

/**
 * Intervalo que verifica el estado de homing e inicio cada 500 milisegundos.
 */
setInterval(() => {
  /**
   * Estado de homing. 1 si está activado, 0 si está desactivado.
   * @type {number}
   */
  if (homing == 1) {
    if (inicio == 1) {
      /**
       * Función que se ejecuta cuando el inicio está encendido.
       * @function
       */
      inicioEncendido();
    } else {
      /**
       * Función que se ejecuta cuando el inicio está apagado.
       * @function
       */
      inicioApagado();
    }
  }
}, 500);

/**
 * Intervalo que verifica el estado de homing cada 1000 milisegundos.
 */
setInterval(() => {
  /**
   * Estado de homing. 1 si está activado, 0 si está desactivado.
   * @type {number}
   */
  if (homing == 1) {
    /**
     * Función que se ejecuta cuando el homing está encendido.
     * @function
     */
    homingEncendido();
  } else {
    /**
     * Función que se ejecuta cuando el homing está apagado.
     * @function
     */
    homingApagado();
  }
}, 1000);

/**
 * Función para mandar datos al PLC.
 * @param {string} variable - El nombre de la variable a enviar al PLC.
 * @param {number} valor - El valor que se enviará a la variable.
 * @function
 */
function mandarDatos(variable, valor) {
  fetch(window.location.href, {
    method: "POST",
    body: "" + bdd + "." + variable + "=" + valor + "",
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

/**
 * Funciones para cambiar los colores y disponibilidad de los botones.
 */

/**
 * Función que se ejecuta cuando el inicio está encendido.
 * @function
 */
function inicioEncendido() {
  btnConfirmarDestino.disabled = true;
  desplegableDestino.disabled = true;
  btnInicio.classList.add("active");
  btnParar.classList.remove("active");
}

/**
 * Función que se ejecuta cuando el inicio está apagado.
 * @function
 */
function inicioApagado() {
  btnConfirmarDestino.disabled = false;
  desplegableDestino.disabled = false;
  btnInicio.classList.remove("active");
  btnParar.classList.add("active");
}

/**
 * Función que se ejecuta cuando el homing está encendido.
 * @function
 */
function homingEncendido() {
  btnInicio.disabled = false;
  btnParar.disabled = false;
  pilotoEncendido.classList.add("encendido");
  leyendaPiloto.innerText = "Encendido";
}

/**
 * Función que se ejecuta cuando el homing está apagado.
 * @function
 */
function homingApagado() {
  btnInicio.disabled = true;
  btnParar.disabled = true;
  btnConfirmarDestino.disabled = true;
  desplegableDestino.disabled = true;
  pilotoEncendido.classList.remove("encendido");
  leyendaPiloto.innerText = "Apagado";
}

/**
 * Variable que almacena la posición actual de la animación cíclica.
 * @type {number}
 */
let posicionActual = 0;

/**
 * Variable que indica si el tranvía ha entrado en la animación cíclica.
 * @type {boolean}
 */
let entrado = false;

/**
 * Variable que indica si la animación cíclica ha sido ejecutada.
 * @type {boolean}
 */
let ejecutado = false;

/**
 * Función que controla la lógica del movimiento cíclico del tranvía.
 * @function
 */
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

/**
 * Función que comprueba si el tranvía está listo para moverse cíclicamente.
 * @returns {boolean} `true` si el tranvía está listo para moverse, de lo contrario, `false`.
 * @function
 */
function comprobarListoMoverCiclico() {
  return orden_mover == 1 ? true : false;
}

/**
 * Función que inicia una animación en el tranvía en función de la posición actual.
 * @param {number} posicionActual - La posición actual en la secuencia de animación.
 * @function
 */
function empezarAnimacion(posicionActual) {
  btnInicio.classList.add("active");
  imgTranvia.classList.remove(...animacionesNombre);
  imgTranvia.classList.add(animacionesNombre[posicionActual]);
}

/**
 * Array que almacena las posiciones coincidentes de destino para la animación manual.
 * @type {number[]}
 */
const arrayCoincidentePosicion = [1, 2, 3, 4, 3, 2, 1, 0];

/**
 * Función que encuentra las posiciones coincidentes de destino en la animación manual.
 * @param {number} destinoSeleccionado - El destino seleccionado.
 * @returns {number[]} Un array con las posiciones coincidentes de destino.
 * @function
 */
function encontrarPosicionesDestino(destinoSeleccionado) {
  const posiciones = [];
  for (let i = 0; i < arrayCoincidentePosicion.length; i++) {
    if (arrayCoincidentePosicion[i] === destinoSeleccionado) {
      posiciones.push(i);
    }
  }
  return posiciones;
}

/**
 * Función que controla el movimiento manual del tranvía hacia un destino seleccionado.
 * @param {number} destinoSeleccionado - El destino seleccionado.
 * @function
 */
function movimientoManual(destinoSeleccionado) {
  /**
   * Array con los porcentajes para el movimiento del tranvía hacia diferentes destinos.
   * @type {number[]}
   */
  const destinoPorcentajes = [19, 36, 53, 70, 86];

  /**
   * Elimina todas las clases de animación del tranvía.
   */
  imgTranvia.classList.remove(...animacionesNombre);
  imgTranvia.classList.remove("homePrimera");

  /**
   * Almacena el valor de la propiedad `left` del tranvía antes de entrar al switch, con y sin el símbolo "%".
   */
  let leftAnterior = imgTranvia.style.left;
  let leftAnteriorLimpio = leftAnterior.substring(0, leftAnterior.length - 1);

  /**
   * Array con las posiciones de los dos posibles destinos de la animación (ida y vuelta).
   * @type {number[]}
   */
  const posiciones = encontrarPosicionesDestino(Number(destinoSeleccionado));

  /**
   * Switch que determina el destino seleccionado y actualiza la posición del tranvía en consecuencia.
   */
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

  /**
   * Indica que el tranvía ha entrado en la animación manual.
   */
  entrado = true;
}

/**
 * Evento click en el botón "Inicio". Envía un comando al PLC para iniciar el tranvía.
 */
btnInicio.addEventListener("click", () => {
  /**
   * Envía un comando al PLC para iniciar el tranvía.
   * @function
   */
  mandarDatos("INICIO", 1);
});

/**
 * Evento click en el botón "Parar". Envía un comando al PLC para detener el tranvía.
 */
btnParar.addEventListener("click", () => {
  /**
   * Envía un comando al PLC para detener el tranvía.
   * @function
   */
  mandarDatos("INICIO", 0);
});

/**
 * Evento click en el botón "Confirmar Destino". Envía un comando al PLC para confirmar el destino seleccionado, inicia el movimiento manual, y guarda estadísticas.
 */
btnConfirmarDestino.addEventListener("click", () => {
  /**
   * Envía un comando al PLC para confirmar el destino seleccionado.
   * @function
   */
  mandarDatos("CONFIRMAR_DESTINO", 1);

  /**
   * Inicia el movimiento manual del tranvía hacia el destino seleccionado.
   * @function
   */
  movimientoManual(desplegableDestino.value);

  /**
   * Guarda estadísticas relacionadas con el destino seleccionado.
   * @function
   */
  guardarEstadisticas();

  /**
   * Envía un comando al PLC para desactivar la confirmación de destino después de un tiempo (500 ms).
   */
  setTimeout(() => mandarDatos("CONFIRMAR_DESTINO", 0), 500);
});

/**
 * Evento click en el desplegable de destinos. Envía el destino seleccionado al PLC.
 */
desplegableDestino.addEventListener("click", () => {
  /**
   * Envía el destino seleccionado al PLC.
   * @function
   */
  mandarDatos("DESTINO", desplegableDestino.value);
});

/**
 * Función para guardar estadísticas en el almacenamiento local (localStorage).
 * Si no existen estadísticas previas, se crea un objeto inicial. Si existen, se actualizan.
 * @function
 */
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

/**
 * Función que cambia la orden de movimiento desde la web (solo para pruebas).
 * @param {number} valor - El valor de la orden de movimiento (1 para activar, 0 para desactivar).
 * @function
 */
document.getElementById("enOrdenMover").addEventListener("click", () => {
  /**
   * Cambia la orden de movimiento desde la web para activar el movimiento del tranvía.
   * @function
   */
  mandarDatos("ORDEN_MOVER", 1);
});

/**
 * Función que cambia la orden de movimiento desde la web (solo para pruebas).
 * @param {number} valor - El valor de la orden de movimiento (1 para activar, 0 para desactivar).
 * @function
 */
document.getElementById("apOrdenMover").addEventListener("click", () => {
  /**
   * Cambia la orden de movimiento desde la web para desactivar el movimiento del tranvía.
   * @function
   */
  mandarDatos("ORDEN_MOVER", 0);
});

/**
 * Intervalo que actualiza el valor de la orden de movimiento en la interfaz web.
 */
setInterval(() => {
  /**
   * Actualiza el valor de la orden de movimiento en la interfaz web.
   */
  document.getElementById("tOrdenMover").innerHTML = orden_mover;
}, 100);
