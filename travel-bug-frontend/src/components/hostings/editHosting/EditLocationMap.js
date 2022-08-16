import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import "leaflet-geosearch/dist/geosearch.css";
import "../../../App.css";

const center = {
  lat: 23.8103,
  lng: 90.4125,
};

function DraggableMarker() {
  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          console.log(position);
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

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
  const yourEventHandler = ({ result }) => {
    console.log(result.x, result.y);
  };

  const provider = new OpenStreetMapProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: "bar",
    showMarker: true, // optional: true|false  - default true
    // showPopup: false, // optional: true|false  - default false
    marker: {
      // optional: L.Marker    - default L.Icon.Default
      icon: new L.Icon.Default(),
      draggable: true,
    },
    // popupFormat: ({ query, result }) => result.label, // optional: function    - default returns result label,
    // resultFormat: ({ result }) => result.label, // optional: function    - default returns result label
    maxMarkers: 1, // optional: number      - default 1
    // retainZoomLevel: false, // optional: true|false  - default false
    // animateZoom: true, // optional: true|false  - default true
    // autoClose: true, // optional: true|false  - default false
    // searchLabel: 'Enter address', // optional: string      - default 'Enter address'
    keepResult: true, // optional: true|false  - default false
    // updateMap: true, // optional: true|false  - default true
  });

  const map = useMap();

  map.on("geosearch/showlocation", (e) => {
    props.setLatLong(e.location);
    console.log(e);
  });
  map.on("geosearch/marker/dragend", (e) => {
    props.setLatLong(e.location);
    console.log(e);
  });

  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

function EditLocationMap(props) {
  const [search, setSearch] = useState(true);
  return (
    <MapContainer center={center} zoom={13}>
      {search && <SearchField setLatLong={(val) => props.setLatLong(val)} />}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <DraggableMarker /> */}
    </MapContainer>
  );
}

export default EditLocationMap;
