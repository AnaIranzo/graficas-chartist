// Our labels and three data series
/*  var data = {
    labels: [],
    series: [
        []
    ]
};  */

//https://swapi.dev/api/films/
//'results'.'title'
//'results'."release_date" 


async function getFilmDate() {
    let response = await fetch('https://swapi.dev/api/films/')
    let datos = await response.json()
    let dataPelicula = datos.results

    let titulos = []
    let fechas = []
    //recorremos dataPelicula y guardamos los datos en las variables titulos y fechas
    for (const pelicula of dataPelicula) {
        titulos.push(pelicula.title) 
        fechas.push(pelicula.release_date)
       
        
    }
    //las fechas vienen en formato 'aaaa-mm-dd' hay que dejar solo el año y pasarlo a número 

    fechas = fechas.map(fecha => fecha.substring(0,4))
    fechas = fechas.map(fecha => parseInt(fecha))

    console.log(titulos);
    console.log(fechas);
    
    
    let data = {
        labels: [],//si ponemos titulos aqui se meten todos en el primer indice
        series: [],
    };

   data.labels = titulos
   data.series = [fechas]//IMPORTANTE PASAR UN ARRAY DE ARRAYS
  
   // We are setting a few options for our chart and override the defaults
    const options = {
    // Don't draw the line chart points
    showPoint: true,
    // Disable line smoothing
    lineSmooth: false,
    // X-Axis specific configuration
    axisX: {
        // We can disable the grid for this axis
        showGrid: true,
        // and also don't show the label
        showLabel: true,
    },
    // Y-Axis specific configuration
    axisY: {
        // Lets offset the chart a bit from the labels
        offset: 60,
        // The label interpolation function enables you to modify the values
        // used for the labels on each axis. Here we are converting the
        // values into million pound.
        labelInterpolationFnc: function (value) {
            return Math.trunc(value);
        }
    }
};

// All you need to do is pass your configuration as third parameter to the chart function
    
    new Chartist.Line('.ct-chart', data, options);
   

}

getFilmDate()


async function getCharacter() {
    
    let response = await fetch('https://swapi.dev/api/people/')
    let datos = await response.json()
    let datosPersonajes = await datos.results
    console.log(datosPersonajes)

    let personajes = []
    let peliculas = []

    //usamos map para sacar un array con los nombres de los personajes y la longitud del array de peliculas
    personajes = await datosPersonajes.map((personaje) => personaje.name)
    peliculas = await datosPersonajes.map(peliculas => (peliculas.films).length)
    // const longuitud = peliculas.map((peliculas)=> peliculas)

    console.log(personajes);
    console.log(peliculas);
    
    var data = {
        labels: [],
          series: [
          []
          
        ]
      };
      

    data.labels = personajes
    data.series = [peliculas]
      var options = {
        seriesBarDistance: 15
      };
      
      var responsiveOptions = [
        ['screen and (min-width: 641px) and (max-width: 1024px)', {
          seriesBarDistance: 10, //distancia entre las barras
          axisX: {
            labelInterpolationFnc: function (value) {
              return value;
            }
          }
        }],
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      
      new Chartist.Bar('.ct-chart1', data, options, responsiveOptions);
}


getCharacter()