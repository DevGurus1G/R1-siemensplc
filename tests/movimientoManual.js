const arrayCoincidentePosicion = [1, 2, 3, 4, 3, 2, 1, 0]

function encontrarPosicionesDestino(destinoSeleccionado) {
  const posiciones = []
  for (let i = 0; i < arrayCoincidentePosicion.length; i++) {
    if (arrayCoincidentePosicion[i] === destinoSeleccionado) {
      posiciones.push(i)
    }
  }
  return posiciones
}

function movimientoManual(destinoSeleccionado) {
  /**
   * Array con los porcentajes para el movimiento del tranvía hacia diferentes destinos.
   * @type {number[]}
   */
  const destinoPorcentajes = [19, 36, 53, 70, 86]

  /**
   * Elimina todas las clases de animación del tranvía.
   */
  imgTranvia.classList.remove(...animacionesNombre)
  imgTranvia.classList.remove("homePrimera")

  /**
   * Almacena el valor de la propiedad `left` del tranvía antes de entrar al switch, con y sin el símbolo "%".
   */
  let leftAnterior = imgTranvia.style.left
  let leftAnteriorLimpio = leftAnterior.substring(0, leftAnterior.length - 1)

  /**
   * Array con las posiciones de los dos posibles destinos de la animación (ida y vuelta).
   * @type {number[]}
   */
  const posiciones = encontrarPosicionesDestino(Number(destinoSeleccionado))

  /**
   * Switch que determina el destino seleccionado y actualiza la posición del tranvía en consecuencia.
   */
  switch (Number(destinoSeleccionado)) {
    case 0:
      imgTranvia.style.left = destinoPorcentajes[0] + "%"
      if (leftAnteriorLimpio < destinoPorcentajes[0])
        posicionActual = posiciones[0] + 1
      else posicionActual = posiciones[1] + 1
      break
    case 1:
      imgTranvia.style.left = destinoPorcentajes[1] + "%"
      if (leftAnteriorLimpio < destinoPorcentajes[1])
        posicionActual = posiciones[0] + 1
      else posicionActual = posiciones[1] + 1
      break
    case 2:
      imgTranvia.style.left = destinoPorcentajes[2] + "%"
      if (leftAnteriorLimpio < destinoPorcentajes[2])
        posicionActual = posiciones[0] + 1
      else posicionActual = posiciones[1] + 1
      break
    case 3:
      imgTranvia.style.left = destinoPorcentajes[3] + "%"
      if (leftAnteriorLimpio < destinoPorcentajes[3])
        posicionActual = posiciones[0] + 1
      else posicionActual = posiciones[1] + 1
      break
    case 4:
      imgTranvia.style.left = destinoPorcentajes[4] + "%"
      if (leftAnteriorLimpio < destinoPorcentajes[4])
        posicionActual = posiciones[0] + 1
      else posicionActual = posiciones[1] + 1
      break
    default:
      break
  }

  /**
   * Indica que el tranvía ha entrado en la animación manual.
   */
  entrado = true
}

module.exports = movimientoManual
