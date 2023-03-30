var datos = [];

function cargarDatos() {
  d3.json("datos.json", function (err, data) {
    datos = data;
    graficar();
  });
}

function graficar() {
  var width = 500;
  var height = 500;

  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(40,0)");

  var cluster = d3.layout.cluster().size([height, width - 160]); // Se  encarga de saber cuantos nodos vamos a tener

  var diagonal = d3.svg
    .diagonal() // Se encarga de dibujar las lineas y unir los nodos
    .projection(function (d) {
      return [d.y, d.x];
    });

  var nodes = cluster.nodes(datos); // Se encarga de dibujar los nodos de los datos que vienen del json

  var links = cluster.links(nodes); //links agrega las propiedad necesarias a cada objeto para cada liga, si un objeto tiene un hijo indica cual es el hijo

  var link = svg
    .selectAll(".link")
    .data(links)
    .enter()
    .append("path") //Se dibujan las lineas, fill: none en css
    .attr("class", "link")
    .attr("d", diagonal);

  var node = svg
    .selectAll(".node") //Se dibujan los nodos, se dibuja un circulo
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + d.y + "," + d.x + ")";
    });

  node.append("circle").attr("r", 4.5);

  node
    .append("text")
    .attr("dx", function (d) {
      return d.children ? -8 : 8; //Si tiene hijos se dibuja a la izquierda, si no a la derecha con sus nombres
    })
    .attr("dy", 3)
    .style("text-anchor", function (d) {
      return d.children ? "end" : "start";
    })
    .text(function (d) {
      return d.name;
    });
}
