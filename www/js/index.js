var map;
var service;
var marker;
var pos;
var infowindow;

function initialize() 
{

    var mapOptions = {
     zoom: 14,
     mapTypeId: google.maps.MapTypeId.ROADMAP,
     scrollwheel: false,
     panControl: false,
     streetViewControl: false,
     mapTypeControl: false,
     };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    //HTML5 geolocation
    if (navigator.geolocation) 
    {
       navigator.geolocation.getCurrentPosition(function(position) 
       {
            pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

            infowindow = new google.maps.InfoWindow({map: map,position: pos,content: 'Olet tässä.'});

            var request = {location:pos,radius:500,keyword: ['cafe']};

            map.setCenter(pos);

            infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request,callback);

        }, 

        function() 
        { 
        handleNoGeolocation(true);
        });
    } 
    else 
    {
    handleNoGeolocation(false);
    }

    function callback(results, status) 
    {
      if (status == google.maps.places.PlacesServiceStatus.OK) 
      {
        for (var i = 0; i < results.length; i++) 
        {
          createMarker(results[i]);
        }
      }
    }

    function createMarker(place) 
    {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

    google.maps.event.addListener(marker, 'click', function() 
    {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
    });

    }
}
google.maps.event.addDomListener(window, 'load', initialize);