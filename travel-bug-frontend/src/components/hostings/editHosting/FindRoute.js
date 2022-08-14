import React from "react";
import {
    bus_routes,
    locations,
    location_buses,
    location_from_id
} from "./data";

function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
}

const FindRoute = () => {
  //   useEffect(() => {
  //     console.log(locations);
  //     console.log(location_from_id);
  //     console.log(location_from_id[2]);
  //     console.log(location_buses);
  //     console.log(bus_routes);
  //   }, []);

  //   const current_bus_info = (
  //     location_id,
  //     bus_id,
  //     bus_name,
  //     bus_stoppage_no,
  //     parent_loc_id,
  //     is_start,
  //     distance,
  //     cost,
  //     cur_location_bus_no,
  //     par_location_bus_no
  //   ) => {
  //     return {
  //       location_id: location_id,
  //       bus_id: bus_id,
  //       bus_name: bus_name,
  //       bus_stoppage_no: bus_stoppage_no,
  //       parent_loc_id: parent_loc_id,
  //       is_start: is_start,
  //       distance: distance,
  //       cost: cost,
  //       cur_location_bus_no: cur_location_bus_no,
  //       par_location_bus_no: par_location_bus_no,
  //     };
  //   };

  //   var visited_locations = {};

  //   const update_visited_locations = (current_bus) => {

  //     if (!(current_bus.location_id in visited_locations)) {
  //       visited_locations[current_bus.location_id] = current_bus;
  //       visited_locations[current_bus.location_id] = [];
  //     }
  //     visited_locations[current_bus.location_id].push(current_bus);
  //     // var additional_distance = 0;
  //     // if (current_bus.parent_loc_id != -1) {
  //     //   additional_distance += distance(
  //     //     location_from_id[current_bus.location_id].lat,
  //     //     location_from_id[current_bus.location_id].lon,
  //     //     location_from_id[current_bus.parent_loc_id].lat,
  //     //     location_from_id[current_bus.parent_loc_id].lon,
  //     //     "K"
  //     //   );
  //     // }

  //     // if (current_bus.is_start) {
  //     //   const info = {
  //     //     is_start: current_bus.is_start,
  //     //     distance: current_bus.distance + additional_distance,
  //     //     cost: current_bus.cost,
  //     //     parent_loc_id: current_bus.parent_loc_id,

  //     //   };
  //     // }
  //   };

  //   const find_buses = (from, to, radius) => {
  //     var current_buses = []; /// {bus_id, stoppage_number}
  //     ///id: stoppage_info_no: [is_start,distance, cost, bus_id, {parent_loc_id, stoppage_info_no}]
  //     const total_distance = distance(from.lat, from.lon, to.lat, to.lon, "K");

  //     for (var i = 0; i < locations.length; i++) {
  //       if (
  //         distance(from.lat, from.lon, locations[i].lat, locations[i].lon, "K") <=
  //         radius
  //       ) {
  //         //current_buses.push(location_buses[locations[i].id]);

  //         if (locations[i].id in location_buses) {
  //             for (var j = 0; j < location_buses[locations[i].id].length; j++) {
  //                 current_buses.push(
  //                   current_bus_info(
  //                     locations[i].id,
  //                     location_buses[locations[i].id][j].bus_no,
  //                     location_buses[locations[i].id][j].name,
  //                     location_buses[locations[i].id][j].stoppage_number,
  //                     -1,
  //                     true,
  //                     0,
  //                     0,
  //                     j, //cur_loc_bus_No
  //                     -1, //par_locbus_no
  //                   )
  //                 );
  //                 update_visited_locations(
  //                   current_buses[current_buses.length - 1]
  //                 );
  //             }

  //         }

  //        // console.log(current_buses);
  //       }
  //     }

  //     while (current_buses.length != 0)
  //     {
  //         var current_bus = current_buses.pop();
  //         console.log(current_bus);

  //         if (current_bus.bus_stoppage_no < bus_routes[current_bus.bus_id].length - 1)
  //         {
  //             const next_location_id = bus_routes[current_bus.bus_id][current_bus.bus_stoppage_no + 1];
  //             if (next_location_id in visited_locations) continue;///for now, to avoid cycles
  //             else {

  //             }
  //         }
  //         else {
  //             continue;
  //         }

  //     }
  //   };

  //   const find_route = (from, to, radius) => {
  const find_buses = (from, to, radius) => {
    const total_distance = distance(from.lat, from.lon, to.lat, to.lon, "K");

    var priority_queue = [];
    var visited_locations = {};

    for (var i = 0; i < locations.length; i++) {
      if (
        distance(from.lat, from.lon, locations[i].lat, locations[i].lon, "K") <=
        radius
      ) {

    
        if (locations[i].id in location_buses) {
            for (var j = 0; j < location_buses[locations[i].id].length; j++) {
                priority_queue.push(
                    {
                        distance: distance(from.lat, from.lon, locations[i].lat, locations[i].lon, "K"),
                        location_id: locations[i].id,
                        bus_id: location_buses[locations[i].id][j].bus_no,
                        bus_name: location_buses[locations[i].id][j].name,
                        bus_stoppage_no: location_buses[locations[i].id][j].stoppage_number,
                        parent_loc_id: -1,
                        is_start: true,
                        //distance: 0,
                        cost: 0,
                    }
                )
            }
        }
      }
    }

    // for (var i = 0; i < priority_queue.length; i++) {
    //     console.log(priority_queue[i]);
    // }
    var destination_location_id = -1;

    while (priority_queue.length != 0) {
        var min_distance = 1000000000;
        const inf = 1000000000;
        var min_index = -1;
        for (var i = 0; i < priority_queue.length; i++) {
            if (priority_queue[i].distance < min_distance) {
                min_distance = priority_queue[i].distance;
                min_index = i;
            }
        }
        var current_bus = priority_queue.splice(min_index, 1)[0];
        console.log(current_bus);

        if (distance(to.lat, to.lon, location_from_id[current_bus.location_id].lat, location_from_id[current_bus.location_id].lon, "K") 
        <= radius) {
            destination_location_id = current_bus.location_id;
            var ans  = [];
            var temp_loc_id = current_bus.location_id;
            while (temp_loc_id != -1) {
                ans.push(visited_locations(temp_loc_id));
                temp_loc_id = visited_locations[temp_loc_id].parent_loc_id;
            }

            break;
        }

        if (!(current_bus.location_id in visited_locations))
        {
            visited_locations[current_bus.location_id] = {distance: inf};
        }

        if (Math.round(current_bus.distance * 1000000) == Math.round(visited_locations[current_bus.location_id].distance * 1000000)){
            if (current_bus.bus_stoppage_no < bus_routes[current_bus.bus_id].length - 1)
            {
                const next_location_id = bus_routes[current_bus.bus_id][current_bus.bus_stoppage_no + 1].stoppage_loc_id;
                if (!(next_location_id in visited_locations)) visited_locations[next_location_id] = {distance: inf};

                var additional_distance = distance(location_from_id[current_bus.location_id].lat, location_from_id[current_bus.location_id].lon, location_from_id[next_location_id].lat, location_from_id[next_location_id].lon, "K");
                var additional_cost = bus_routes[current_bus.bus_id][current_bus.bus_stoppage_no + 1].cost - bus_routes[current_bus.bus_id][current_bus.bus_stoppage_no].cost;
                
                if (additional_distance + current_bus.distance < visited_locations[next_location_id].distance) {
                    visited_locations[next_location_id].distance = additional_distance + current_bus.distance;
                    visited_locations[next_location_id].parent_loc_id = current_bus.location_id;
                    visited_locations[next_location_id].bus_id = current_bus.bus_id;
                    visited_locations[next_location_id].bus_name = current_bus.bus_name;;
                    visited_locations[next_location_id].bus_stoppage_no = current_bus.bus_stoppage_no + 1;
                    visited_locations[next_location_id].is_start = false;
                    visited_locations[next_location_id].cost = current_bus.cost + additional_cost;
                    priority_queue.push(
                    {
                        distance: visited_locations[next_location_id].distance,
                        location_id: next_location_id,
                        bus_id: current_bus.bus_id,
                        bus_name: current_bus.bus_name,
                        bus_stoppage_no: current_bus.bus_stoppage_no + 1,
                        parent_loc_id: current_bus.location_id,
                        is_start: false,
                        //distance: 0,
                        cost: current_bus.cost + additional_cost,
                    }
                )
                }
            }
        }
    }

    console.log(destination_location_id);

  }

  return (
    <div>
      FindRoute
      {find_buses(
        { lat: 23.727054, lon: 90.389678 },
        { lat: 23.793408, lon: 90.402774 },
        3
      )}
    </div>
  );
};

export default FindRoute;
