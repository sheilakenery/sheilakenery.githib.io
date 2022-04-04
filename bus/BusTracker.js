// This array contains the coordinates for all bus stops between MIT and Harvard

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lzZWxnb21lejIwMjIiLCJhIjoiY2wwdW1ob3NvMG1sOTNwb2FxeDYwanUyZCJ9.f3H697pO6VcSj6gOr_gDOA';
	//Check browser compatibility
	  if (!mapboxgl.supported()) {
        alert('Your browser does not support Mapbox GL');
    } else {
			// Create a map with initial location
			var map = new mapboxgl.Map({
			    container: 'map',
			    style: 'mapbox://styles/mapbox/streets-v11',
			    center: [-78.7412335769, 35.76177846545053],
			    zoom: 12,
			});
    }



    let busStops = [];


		// main function that calls getStops, then adds the coordinates for each stop to the busStops array
	  async function run() {
	   let location = await getBusLocations();
	   		location.forEach(element => {
	     	busStops.push([element.location.lng,element.location.lat]);
	   });
	   move();
	 }



    // Request bus data from https://rapidapi.com/ Thanks to Aimee!
    async function getBusLocations(){
		const url = 'https://transloc-api-1-2.p.rapidapi.com/stops.json?agencies=12%2C16&geo_area=35.80176%2C-78.64347%7C35.78061%2C-78.68218&callback=cal';
    const response = await fetch(url, {
      "method": "GET",
      "headers": {
				"x-rapidapi-host": "transloc-api-1-2.p.rapidapi.com",
				"x-rapidapi-key": "1b18aa9679mshe90c9463e64bc0bp1f24b9jsn86bccb57881a"
      }
    });
    const json  = await response.json();
    return json.data;
    }


// Add a marker to the map
let marker = new mapboxgl.Marker().setLngLat([-78.7412335769, 35.76177846545053]).addTo(map);
//let marker = new mapboxgl.Marker().setLngLat([-78.7412335769, 35.76177846545053]).addTo(map);

// counter here represents the index of the current bus stop
let counter = 0;
function move() {
  // TODO: move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
  // Use counter to access bus stops in the array busStops
  	setTimeout(() => {
    if (counter >= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    counter++;
    move();
  }, 1000);
}

run();

// Do not edit code past this point
if (typeof module !== 'undefined') {
  module.exports = { move, counter, marker, busStops };
}
