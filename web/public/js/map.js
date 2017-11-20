function initMap(){
    let setStart = {
        lat: 40.701529,
        lng: -73.986783
    };

    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: setStart
    });

    let marker = new google.map.Marker({
        position: setStart,
        map: map
    });
}

