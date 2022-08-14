
///locations = {lat, lon, id}
export const locations = [
  {
    lat: 23.745702,
    lon: 90.37631,

    id: 1, //for now
  },
  {
    lat: 37.773972,
    lon: 2,
    id: 2, //for now
  },
  {
    lat: 37.773972,
    lon: 2,
    id: 3, //for now
  },
  {
    lat: 37.773972,
    lon: 2,
    id: 4, //for now
  },
  {
    lat: 37.773972,
    lon: 2,
    id: 5, //for now
  },
  {
    lat: 37.773972,
    lon: 2,
    id: 6, //for now
  },
  {
    lat: 37.773972,
    lon: 2,
    id: 7, //for now
  },
  {
    lat: 37.773972,
    lon: 2,
    id: 8, //for now
  },
  {
    lat: 37.773972,
    lon: 2,
    id: 9, //for now
  },
  {
    lat: 37.773972,
    lon: 2,
    id: 10, //for now
  },
];
    // location_id: {lat, lon}
    export const location_from_id = {
      1: { lat: 23.745702, lon: 90.37631 },
    };

    // location_id: {bus_name, bus_no, stoppage_number(first/second/third etc)}
    export const location_buses = {
      1: [
        { name: "A", bus_no: 1, stoppage_number: 0 },
        { name: "B", bus_no: 2, stoppage_number: 0 },
        { name: "c", bus_no: 3, stoppage_number: 0 },
      ],
      2: [
        { name: "A", bus_no: 1, stoppage_number: 1 },
        { name: "D", bus_no: 4, stoppage_number: 0 },
        { name: "B", bus_no: 2, stoppage_number: 1 },
      ],
    };
    
    ///bus_no: [locations ids]
    //or bus_no: [{location_id, cost}]
    export const bus_routes = {
        1: [{stoppage_loc_id: 10, cost: 10}, {stoppage_loc_id: 8, cost: 20}, {stoppage_loc_id: 6, cost: 30}],
        2: [{stoppage_loc_id: 5, cost: 10}, {stoppage_loc_id: 2, cost: 20}, {stoppage_loc_id: 1, cost: 30}],
        3: [{stoppage_loc_id: 4, cost: 10}, {stoppage_loc_id: 3, cost: 20}, {stoppage_loc_id: 2, cost: 30}],
    }

