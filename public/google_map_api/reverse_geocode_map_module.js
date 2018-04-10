geocodeLatLng = (geocoder, map, infoWindow) => {
    let input = document.getElementById('coordinates').value;
    let latlngStr = input.split(',', 2);
    let latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    geocoder.geocode({'location': latlng}, (results, status) => {
        if (status === 'OK') {
            if (results[1]) {
                map.setZoom(18);
                infoWindow.setContent(results[1].formatted_address);
                infoWindow.open(map, marker);
            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
};