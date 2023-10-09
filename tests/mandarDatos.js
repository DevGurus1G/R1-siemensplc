function mandarDatos(variable, valor) {
  fetch(window.location.href, {
    method: "POST",
    body: "" + bdd + "." + variable + "=" + valor + "",
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
module.exports = mandarDatos
