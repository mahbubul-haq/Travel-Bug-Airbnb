import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet-geosearch/dist/geosearch.css";
import "./MapStyle.css";

var center = {
  lat: 23.8103,
  lng: 90.4125,
};

const GEOCODE_URL =
  "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";

const SearchField = (props) => {
  // const [position, setPosition] = useState(center)
  // const markerRef = useRef(null)
  // const yourEventHandler = useMemo(
  //     () => ({
  //       dragend() {
  //         const marker = markerRef.current
  //         if (marker != null) {
  //           setPosition(marker.getLatLng());
  //           console.log(position);
  //         }
  //       },
  //     }),
  //     [],
  //   )
  // const yourEventHandler = useMemo(() =>( {console.log("hello")}), [], );

  const provider = new OpenStreetMapProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: "bar",
    showMarker: false, // optional: true|false  - default true
    // showPopup: false, // optional: true|false  - default false
    // marker: {
    //   // optional: L.Marker    - default L.Icon.Default
    //   icon: new L.Icon.Default(),
    //   draggable: true,
    // },
    // popupFormat: ({ query, result }) => result.label, // optional: function    - default returns result label,
    // resultFormat: ({ result }) => result.label, // optional: function    - default returns result label
    // maxMarkers: 1, // optional: number      - default 1
    // retainZoomLevel: false, // optional: true|false  - default false
    // animateZoom: true, // optional: true|false  - default true
    // autoClose: true, // optional: true|false  - default false
    // searchLabel: 'Enter address', // optional: string      - default 'Enter address'
    keepResult: false, // optional: true|false  - default false
    // updateMap: true, // optional: true|false  - default true
  });

  const map = useMap();

  map.on("geosearch/showlocation", (e) => {
    props.setLatLong(e.location);
    console.log(e);

    console.log("ee", e.location);
    props.setLatLong(e.location);
    const loc = e.location;
    console.log(loc);
    props.setLatLong({ x: loc.x, y: loc.y });
    props.setPosition([loc.y, loc.x]);
    props.reverseGeoCoding([loc.y, loc.x]);
  });
  map.on("geosearch/marker/dragend", (e) => {
    
     const loc = e.location;
     console.log(loc);
     props.setLatLong({ x: loc.x, y: loc.y });
     props.setPosition([loc.y, loc.x]);
     props.reverseGeoCoding([loc.y, loc.x]);
  });

  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

function MyMap(props) {
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const [search, setSearch] = useState(true);

  const reverseGeoCoding = async (coordinates) => {
    console.log("coordinates", coordinates);
    // Here the coordinates are in LatLng Format
    // if you wish to use other formats you will have to change the lat and lng in the fetch URL
    const data = await (
      await fetch(GEOCODE_URL + `${coordinates[1]},${coordinates[0]}`)
    ).json();
    console.log("did we get it?", data.address);

    const addressLabel =
      typeof data.address !== "undefined"
        ? data.address.LongLabel
        : "Location name not found";
    console.log(addressLabel);
    props.setLatLong({
      x: coordinates[0],
      y: coordinates[1],
      label: addressLabel,
    });
  };

  useEffect(() => {
    console.log("hi hi", props.latLong);
    if (props.latLong !== null) {
      center = {
        lat: props.latLong.y,
        lng: props.latLong.x,
      };
      setPosition([props.latLong.y, props.latLong.x]);
    }

    
  }, []);

  const getPopUp = () => {

    const marker = markerRef.current;
    console.log("marker", marker, props.latLong);
    if (marker !== null) {
      marker.openPopup();
    }
     
    if (props.latLong !== null && props.latLong.label) {
      return <div>{props.latLong.label}</div>;
    }
   
  };

  return (
    <MapContainer
      center={
  
        props.latLong !== null
          ? { lat: props.latLong.y, lng: props.latLong.x }
          : center
      }
      zoom={13}
    >
      {search && (
        <SearchField
          setPosition={(val) => setPosition(val)}
          setLatLong={(val) => props.setLatLong(val)}
          reverseGeoCoding={(val) => reverseGeoCoding(val)}
        />
      )}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        draggable={true}
        position={position}
        ref={markerRef}
        eventHandlers={{
          dragend() {
            const marker = markerRef.current;
            if (marker != null) {
              setPosition(() => {
                const { lat, lng } = marker.getLatLng();
                //newPositions[index] = [lat, lng];
                props.setLatLong({ x: lng, y: lat });
                reverseGeoCoding([lat, lng]);
                return [lat, lng];
              });
              //setPositions((positions) => [...positions, [marker.getLatLng()]]);
            }
          },
        }}
      >
        <Popup closeButton={false}>
          <span>{getPopUp()}</span>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MyMap;
