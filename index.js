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
