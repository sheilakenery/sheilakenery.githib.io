mapboxgl.accessToken = 'pk.eyJ1IjoiY29kaW5na3Jpc3RpIiwiYSI6ImNsMGxpdjg2djBsYWYzY28zbTBlYjhhODcifQ.HKSiHDg3I-J2HuhECuy95w';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 12
});

const busMarkers = {};

async function run(){
  // get bus data 
  const locations = await getBusLocations();
  console.log(new Date());
  console.log(locations);

locations.forEach((bus) => {
  if(busMarkers[bus.id]) {
    busMarkers[bus.id].setLngLat([bus.attributes.longitude, bus.attributes.latitude]);
  } else {
    busMarkers[bus.id] = new mapboxgl.Marker()
    .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
    .addTo(map);
  }
})
// timer
setTimeout(run, 15000);

}



// Request bus data from MBTA
async function getBusLocations(){
const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
const response = await fetch(url);
const json     = await response.json();
return json.data;
}

run();
