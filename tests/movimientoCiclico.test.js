// Importa la función que deseas probar
const movimientoCiclico = require("./movimientoCiclico")

describe("movimientoCiclico", () => {
  beforeEach(() => {
    global.inicio = 1
    global.entrado = false
    global.ejecutado = false
    global.posicionActual = 0

    global.imgTranvia = {
      classList: {
        add: jest.fn(),
      },
    }

    global.comprobarListoMoverCiclico = jest.fn(() => true)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("debería ejecutar movimientoCiclico correctamente cuando inicio es igual a 1", () => {
    movimientoCiclico()

    expect(global.imgTranvia.classList.add).toHaveBeenCalledWith("homePrimera")
    expect(global.entrado).toBe(true)
    expect(global.ejecutado).toBe(true)

    expect(global.comprobarListoMoverCiclico).toHaveBeenCalledTimes(1)
  })
})
