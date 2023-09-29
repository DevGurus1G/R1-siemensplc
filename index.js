let animaciones = []
// constantes de los botones e img tranvia
const btnMartxa = document.querySelector("#martxa")
const btnAbrirPuertas = document.querySelector("#abrirPuertas")
const btnAvance = document.querySelector("#avance")
const btnRetroceso = document.querySelector("#retroceso")

const imgTranvia = document.querySelector(".tranvia")

btnMartxa.addEventListener("click", empezarAnimacion)
btnAvance.addEventListener("mousedown", (e) => moverseAvanzar(e))
btnAvance.addEventListener("mouseup", (e) => moverseAvanzar(e))
btnRetroceso.addEventListener("mousedown", (e) => moverseRetroceder(e))
btnRetroceso.addEventListener("mouseup", (e) => moverseRetroceder(e))

let animacionesNombre = [
  "homePrimera",
  "primeraSegunda",
  "segundaTercera",
  "terceraCuarta",
  "cuartaQuinta",
]
let parar = false
let leftPosiciones = ["16%", "32%", "48%", "64%", "80%"]
function empezarAnimacion() {
  btnMartxa.classList.add("active")
  imgTranvia.classList.add("homePrimera")
}

let animacion = null
let retrocediendo = false
let tiempoTranscurrido = 0

function moverseAvanzar(e) {
  if (e.type == "mousedown") {
    btnAvance.classList.add("active")

    if (!retrocediendo) {
      // Iniciar la animación solo si no estamos retrocediendo
      animacion = imgTranvia.animate([{ left: "16%" }, { left: "80%" }], {
        duration: 5000,
        iterations: Infinity,
        fill: "forwards",
        playbackRate: 1,
        delay: -tiempoTranscurrido,
      })
    }
  } else {
    if (animacion) {
      btnAvance.classList.remove("active")
      tiempoTranscurrido = animacion.currentTime
      animacion.pause()
    }
  }
}

function moverseRetroceder(e) {
  if (e.type == "mousedown") {
    btnRetroceso.classList.add("active")

    if (retrocediendo) {
      // Iniciar la animación solo si estamos retrocediendo
      animacion = imgTranvia.animate([{ left: "80%" }, { left: "16%" }], {
        duration: 5000,
        iterations: Infinity,
        fill: "forwards",
        playbackRate: -1,
        delay: -tiempoTranscurrido,
      })
    }
  } else {
    if (animacion) {
      btnRetroceso.classList.remove("active")
      tiempoTranscurrido = animacion.currentTime
      animacion.pause()
    }
  }

  retrocediendo = !retrocediendo // Cambiar la dirección de retroceso
}

//Funcionalidades conexion con plc siemens

setInterval(() =>fetch("sites/leer_variable_posicion.html")
        .then(response => response.text())
        .then(datos => document.getElementById("posicion").innerHTML = datos), 1000);