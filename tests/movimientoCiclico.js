function movimientoCiclico() {
  if (inicio == 1) {
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

module.exports = movimientoCiclico
