// constantes de los botones e img tranvia
const btnMartxa = document.querySelector("#martxa")
const btnParo = document.querySelector("#paro")
const btnAvance = document.querySelector("#avance")
const btnRetroceso = document.querySelector("#retroceso")

const imgTranvia = document.querySelector(".tranvia")

btnMartxa.addEventListener("click", ponerEnMartxa)
btnParo.addEventListener("click", parar)
btnAvance.addEventListener("click", avanzar)
btnRetroceso.addEventListener("click", retroceder)

// Variable para resetear el left
let contador = 0
function ponerEnMartxa() {
  btnMartxa.classList.toggle("active")
  imgTranvia.classList.toggle("animacionTranvia")
  contador % 2 != 0
    ? (imgTranvia.style.left = "0%")
    : (imgTranvia.style.left = "16%")
  console.log(imgTranvia.style.left)
  contador++
}

function parar() {
  btnParo.classList.toggle("active")
  let leftActual = imgTranvia.style.left
  imgTranvia.classList.toggle("animacionTranvia")
  imgTranvia.style.left = leftActual
}

function avanzar() {
  btnAvance.classList.toggle("active")
}

function retroceder() {
  btnRetroceso.classList.toggle("active")
}
