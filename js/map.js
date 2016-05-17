var map;
var zoom = 10;
var center;
var mapTypeId;
var rendererOptions = {
    draggable: true,
    preserveViewpint: false
}
var directionsDisplay;
var directionsService;
var map;
//var tokyo = new google.maps.LatLng(35.68407, 139.63623);

function initMap() {
    center = new google.maps.LatLng(35.67849, 139.3917);
    mapTypeId = google.maps.MapTypeId.ROADMAP;

    // mapをdirectionsDisplayにセット
    var myOptions = {
        center: center,
        zoom:   zoom,
        mapTypeId: mapTypeId
    };
    directionsDisplay = new google.maps.DirectionsRenderer({
        draggable:          true,
        preserveViewpoint:  false
    });
    directionsDisplay.setMap(
        new google.maps.Map(
            document.getElementById('map'),
            myOptions
    ));

    // リスナ登録
    google.maps.event.addListener(
        directionsDisplay,
        'directions_changed',
        function(){}
    );

    // DirectionsService初期化
    directionsService = new google.maps.DirectionsService();

    // DirectionSerciceでルート計算し、描画
    calcRoute();
}

function calcRoute() {
    var request = {
        origin: '35.7259,139.718824',
        destination: '35.7259,139.718824',
        waypoints:[
            {location: "36.7764674,139.4411535"},
            {location: "36.7571715,139.599984"},
        ],
        travelMode: google.maps.DirectionsTravelMode.DRIVING, // ドライビングモード
        unitSystem: google.maps.DirectionsUnitSystem.METRIC, // 単位km表示
        optimizeWaypoints: true, // 最適化された最短距離にする
        avoidHighways: false,    // 高速道路を使う
        avoidTolls: false        // 有料道路を使う
    };
    directionsService.route(request, function(response, status){
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

