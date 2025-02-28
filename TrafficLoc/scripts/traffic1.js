define("DS/TrafficLoc/scripts/traffic1", [], function () {
    'use strict';

    var myWidget = {
        onLoad: function () {
            // Creating HTML content with map container
            widget.body.innerHTML = "<div id='map' style='width: 100%; height: 500px;'></div>"; // Added map container

            // Initialize the map
            myWidget.initMap();
        },

        initMap: function() {
            // Create a Leaflet map instance
            var map = L.map('map').setView([51.505, -0.09], 13);  // Default center is London with zoom level 13

            // Add OpenStreetMap tile layer to the map
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Add a marker to the map at the center location
            L.marker([51.505, -0.09]).addTo(map)
                .bindPopup('<b>Hello world!</b><br>I am a popup.')
                .openPopup();

            // Optional: Add a custom event listener for clicks on the map
            map.on('click', function(e) {
                var clickedLocation = e.latlng;
                console.log("You clicked the map at: " + clickedLocation.lat + ", " + clickedLocation.lng);
                L.marker([clickedLocation.lat, clickedLocation.lng]).addTo(map)
                    .bindPopup('You clicked here!')
                    .openPopup();
            });
        }
    };

    widget.addEvent("onLoad", myWidget.onLoad);
});
