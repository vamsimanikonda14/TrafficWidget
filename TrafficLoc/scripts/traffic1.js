define("DS/TrafficLoc/scripts/traffic1", [], function () {
    'use strict';

    var myWidget = {
        onLoad: function () {
            // Create HTML content with a map container
            widget.body.innerHTML = '<div id="mapContainer" style="height: 400px; width: 100%;"></div>';

            // Check if the browser supports geolocation
            if (navigator.geolocation) {
                // Get the user's current position
                navigator.geolocation.getCurrentPosition(function (position) {
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;

                    // Now that we have the coordinates, display the map
                    myWidget.showMap(lat, lon);
                }, function (error) {
                    console.error("Error getting geolocation: " + error.message);
                    alert("Unable to retrieve your location.");
                });
            } else {
                console.error("Geolocation is not supported by this browser.");
                alert("Geolocation is not supported by this browser.");
            }
        },

        showMap: function (latitude, longitude) {
            // Example using Leaflet.js to display a map
            // Create a map centered on the user's location
            var map = L.map('mapContainer').setView([latitude, longitude], 13);

            // Add a tile layer to the map (using OpenStreetMap here)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Add a marker at the user's location
            L.marker([latitude, longitude]).addTo(map)
                .bindPopup('You are here!')
                .openPopup();
        }
    };

    widget.addEvent("onLoad", myWidget.onLoad);
});
