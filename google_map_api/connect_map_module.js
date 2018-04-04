let map;
let marker;
initMap = () => {
    let latitudeLongitude = { lat: 42.87909718755642, lng: 74.5953816175461 };
    map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 16,
        center: latitudeLongitude
    });

    let geocoder = new google.maps.Geocoder();
    let infoWindow = new google.maps.InfoWindow;

    map.addListener('click', (event) => {
        let lat = event.latLng.lat();
        let lng = event.latLng.lng();
        addMarker(event.latLng);
        //let resultAddress = geocodeLatLng();
        document.getElementById('coordinates').value = lat + ', ' + lng;
        //document.getElementById('result').value = resultAddress;
        geocodeLatLng(geocoder, map, infoWindow);
    });

    document.getElementById('submit').addEventListener('click', () => {
        geocodeAddress(geocoder, map);
    });

    autoCompliteSearch();
    addMarker(map);
    findGeolocation();
    geocodeAddress();
    geocodeLatLng();
};