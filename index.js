// constantes de los botones e img tranvia
const btnInicio = document.querySelector("#inicio")
btnInicio.disabled = true
const btnParar = document.querySelector("#parar")
btnParar.disabled = true
const btnConfirmarDestino = document.querySelector("#confirmarDestino")
btnConfirmarDestino.disabled = true
const desplegableDestino = document.querySelector("#paradas")
desplegableDestino.disabled = true
const imgTranvia = document.querySelector(".tranvia")
const pilotoEncendido = document.querySelector(".estado")
const leyendaPiloto = pilotoEncendido.querySelector(".leyenda")
const bdd = '"DATOSWEB"'

let animacionesNombre = [
  "primeraSegunda",
  "segundaTercera",
  "terceraCuarta",
  "cuartaQuinta",
  "quintaCuarta",
  "cuartaTercera",
  "terceraSegunda",
  "segundaPrimera",
]

function empezarAnimacion() {
  btnInicio.classList.add("active")
  imgTranvia.classList.add("homePrimera")
}

//Variables del plc que se utilizaran en la web
let homing
let destino
let confirmar_destino
let inicio
let orden_mover
// Array donde se guardan todas las variables que se leen del archivo "leer_variables.html"
let arrayVariablesPlc = new Array()

setInterval(
  () =>
    fetch("sites/leer_variables.html")
      .then((response) => response.text())
      .then((datos) => (arrayVariablesPlc = datos.split("/"))),
  500
)

setInterval(() => {
  homing = arrayVariablesPlc[0]
  destino = arrayVariablesPlc[1]
  confirmar_destino = arrayVariablesPlc[2]
  inicio = arrayVariablesPlc[3]
  orden_mover = arrayVariablesPlc[4]
}, 500)

setInterval(() => movimientoCiclico(), 1000)

//Funcionas y Promesa para comenzar el programa con el homing

setInterval(() => {
  if (homing == 1) {
    homingEncendido()
  } else {
    homingApagado()
  }
}, 1000)

function homingEncendido() {
  btnInicio.disabled = false
  btnParar.disabled = false
  btnConfirmarDestino.disabled = false
  desplegableDestino.disabled = false
  pilotoEncendido.style.backgroundColor = "#006f2b"
  leyendaPiloto.textContent = "Encendido"
}

function homingApagado() {
  btnInicio.disabled = true
  btnParar.disabled = true
  btnConfirmarDestino.disabled = true
  desplegableDestino.disabled = true
  pilotoEncendido.style.backgroundColor = "#dc2424"
  leyendaPiloto.textContent = "Apagado"
}

//Funciones para la logica del movimiento

let posicionActual = 0
let entrado = false
let ejecutado = false
function movimientoCiclico() {
  if (inicio == 1) {
    //TODO Aqui va el codigo para que empieze la animacion ciclica
    if (comprobarListoMoverCiclico()) {
      if (!entrado) {
        imgTranvia.classList.add("homePrimera")
        entrado = true
        ejecutado = true
      }
      if (!ejecutado) {
        if (posicionActual == 8) posicionActual = 0
        empezarAnimacion(posicionActual)
        posicionActual++
        ejecutado = true
      }
    } else {
      ejecutado = false
    }
  }
}

function comprobarListoMoverCiclico() {
  // Funcion que devuelve un true cuando esta listo para moverse
  return orden_mover == 1 ? true : false
}

function empezarAnimacion(posicionActual) {
  btnInicio.classList.add("active")
  imgTranvia.classList.remove(...animacionesNombre)
  imgTranvia.classList.add(animacionesNombre[posicionActual])
}

function mandarDatos(variable, valor) {
  fetch(window.location.href, {
    method: "POST",
    body: "" + bdd + "." + variable + "=" + valor + "",
    headers: {
      "Content-Type": "text/plain",
    },
  })
}

//Movimiento Manua

function movimientoManual(destinoSeleccionado) {
  destinoPorcentajes = ["19%", "36%", "53%", "70%", "86%"]
  imgTranvia.classList.remove(...animacionesNombre)
  imgTranvia.classList.remove("homePrimera")
  let leftAnterior = imgTranvia.style.left
  let leftAnteriorLimpio = leftAnterior.substring
  let esMenor = false
  switch (Number(destinoSeleccionado)) {
    case 0:
      imgTranvia.style.left = destinoPorcentajes[0]
      break
    case 1:
      imgTranvia.style.left = destinoPorcentajes[1]
      break
    case 2:
      imgTranvia.style.left = destinoPorcentajes[2]
      break
    case 3:
      imgTranvia.style.left = destinoPorcentajes[3]
      break
    case 4:
      imgTranvia.style.left = destinoPorcentajes[4]
      break
    default:
      break
  }
}

//Eventos cuando se clicka botones para mandar datos

btnInicio.addEventListener("click", () => {
  mandarDatos("INICIO", 1)
})
btnParar.addEventListener("click", () => mandarDatos("INICIO", 0))
btnConfirmarDestino.addEventListener("click", () => {
  mandarDatos("CONFIRMAR_DESTINO", 1)
  movimientoManual(desplegableDestino.value)
  guardarEstadisticas()
  setTimeout(() => mandarDatos("CONFIRMAR_DESTINO", 0), 500)
})
desplegableDestino.addEventListener("click", () => {
  mandarDatos("DESTINO", desplegableDestino.value)
})

//Funciones para las estadisticas
let stats
function guardarEstadisticas() {
  if (localStorage.getItem("estadistica") == null) {
    stats = {
      parada0: 0,
      parada1: 0,
      parada2: 0,
      parada3: 0,
      parada4: 0,
    }
    localStorage.setItem("estadistica", JSON.stringify(stats))
  } else {
    stats = JSON.parse(localStorage.getItem("estadistica"))
    switch (Number(destino)) {
      case 0:
        stats.parada0 += 1
        break
      case 1:
        stats.parada1 += 1
        break
      case 2:
        stats.parada2 += 1
        break
      case 3:
        stats.parada3 += 1
        break
      case 4:
        stats.parada4 += 1
        break
    }
    localStorage.setItem("estadistica", JSON.stringify(stats))
  }
}

//Funciones para posicion actual

window.addEventListener("unload", (event) => {
  localStorage.setItem("posicion", posicionActual)
})

window.addEventListener("load", (event) => {
  posicionActual = localStorage.getItem("posicion")
})

//Funciones para cambiar orden mover desde la web (Para realizar las pruebas)
document.getElementById("enOrdenMover").addEventListener("click", () => {
  mandarDatos("ORDEN_MOVER", 1)
})

document.getElementById("apOrdenMover").addEventListener("click", () => {
  mandarDatos("ORDEN_MOVER", 0)
})

setInterval(() => {
  document.getElementById("tOrdenMover").innerHTML = orden_mover
}, 100)
