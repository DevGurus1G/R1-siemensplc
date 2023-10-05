// constantes de los botones e img tranvia
const btnInicio = document.querySelector("#inicio");
btnInicio.disabled = true;
const btnParar = document.querySelector("#parar");
btnParar.disabled = true;
const btnConfirmarDestino = document.querySelector("#confirmarDestino");
btnConfirmarDestino.disabled = true;
const desplegableDestino = document.querySelector("#paradas");
desplegableDestino.disabled = true;
const imgTranvia = document.querySelector(".tranvia")
const pilotoEncendido = document.querySelector(".estado")
const leyendaPiloto = pilotoEncendido.querySelector(".leyenda")
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

function verificarHoming(){

  return new Promise((resolve, reject) => {

      if (comprobarHomingNumerico()) {
          resolve("El homing esta encendido.");
      } else {
          reject("El homing esta apagado.");
      }
       
  });

}

function comprobarHomingNumerico() {
  return homing == 1 ? true : false
}

verificarHoming()
.then((resultado) => {
    homingEncendido()
})
.catch((error) => {
  setTimeout(() =>{
    verificarHoming()
},500)

});

function homingEncendido() {
  
  btnInicio.disabled = false
  btnParar.disabled = false
  btnConfirmarDestino.disabled = false
  desplegableDestino.disabled = false
  pilotoEncendido.style.backgroundColor = "#006f2b";
  leyendaPiloto.textContent = "Encendido";

}

//Funciones para la logica del movimiento

let posicionActual = 0
let entrado = false
let ejecutado = false
function movimientoCiclico() {
  if (inicio == 1) {
    //TODO Aqui va el codigo para que empieze la animacion ciclica
    if (comprobarListoMoverCiclico()) {
      if(!entrado) {
        imgTranvia.classList.add("homePrimera")
        entrado = true
        ejecutado = true
       }
      if(!ejecutado)
      {
        if (posicionActual == 8) posicionActual = 0
        empezarAnimacion(posicionActual)
        posicionActual++
        ejecutado = true
      }
    }else{
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

function mandarDatos(variable,valor){
  fetch(window.location.href, {
    method: 'POST',
    body: '' + bdd + '.' + variable + '=' + valor + '', 
    headers: {
        'Content-Type': 'text/plain'
    }
})
}

//Eventos cuando se clicka botones para mandar datos

btnInicio.addEventListener("click", () => {
	mandarDatos("INICIO",1)
});
btnParar.addEventListener("click", () => mandarDatos("INICIO",0));
btnConfirmarDestino.addEventListener("click", () => {
	mandarDatos("CONFIRMAR_DESTINO",1);
	setTimeout(() => mandarDatos("CONFIRMAR_DESTINO", 0), 500)
})
desplegableDestino.addEventListener("click", () => {
	mandarDatos("DESTINO", desplegableDestino.value)
});