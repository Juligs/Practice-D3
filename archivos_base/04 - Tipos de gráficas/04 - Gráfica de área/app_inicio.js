let datos = [];

function cargarDatos() {
  d3.json("datos.json", function (err, data) {
    datos = data;
    graficar();
  });
}

function graficar() {
  let width = 300,
    height = 300;

  let svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g");

  xRange = d3.scale
    .linear() // Calculo lineal de todos los elementos disponible en x
    .range([0, width])
    .domain([
      d3.min(datos, function (d) {
        return d.x;
      }),
      d3.max(datos, function (d) {
        return d.x;
      }),
    ]);

  yRange = d3.scale
    .linear()
    .range([height, 0])
    .domain([
      d3.min(datos, function (d) {
        return d.y;
      }),
      d3.max(datos, function (d) {
        return d.y;
      }),
    ]);

  let area = d3.svg
    .area()
    .x(function (d) {
      return xRange(d.x); //Posicion en x
    })

    .y0(height) //Posicion en y hasta puedo llegar
    //si pongo .y0(0) se rellena desde el 0 hasta el valor de y (datos verticales
    .y1(function (d) {
      return yRange(d.y); //Posicion en y datos verticales
    })
    .interpolate("basis");

  let lineFunc = d3.svg
    .line()
    .x(function (d) {
      return xRange(d.x);
    })
    .y(function (d) {
      return yRange(d.y);
    })
    .interpolate("basis"); //Crea una curva suave entre los puntos

  svg.append("svg:path").attr("d", lineFunc(datos)).attr("class", "linea");
  svg.append("svg:path").datum(datos).attr("d", area).attr("class", "area");
}
