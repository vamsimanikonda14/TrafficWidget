define("DS/TrafficLoc/scripts/Traffic", [DS/WAFData/WAFData], function (WAFData) {
    'use strict';

    var myWidget = {
        onLoad: function () {
            // Creating HTML content with map container
            widget.body.innerHTML = "<div id='map' style='width: 100%; height: 500px;'></div>"; // Added map container

            // Initialize the map
            myWidget.initMap();
        },

        initMap: function() {
            // Create a TomTom map instance
            var map = tomtom.L.map('map', {
                key: 'e7TPeERXJGg5odC4yjsQ9CflXKbcnwO3',  // Your TomTom API key
                zoom: 12
            });

            // Add TomTom tile layer for the map
            tomtom.L.tileLayer('https://api.tomtom.com/map/1/tile/basic/{z}/{x}/{y}.png?key=e7TPeERXJGg5odC4yjsQ9CflXKbcnwO3').addTo(map);

            // Get the user's location and center the map
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var userLocation = [position.coords.latitude, position.coords.longitude];
                    map.setView(userLocation, 12); // Center map on user's location

                    // Call the function to get traffic data
                    myWidget.getTrafficData(userLocation, map);
                }, function(error) {
                    console.error('Error getting user location:', error);
                    alert('Could not retrieve your location. Showing default location instead.');
                    // Default to a fallback location if geolocation fails
                    var fallbackLocation = [52.41072, 4.84239];
                    map.setView(fallbackLocation, 12); // Set map to fallback location
                    myWidget.getTrafficData(fallbackLocation, map);
                });
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        },

        getTrafficData: function(userLocation, map) {
            // Get traffic data from TomTom API for the user's location
            var apiUrl = `https://api.tomtom.com/traffic/services/4/flowSegmentData/relative0/10/json?point=${userLocation[0]}%2C${userLocation[1]}&unit=KMPH&openLr=false&key=e7TPeERXJGg5odC4yjsQ9CflXKbcnwO3`;

            // Fetch traffic data
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log("Traffic Data", data);

                    // Get traffic flow segment data from the response
                    var trafficFlow = data.flowSegmentData.flow;
                    var color = 'green'; // Default to low traffic (green)

                    // Determine traffic color based on flow
                    if (trafficFlow < 30) {
                        color = 'red';  // High traffic (Red)
                    } else if (trafficFlow < 60) {
                        color = 'yellow';  // Medium traffic (Yellow)
                    }

                    // Add a circle marker to the map indicating traffic status
                    var marker = L.circleMarker(userLocation, {
                        radius: 10,
                        color: color,
                        fillOpacity: 0.6,
                        fillColor: color
                    }).addTo(map);

                    // Optionally, add a popup to the marker to display traffic information
                    marker.bindPopup(`<b>Traffic Flow:</b> ${trafficFlow} KMPH`).openPopup();
                })
                .catch(error => {
                    console.log("Error fetching traffic data", error);
                });
        }
    };

    widget.addEvent("onLoad",myWidget.onLoad);
});
