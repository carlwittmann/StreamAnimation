var map;
var currentIndex = 21; // start with file 21
var maxIndex = 82; // end with file 82

function preload() {
  loadJSON('C:\Users\cwitt\Documents\GitHub\StreamAnimation\stream_geojsons' + currentIndex + '.geojson', function(data) {
    // create a Leaflet polyline from the GeoJSON data
    var polyline = L.geoJSON(data).addTo(map);

    // zoom the map to fit the polyline bounds
    map.fitBounds(polyline.getBounds());
  });
}

function setup() {
  // create the Leaflet map
  map = L.map('mapid').setView([49.2827, -123.1207], 13);

  // add an OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);
}

function draw() {
  // wait for the current GeoJSON file to load
  if (frameCount === 1) return;

  // increment the file index
  currentIndex++;

  // if we've reached the end of the files, stop looping
  if (currentIndex > maxIndex) noLoop();

  // load the next GeoJSON file
  loadJSON('path/to/geojson/files/' + currentIndex + '.geojson', function(data) {
    // create a Leaflet polyline from the GeoJSON data
    var polyline = L.geoJSON(data).addTo(map);

    // zoom the map to fit the polyline bounds
    map.fitBounds(polyline.getBounds());
  });
}
