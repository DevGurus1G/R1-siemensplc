// constantes de los botones e img tranvia
const btnMartxa = document.querySelector("#martxa")
const btnParo = document.querySelector("#paro")
const btnAvance = document.querySelector("#avance")
const btnRetroceso = document.querySelector("#retroceso")

const imgTranvia = document.querySelector(".tranvia")

btnMartxa.addEventListener("click", alternarAnimacion)
btnParo.addEventListener("click", alternarAnimacion)
btnAvance.addEventListener("click", avanzar)
btnRetroceso.addEventListener("click", retroceder)

let animation
let isAnimating = false
function alternarAnimacion() {
  if (!isAnimating) {
    empezarAnimacion()
  } else {
    pausarOcontinuarAnimacion()
  }
}

function empezarAnimacion() {
  btnMartxa.classList.add("active")
  if (!animation) {
    if (imgTranvia.style.left != 0) {
      imgTranvia.style.left = "0%"
    }
    imgTranvia.style.left = "16%"
    animation = imgTranvia.animate(
      [{ left: "16%" }, { left: "82%" }, { left: "16%" }],
      {
        duration: 7500,
        iterations: Infinity,
        delay: 500,
      }
    )
  }
  isAnimating = true
}

function pausarOcontinuarAnimacion() {
  if (animation) {
    if (!animation.playState || animation.playState === "running") {
      btnParo.classList.add("active")
      animation.pause()
    } else {
      btnParo.classList.remove("active")
      animation.play()
    }
  }
}

function avanzar() {
  btnAvance.classList.toggle("active")
  setTimeout(() => btnAvance.classList.toggle("active"), 3000)
}

function retroceder() {
  btnRetroceso.classList.toggle("active")
}
