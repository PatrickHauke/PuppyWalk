var userParks = []
  
  function initMap() {

    var parkCount = 0;
    // Intialize our map
      var center = new google.maps.LatLng(40.6782, -73.9442);
      var mapOptions = {
        zoom: 12,
        center: center
      }
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);


      // Construct the catalog query string
      url = 'https://data.cityofnewyork.us/resource/y6ja-fw4f.json?' //data
      +'&$$app_token=09sIcqEhoY0teGY5rhupZGqhW'; //dummy api key from their tutorial


    var parks = {
      type: "FeatureCollection",
      features:[]
        }
      
      // Retrieve our data and plot it
      $.ajax({
        url: 'https://data.cityofnewyork.us/resource/y6ja-fw4f.json',
        type: 'GET',
        dataType: 'json',
        data: {
          "$select":"the_geom,parknum,park_name",
          "$where":"parknum like 'B%'",
          "$limit":"5000"
        },
      })
      .done((data) => {
        console.log("success");
            $.each(data, function(i, entry) {


              // add metadata to geoJson
              var properties = {
                parkNum : entry.parknum,
                parkName : entry.park_name,
                selected : false
              }

              

              // add geometry to geoJSon
              var geometry = {
                type:"Polygon",
                coordinates: [[]]
              }

              //because first and last should match
              geometry.coordinates[0].push( [parseFloat(entry.the_geom.coordinates[0][0][0][0]), parseFloat(entry.the_geom.coordinates[0][0][0][1])]);
              
              entry.the_geom.coordinates[0][0].forEach( coords =>{
                geometry.coordinates[0].push([parseFloat(coords[0]), parseFloat(coords[1])]);
              });

              parks.features.push({
                type: "Feature",
                properties: properties,
                geometry: geometry
              });

              var park = {
                type: "Feature",
                properties: properties,
                geometry: geometry
              };


              // map.data.addGeoJson(park);

              parkCount++;
            });
    }).then( () => {
      console.log("loaded parks: " + parkCount);

      // add parks to map
      map.data.addGeoJson(parks);

      // set style
      map.data.setStyle( feature => {
        color = feature.getProperty('selected') ? 'green' : 'black';

        return ({fillColor: color})
      });

      // set click listener
        map.data.addListener('click', event =>{ 
          // console.log('I got clicked');
          console.log(event)

          event.feature.f.selected = !event.feature.f.selected;
          console.log(event.feature.f.selected)

        event.feature.f.selected ? map.data.overrideStyle(event.feature, {fillColor:"green"}) : map.data.overrideStyle(event.feature, {fillColor:"black"})


          if (event.feature.f.selected){
            userParks.push(event.feature.f.parkNum)
          }
          else{
            userParks = userParks.filter( (park) => {
              return park != event.feature.f.parkNum;
            });

            
          }
      
          console.log("userParks: " + userParks)
          // $('#parksList').append( $('<li>').append('Park Number: '+ event.feature.f.parkNum + '<br>Park Name: ' + event.feature.f.parkName));




        });

    });
      
  }

  $(document).ready(function() {
    $("#parksBtn").click(function(event) {
      alert(userParks);
    });
  });