var map;
var currentIndex = 21; // start with file 21
var maxIndex = 82; // end with file 82

function preload() {
  loadJSON('' + currentIndex + '.geojson', function(data) {

    var polyline = L.geoJSON(data).addTo(map);


    map.fitBounds(polyline.getBounds());
  });
}

function setup() {

  map = L.map('mapid').setView([49.2827, -123.1207], 13);


  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);
}

function draw() {

  if (frameCount === 1) return;

  currentIndex++;

  if (currentIndex > maxIndex) noLoop();


  loadJSON('path/to/geojson/files/' + currentIndex + '.geojson', function(data) {

    var polyline = L.geoJSON(data).addTo(map);


    map.fitBounds(polyline.getBounds());
  });
}
