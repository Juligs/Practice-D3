var datos = [];

function cargarDatos() {
  d3.json("datos.json", function (err, data) {
    //Elemento que carga una funcion de un elementoe externo
    datos = data;
    graficar();
  });
}

function graficar() {
  var width = 300,
    height = 300;

  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width) //Atributos de la grafica
    .attr("height", height)
    .append("g");

  xRange = d3.scale
    .linear()
    .range([0, width]) //Rango de la grafica en X, Rango de donde a donde va abarcar la grafica
    //contiene el punto inicial y el punto final
    .domain([
      d3.min(datos, function (d) {
        return d.x;
      }),
      d3.max(datos, function (d) {
        //Datos maximos para poder mostrarlo
        return d.x;
      }),
    ]);

  yRange = d3.scale //En y es lo mismo
    .linear()
    .range([height, 0]) //Rango de la grafica en X, Rango de donde a donde va abarcar la grafica
    //contiene el punto inicial y el punto final
    .domain([
      d3.min(datos, function (d) {
        return d.y;
      }),
      //dominio todos los datos de los ejes x e y que se van a graficar

      d3.max(datos, function (d) {
        //Datos maximos para poder mostrarlo
        return d.y;
      }),
    ]);

  let lineFunc = d3.svg
    .line() //Dibujar linea
    .x(function (d) {
      //donde va comenzar la linea en x
      return xRange(d.x);
    })
    .y(function (d) {
      return yRange(d.y); //donde va terminar la linea en y
    })
    .interpolate("basis"); //interpolacion de la linea (tipo de linea, cambia ele stilo de linea

  svg
    .append("path") //path te ayuda a dibujar distintos tipos de formas
    .attr("d", lineFunc(datos)); //d es el atributo que se le asigna a la linea
}
