var map;
var currentIndex = 21; // This is the highest elevation and the starting value for the index 
var maxIndex = 82; // This is the lowest elevation and the final value for the index
var polylineGroup = L.layerGroup(); // Creating a single layer group containing all the geojson files to speed up rendering
var loadedPolylines = []; // This is the elevation value that is currently loaded

// Boilerplate setup stuff + preloading GeoJSON data
function setup() {
  map = L.map('mapid').setView([49.43687, -123.05016], 11); 
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  
  loadGeoJSON();
}

// This loads the appropriate GeoJSON file as the index incrementally loads each group of line segments
// Also a bit of line styling.
function loadGeoJSON() {
  loadJSON('stream_geojsons/' + currentIndex + '.geojson', function(data) {
    var polyline = L.geoJSON(data, {
      style: function(feature) {
        return {
          weight: 1,
          color: '#84dcc6'
        };
      }
    });
 
// Adding the currently loaded GeoJSON to the layer group
    polylineGroup.addLayer(polyline);
    loadedPolylines.push(polyline);

// Index function for incrementing through the folder of GeoJSONs as they are drawn
// Also clears the drawing once we reach the maximum index value /  lowest elevation
    currentIndex++;
    if (currentIndex > maxIndex) {
      polylineGroup.addTo(map);
      currentIndex = 21;
      loadedPolylines = [];
      polylineGroup.clearLayers();
    }

// Speeding up the animation to 10 frames per second / 100 ms per frame
    setTimeout(loadGeoJSON, 100);
  });
}
