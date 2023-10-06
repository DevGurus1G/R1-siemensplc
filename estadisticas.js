const dataStorage = JSON.parse(localStorage.getItem("estadistica"))

const graph = document.querySelector("#grafico")
const data = {
  datasets: [
    {
      label: "Paradas",
      data: dataStorage,
      backgroundColor: [
        "rgba(1, 38, 34, 0.2)",
        "rgba(49, 38, 34, 0.2)",
        "rgba(87, 12, 17, 0.2)",
        "rgba(112, 89, 44, 0.2)",
        "rgba(167, 112, 65, 0.2)",
      ],
    },
  ],
}

const config = {
  type: "bar",
  data: data,
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Las paradas que mas se toman",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  },
}

new Chart(graph, config)
