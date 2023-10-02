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
let prueba = new Array();

setInterval(() =>fetch("sites/leer_variables.html")
        .then(response => response.text())
        .then(datos => prueba = datos.split("/")), 500);

setInterval(() =>{
  homing = prueba[0];
  destino = prueba[1];
  confirmar_destino = prueba[2];
  inicio = prueba[3];
  orden_mover = prueba[4];
}, 500);

setInterval(() => {
  document.getElementById("homing").innerHTML = "Homing: " + homing;
  document.getElementById("destino").innerHTML = "destino: " + destino;
  document.getElementById("c_destino").innerHTML = "confirmar_destino: " + confirmar_destino;
  document.getElementById("inicio").innerHTML = "inicio: " + inicio;
  document.getElementById("o_mover").innerHTML = "orden_mover: " + orden_mover;
}, 500);