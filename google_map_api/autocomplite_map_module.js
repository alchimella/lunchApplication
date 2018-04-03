function acSearch() {
    let input = /** @type {!HTMLInputElement} */(
        document.getElementById('address'));

    let autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
}