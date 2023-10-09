const movimientoManual = require("./movimientoManual")

describe("movimientoManual", () => {
  beforeEach(() => {
    global.imgTranvia = {
      style: {
        left: "36%",
      },
      classList: {
        remove: jest.fn(),
      },
    }

    global.animacionesNombre = []
    global.entrado = false
    global.posicionActual = 1
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("debería mover el tranvía a la posición 0 correctamente", () => {
    movimientoManual(0)

    expect(global.imgTranvia.style.left).toBe("19%")
    expect(global.imgTranvia.classList.remove).toHaveBeenCalledWith(/* ... */)
    expect(global.entrado).toBe(true)
  })
})
