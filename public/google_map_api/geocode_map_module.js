geocodeAddress = (geocoder, resultsMap) => {
    let address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, (results, status) => {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            let geoMarker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for following reason: ' + status);
        }
    });
};