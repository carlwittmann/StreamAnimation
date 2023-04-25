var map;
var currentIndex = 21; // start with file 21
var maxIndex = 82; // end with file 82
var polylineGroup = L.layerGroup(); // create a new layer group
var loadedPolylines = []; // keep track of loaded polylines

function setup() {
  map = L.map('mapid').setView([49.41997, -123.05016], 11);

  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  loadGeoJSON();
}

function loadGeoJSON() {
  loadJSON('stream_geojsons/' + currentIndex + '.geojson', function(data) {
    // create a new polyline from the loaded data
    var polyline = L.geoJSON(data, {
      style: function(feature) {
        return {
          weight: 1,
          color: '#0099ff'
        };
      }
    });

    // add the new polyline to the layer group
    polylineGroup.addLayer(polyline);

    // add the new polyline to the loadedPolylines array
    loadedPolylines.push(polyline);

    // increment the index
    currentIndex++;

    // if we have reached the end of the files, add the layer group to the map and clear it
    if (currentIndex > maxIndex) {
      polylineGroup.addTo(map);
      currentIndex = 21;
      loadedPolylines = [];
      polylineGroup.clearLayers();
    }

    // call the loadGeoJSON function again after a delay
    setTimeout(loadGeoJSON, 100);
  });
}
