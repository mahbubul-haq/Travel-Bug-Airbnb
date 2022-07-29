import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '600px'
};

const center = {
  lat: 23.684994,
  lng: 90.356331
};

const Maps = ()=> {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);


  const handleMapClick = (event) => {
    setMarkers(current => [...current, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date().toISOString()
    }]);
    console.log(markers);
  }

  const mapRef = React.useRef(null);
  const onMapLoad = ((map) => {
    mapRef.current = map;
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {markers.map((marker) => (
          <Marker
            key={marker.time}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => setSelected(marker)} />
        ))}
        <></>
        {selected ?
          (<InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>Travel Bug Spotted!</h2>
              <p>Latitude: {selected.lat}</p>
              <p>Longitude: {selected.lng}</p>
              <p>Time: {selected.time}</p>
            </div>
          </InfoWindow>)
          :
          null}
      </GoogleMap>
    </>
  ) : <></>
}


export default React.memo(Maps)