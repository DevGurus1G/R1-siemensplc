const mandarDatos = require("./mandarDatos")

global.fetch = jest.fn()

global.window = {
  location: {
    href: "http://euskotren.eus",
  },
}

global.bdd = '"DATOSWEB"'

test("mandarDatos envía una solicitud POST con los datos correctos", () => {
  const variable = "INICIO"
  const valor = "1"

  mandarDatos(variable, valor)

  expect(global.fetch).toHaveBeenCalledTimes(1)

  expect(global.fetch).toHaveBeenCalledWith(global.window.location.href, {
    method: "POST",
    body: "" + bdd + "." + variable + "=" + valor + "",
    headers: {
      "Content-Type": "text/plain",
    },
  })
})
