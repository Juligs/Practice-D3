let datos = [
  144, 89, 55, 34, 21, 13, 8, 5, 3, 2, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144,
];

function graficar() {
  let w = 500;
  let h = 300;

  let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

  svg
    .selectAll("rect")
    .data(datos)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", 100)

    .attr("x", function (d, i) {
      return i * 21 + 30;
    })

    .attr("height", function (d) {
      return d + 50;
    })

    .attr("y", function (d) {
      return h - d - 50;
    })
    .attr("fill", "SteelBlue")

    .on("mouseover", function () {
      // Método on llama al evento, mouseover
      d3.select(this).attr("fill", "tomato"); // this hace referencia al elemento que se está seleccionando cada uno de los elementos
      //fill, color de relleno
    })

    .on("mouseout", function () {
      // Método on, mouseout deja el color original
      d3.select(this).attr("fill", "SteelBlue");
    });

  svg
    .selectAll("text")
    .data(datos)
    .enter()
    .append("text")
    .text(function (d) {
      return d;
    })
    .attr("x", function (d, i) {
      return i * 21 + 40;
    })
    .attr("y", function (d) {
      return h - d - 53;
    });
}
