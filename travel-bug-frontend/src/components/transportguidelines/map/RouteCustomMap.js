import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents
} from "react-leaflet";

import "leaflet-geosearch/dist/geosearch.css";
import "./CustomMap.css";

const center = {
  lat: 23.8103,
  lng: 90.4125,
};

const SearchField = (props) => {
  const provider = new OpenStreetMapProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: "bar",
    showMarker: false, // optional: true|false  - default true
    // showPopup: true, // optional: true|false  - default false
    // marker: {
    //   // optional: L.Marker    - default L.Icon.Default
    //   icon: new L.Icon.Default(),
    //   draggable: true,
    // },
    // popupFormat: ({ query, result }) => result.label, // optional: function    - default returns result label,
    // resultFormat: ({ result }) => result.label, // optional: function    - default returns result label
    //maxMarkers: 6, // optional: number      - default 1
    // retainZoomLevel: false, // optional: true|false  - default false
    // animateZoom: true, // optional: true|false  - default true
    // autoClose: true, // optional: true|false  - default false
    // searchLabel: 'Enter address', // optional: string      - default 'Enter address'
    // keepResult: true, // optional: true|false  - default false
    // updateMap: true, // optional: true|false  - default true
    notFoundMessage: "Sorry, that address could not be found.",
  });

  const map = useMap();

  map.on("geosearch/showlocation", (e) => {
    console.log("ee", e.location);
    props.setLatLong(e.location);
    const loc = e.location;
    console.log(loc);
    //props.setPositions((positions) => [...positions, [e.location.y, e.location.x]]);
    //console.log(e.location);
    // props.setPositions((positions) => [...positions, [loc.y, loc.x]]);
    props.setPositions((positions) => {
      var newPositions = [...props.positions(), [loc.y, loc.x]];

      return newPositions;
    });
    console.log(props.positions());
  });
  map.on("geosearch/marker/dragend", (e) => {
    props.setLatLong(e.location);
    const loc = e.location;
    console.log(loc);
    const { lat, lng } = loc;
    console.log("lattt lng,", lat, lng);
    //props.setPositions((positions) => [...positions, [e.location.y, e.location.x]]);
    //console.log(e.location);
    //props.setPositions((positions) => [...positions, [lat, lng]]);
    console.log(props.positions());
  });

  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

const Markers = (props) => {
  const [selectedPosition, setSelectedPosition] = useState(null);

//   const map = useMapEvents({
//     click(e) {
//       setSelectedPosition([e.latlng.lat, e.latlng.lng]);
//     },
//   });

  useEffect(() => {
    props.setPositions(selectedPosition);
  }, [selectedPosition]);

  return null;
  // return selectedPosition ? (
  //   <Marker
  //     key={selectedPosition[0]}
  //     position={selectedPosition}
  //     interactive={false}
  //   />
  // ) : null;
};

function CustomMap(props) {
  const markerRef = useRef(null);

  const [positions, setPositions] = useState([]);
  const [search, setSearch] = useState(true);

  const setpositions = (position) => {
    setPositions((positions) => [...positions, position]);
  };
//maisha need to filter null positions
//remove null positions from positions

  useEffect(() => {
    let temp = [];
    const { stopages } = props;
    for(let i = 0; i < stopages.length; i++){
        if(stopages[i] !== null){
            temp.push([stopages[i].lat,stopages[i].long]);
            setpositions([stopages[i].long,stopages[i].lat]);
        }
    }
    }, [props.stopages]);

    useEffect(() => {
        console.log("postion changing", positions);
    }, [positions]);
  
  useEffect(() => {const filteredPositions = positions.filter((position) => position !== null);props.setPositions(filteredPositions); console.log(positions);}, [positions]);

  const removeMarker = (index) => {
    setPositions(() => {
      var newPositions = [...positions];
      newPositions.splice(index, 1);
      return newPositions;
    });
  };

  const removeAllMarkers = () => {
    setPositions(() => {
      return [];
    });
  };

  return (
    <>
      <MapContainer center={center} zoom={13}>
        <SearchField
          positions={() => positions}
          setPositions={(position) => setPositions(position)}
          setLatLong={(val) => props.setLatLong(val)}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {positions.map((position, index) => {
          console.log("position", position, index);
          console.log(positions);
          if (position == null) return <></>;
          if (
            typeof position[0] === "undefined" ||
            typeof position[1] === "undefined"
          ) {
            return <></>;
          }
          return (
            <Marker
              position={position}
              draggable={true} //ekhane change lagbe
              ref={markerRef}
              eventHandlers={{
                dragend() {
                  const marker = markerRef.current;
                  if (marker != null) {
                    setPositions((positions, indexhere) => {
                      const temp = positions[index];
                      const newPositions = [...positions];
                      const { lat, lng } = marker.getLatLng();
                      //newPositions[index] = [lat, lng];
                      newPositions[index] = [lat, lng];

                      return newPositions;
                    });
                    //setPositions((positions) => [...positions, [marker.getLatLng()]]);
                  }
                },
              }}
            >
              <Popup closeButton={false}>
                <button onClick={() => removeMarker(index)}>remove me</button>
              </Popup>
            </Marker>
          );
        })}
        {/* <Marker position={[23.8103, 90.4125]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        <Markers setPositions={(position) => setpositions(position)} />
      </MapContainer>
    </>
  );
}

export default CustomMap;
