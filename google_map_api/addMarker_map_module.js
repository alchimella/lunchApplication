function addMarker(location) {
    if (marker == null) {
        marker = new google.maps.Marker({
            position: location,
            animation: google.maps.Animation.DROP,
            map: map
        });
    } else {
        marker.setPosition(location);
    }
}