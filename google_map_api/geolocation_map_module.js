function findGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let contentString = '<h2 style=\'color: maroon;\'>Askartech</h2>';
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            let infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            let homeMarker = new google.maps.Marker({
                position: pos,
                map: map
            });

            homeMarker.addListener('click', function() {
                infowindow.open(map, homeMarker);
            });
            map.setCenter(pos);

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        handleLocationError(false, infoWindow, mapCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
}