var datos = [];

function cargarDatos() {
  d3.json("datos.json", function (err, data) {
    datos = data;
    graficar();
  });
}

function graficar() {
  var width = 300;
  var height = 300;
  var radius = math.min(width, height) / 2; //Media de nuestro gráfico
  var color = d3.scaleBand
    .ordinal()
    .range(["Brown", "CadetBlue", "Yellow", "CornflowerBlue", "DarkGoldenRod"]);

  var arc = d3.svg
    .arc()
    .outerRadius(radius - 10) //Radio externo
    .innerRadius(0); //Radio interno  gráfico de dona

  var pie = d3.layout
    .pie() //Genera los datos para el gráfico de dona, entiende la informacion del archivo json
    .value(function (d) {
      return d.dato;
    });

  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g") //  g es svg agrupar elementos
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); //Centrar el gráfico , mueve el gráfico con el translate

  var g = svg
    .selectAll("arc")
    .data(pie(datos))
    .enter()
    .append("g") // Agrupar elementos
    .attr("class", "arc"); // Administrar los estilos con arc

  g.append("path") //Subetiqueta de sgv para establecer elementos
    .attr("d", arc)
    .style("fill", function (d) {
      return color(d.data.nombre);
    });

  g.append("text")
    .text(function (d) {
      return d.data.nombre + " " + d.data.dato; //informacion almacenada a los datos
    })

    .attr("transfrom", function (d) {
      return "translate(" + arc.centroid(d) + "),rotate(" + angle(d) + ")"; //Centrar el texto
    }); //con angle centramos el texto con los angulos que le pertenecen

  function angle(d) {
    var a = ((d.startAngle + d.endAngle) * 90) / Math.PI - 90;
    return a > 90 ? a - 180 : a; //Rotar el texto
  }
}
