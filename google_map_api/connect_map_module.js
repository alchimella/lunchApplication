let map;
let marker;
function initMap () {
    let latitudeLongitude = { lat: 42.87909718755642, lng: 74.5953816175461 };
    map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 16,
        center: latitudeLongitude
    });

    map.addListener('click', function (event) {
       addMarker(event.latLng);
       //document.getElementById('address').value = event.latLng;
    });

    let geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function () {
        geocodeAddress(geocoder, map);
    });
    autoCompliteSearch();
    addMarker(map);
    findGeolocation();
    geocodeAddress();

}