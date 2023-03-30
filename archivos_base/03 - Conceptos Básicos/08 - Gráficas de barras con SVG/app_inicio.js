let datos = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

function graficar() {
  let w = 500;
  let h = 300;
  let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

  svg
    .selectAll("rect")
    .data(datos)
    .enter() // Crea los elementos que no existen , reserva el espacio
    .append("rect") //inyecyamos el rectangulo
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", 100)

    .attr("x", function (d, i) {
      return i * 21 + 30; //dato que esta interando cada append y la i posicion en la que se encuentra  ,
      //21 es el ancho del rectangulo 20+1  espacio el 30 es el margen pega todo al borde izquierdo
    })
    .attr("height", function (d) {
      return d;
    })

    //Agragamos la parte contraria, para que se invierta el grafico
    .attr("y", function (d) {
      return h - d; // Altura menos el valor del dato
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
      return i * 21 + 40; //5
    })
    .attr("y", function (d) {
      return h - d - 3; //+15
    });
}
