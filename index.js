// constantes de los botones e img tranvia
const btnMartxa = document.querySelector("#martxa")
const btnAbrirPuertas = document.querySelector("#abrirPuertas")

const imgTranvia = document.querySelector(".tranvia")

let animacionesNombre = [
  "homePrimera",
  "primeraSegunda",
  "segundaTercera",
  "terceraCuarta",
  "cuartaQuinta",
]

function empezarAnimacion() {
  btnMartxa.classList.add("active")
  imgTranvia.classList.add("homePrimera")
}

//Variables del plc que se utilizaran en la web
let homing;
let destino;
let confirmar_destino;
let inicio;
let orden_mover;
// Array donde se guardan todas las variables que se leen del archivo "leer_variables.html"
let arrayVariablesPlc = new Array();
// Variable para saber en que parada esta actualmente el tranvia
let posicionActual;

setInterval(() =>fetch("sites/leer_variables.html")
        .then(response => response.text())
        .then(datos => arrayVariablesPlc = datos.split("/")), 500);

setInterval(() =>{
  homing = arrayVariablesPlc[0];
  destino = arrayVariablesPlc[1];
  confirmar_destino = arrayVariablesPlc[2];
  inicio = arrayVariablesPlc[3];
  orden_mover = arrayVariablesPlc[4];
}, 500);

//Funciones para la logica del movimiento

function homingParada0(){
  if(homing == "1"){
    //TODO Aqui va el codigo para la animacion de cochera a parada 0
  }
}

function movimientoCiclico(){
  if(inicio == "1"){
    //TODO Aqui va el codigo para que empieze la animacion ciclica
  }
}

function comprobarListoMoverCiclico(){
  // Funcion que devuelve un 1 cuando esta listo para moverse
  return orden_mover == "1" ? 1 : 0
}