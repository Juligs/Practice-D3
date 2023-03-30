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
    .linear()
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

  let lineFunc = d3.svg //donde se dibuha la linea
    .line()
    .x(function (d) {
      return xRange(d.x + 20);
    })
    .y(function (d) {
      return yRange(d.y + 16);
    })
    .interpolate("basis");

  svg.append("svg:path").attr("d", lineFunc(datos)).attr("class", "linea");

  let xAxis = d3.svg.axis().scale(xRange).orient("bottom").ticks(8); //Método ticks cuanta cantidad de datos hay desplegados Escalado mas claro y preciso
  //se despliega hasta el fondo
  let yAxis = d3.svg.axis().scale(yRange).orient("left").ticks(8); //se despliega hasta el fondo
  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(30,280)") //se despliega hasta el fondo los ejes
    .call(xAxis); //llamamos al eje x definido

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(30,-20)") //se despliega hasta el fondo los ejes
    .call(yAxis); //llamamos al eje x definido
}
