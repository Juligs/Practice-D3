let datos = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

function graficar() {
  let svg = d3.select("body").append("svg");

  let circles = svg.selectAll("circle").data(datos).enter().append("circle");

  circles
    .attr("cx", function (d, i) {
      return i * 80 + 25;
    })
    .attr("cy", 300 / 2)
    .attr("r", function (d) {
      return d;
    });
}
