// Variables
var map;
var service;
var marker;
var pos;
var infowindow;

// Main function that draws the map and other stuff.
function initialize() 
{
    
    // Setting up map options.
    var mapOptions = {
     zoom: 14,
     mapTypeId: google.maps.MapTypeId.ROADMAP,
     scrollwheel: false,
     panControl: false,
     streetViewControl: false,
     mapTypeControl: false,
     };

    // Assign where the map is drawn.
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    //Try HTML5 geolocation
    if (navigator.geolocation) 
    {
       // Get current position.
       navigator.geolocation.getCurrentPosition(function(position) 
       {
            
            pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

            infowindow = new google.maps.InfoWindow({map: map,position: pos,content: 'Olet tässä.'});
           
            // Radius is 1km for now.
            var request = {location:pos,radius:1000,keyword: ['cafe']};

            // Center the map to where the user is.
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

    // Set markers.
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

    // Creates markers.
    function createMarker(place) 
    {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

    // Displays info when marker is clicked.
    google.maps.event.addListener(marker, 'click', function() 
    {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
    });

    }
}