// constantes de los botones e img tranvia
const btnMartxa = document.querySelector("#martxa")
const btnParar = document.querySelector("#parar")
const formParada = document.querySelector("#formParada")
const btnEnviar = document.querySelector("#enviar")
const imgTranvia = document.querySelector(".tranvia")
const pilotoEncendido = document.querySelector(".estado")
const leyendaPiloto = pilotoEncendido.querySelector(".leyenda")
const bdd = '"DATOSWEB"';

let animacionesNombre = [
  "homePrimera",
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
  btnMartxa.classList.add("active")
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
// Variable para saber en que parada esta actualmente el tranvia
let posicionActual

setInterval(
  () =>
    fetch("sites/leer_variables.html")
      .then((response) => response.text())
      .then((datos) => (arrayVariablesPlc = datos.split("/"))),
  500
)

setInterval(() => {
  
  destino = arrayVariablesPlc[1]
  confirmar_destino = arrayVariablesPlc[2]
  inicio = arrayVariablesPlc[3]
  orden_mover = arrayVariablesPlc[4]
}, 500)

setInterval(() => movimientoCiclico(), 200)

do
{

  homing = arrayVariablesPlc[0];

  homingParada0();
  
}
while(homing =! "1")


//Funciones para la logica del movimiento

function homingParada0() {
  if (homing == "1") {
    //TODO Aqui va el codigo para la animacion de cochera a parada 0
    pilotoEncendido.style.backgroundColor = "#006f2b";
    leyendaPiloto.textContent = "Encendido";
  }
}


let contador = 0
function movimientoCiclico() {
  if (inicio == "1") {
    //TODO Aqui va el codigo para que empieze la animacion ciclica
    if (comprobarListoMoverCiclico()) {
      if (contador == 8) contador = 0
      empezarAnimacion(contador)
      contador++
    }
  }
}

function comprobarListoMoverCiclico() {
  // Funcion que devuelve un 1 cuando esta listo para moverse
  return orden_mover == "1" ? true : false
}

function empezarAnimacion(contador) {
  btnMartxa.classList.add("active")
  imgTranvia.classList.remove(...animacionesNombre)
  imgTranvia.classList.add(animacionesNombre[contador])
}

function mandarDatos(variable,valor){
  fetch(window.location.href, {
    method: 'POST',
    body: '' + bdd + '.' + variable + '=' + valor + '', // El dato que deseas enviar
    headers: {
        'Content-Type': 'text/plain' // Especifica el tipo de contenido como texto plano
    }
})
}