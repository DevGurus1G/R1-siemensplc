/**
 * Obtiene los datos de estadísticas almacenados en el almacenamiento local (localStorage) y los parsea como un objeto JSON.
 * @type {Object}
 */
const dataStorage = JSON.parse(localStorage.getItem("estadistica"));

/**
 * Elemento del DOM que representa el gráfico de barras.
 * @type {HTMLCanvasElement}
 */
const graph = document.querySelector("#grafico");

/**
 * Configuración de datos para el gráfico de barras.
 * @type {Object}
 */
const data = {
  datasets: [
    {
      /**
       * Etiqueta del conjunto de datos del gráfico.
       * @type {string}
       */
      label: "Paradas",
      /**
       * Datos de estadísticas de paradas obtenidos del almacenamiento local.
       * @type {number[]}
       */
      data: dataStorage,
      /**
       * Color de fondo de las barras del gráfico.
       * @type {string[]}
       */
      backgroundColor: [
        "rgba(1, 38, 34, 0.2)",
        "rgba(49, 38, 34, 0.2)",
        "rgba(87, 12, 17, 0.2)",
        "rgba(112, 89, 44, 0.2)",
        "rgba(167, 112, 65, 0.2)",
      ],
    },
  ],
};

/**
 * Configuración general del gráfico de barras.
 * @type {Object}
 */
const config = {
  /**
   * Tipo de gráfico: gráfico de barras.
   * @type {string}
   */
  type: "bar",
  /**
   * Datos utilizados para el gráfico.
   * @type {Object}
   */
  data: data,
  /**
   * Opciones de configuración para el gráfico.
   * @type {Object}
   */
  options: {
    /**
     * Habilita la capacidad de respuesta del gráfico para adaptarse al tamaño de la pantalla.
     * @type {boolean}
     */
    responsive: true,
    /**
     * Plugins del gráfico, incluyendo el título.
     * @type {Object}
     */
    plugins: {
      /**
       * Configuración del título del gráfico.
       * @type {Object}
       */
      title: {
        /**
         * Indica si se debe mostrar el título en el gráfico.
         * @type {boolean}
         */
        display: true,
        /**
         * Texto del título del gráfico.
         * @type {string}
         */
        text: "Las paradas que más se toman",
      },
    },
    /**
     * Configuración de las escalas en el gráfico.
     * @type {Object}
     */
    scales: {
      /**
       * Configuración de la escala X (horizontal).
       * @type {Object}
       */
      x: {
        /**
         * Configuración de la cuadrícula en la escala X.
         * @type {Object}
         */
        grid: {
          /**
           * Indica si se debe mostrar la cuadrícula en la escala X.
           * @type {boolean}
           */
          display: false,
        },
      },
      /**
       * Configuración de la escala Y (vertical).
       * @type {Object}
       */
      y: {
        /**
         * Configuración de la cuadrícula en la escala Y.
         * @type {Object}
         */
        grid: {
          /**
           * Indica si se debe mostrar la cuadrícula en la escala Y.
           * @type {boolean}
           */
          display: false,
        },
      },
    },
  },
};

/**
 * Crea un nuevo gráfico de barras en el elemento especificado del DOM utilizando la configuración proporcionada.
 */
new Chart(graph, config);
