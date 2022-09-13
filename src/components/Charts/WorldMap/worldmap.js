import React, { useState, useEffect,  useRef } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldData from "./world-110m.json";
import Tooltip from "@material-ui/core/Tooltip";

const projection = geoEqualEarth()
  .scale(160)
  .translate([800 / 2, 450 / 2]);

/**
 * DEMO WorldMap : Component for showing details of the states/locations in world map.
 *
 * @component
 * @example
 * return (
 *   <WorldMap />
 * )
 */

const WorldMap = ({data}) => {
  let radius 
  const [geographies, setGeographies] = useState([]);
  const [open, setOpen] = useState([]);
  const [location , setLocation] = useState([])
console.log({data})

  useEffect(() => {
    setGeographies(feature(worldData, worldData.objects.countries).features);
    setOpen(data?.data)
    setLocation(data?.data)

    radius = data?.data.sort(function (a, b) {
      return a.population - b.population
  })

  }, [data]);

  /**
   * @method handleCountryClick
   * @description click event to get the details of the particular country
   * @param {object} i - i is passed with that particular country details
   */

  const handleCountryClick = (countryIndex) => {
    console.log("Clicked on country: ", geographies[countryIndex]);
  };

  /**
   * @method handleMarkerClick
   * @description click event to get the details of the particular city
   * @param {object} i - i is passed with that particular city details
   */

  const handleMarkerClick = (i) => {
   // console.log("Marker: ", cities[i]);
    // setOpen(prev=>{
    //     let copy = prev.slice()
    //     copy[i].open = true
    //     return copy
    // });
    setOpen((location[i].open = true));
  };


  /**
   * @method handleClose
   * @description removes the tooltip on mouseleave event
   * @param {object} i - i is passed with that particular city details
   */
  const handleClose = (i) => {
    //  setOpen(prev=>{
    //      let copy = prev.slice()
    //      copy[i].open = false
    //      return copy
    //  });
    setOpen((location[i].open = false));
  };

  /**
   * @method designTool
   * @description design the tooltip content in a proper manner
   * @param {object} city - city is passed with that particular location details
   */

  const designTool = (city) => {
    return (
      <div>
        <h2>Location : {city.name}</h2>
        <h2>Population : {city.population}</h2>
      </div>
    );
  };

  return (
    <svg width={800} height={270} viewBox="0 0 900 350" xmlns="http://www.w3.org/2000/svg">
      <g className="countries">
        {geographies.map((d, i) => (
          <path
            key={`path-${i}`}
            d={geoPath().projection(projection)(d)}
            className="country"
            //fill={`rgba(25,25,112,${(1 / geographies.length) * i})`}
            fill="none"
            stroke="black"
            strokeWidth={0.5}
            onClick={() => handleCountryClick(i)}
          />
        ))}
      </g>
      <g className="markers">
        {location.map((city, i) => (
          <Tooltip
            open={location[i].open}
            onClose={() => handleClose(i)}
            // title={`${city.name} is a nice city`}
            title={designTool(city)}
          >
            <circle
              key={`marker-${i}`}
              cx={projection(city.coordinates)[0]}
              cy={projection(city.coordinates)[1]}
               //r={city.population / 3000000}
              r={Math.atan(city.value / 1000)*5}
              //fill="#E91E63"
              fill={`${city?.color}`}
              stroke="#FFFFFF"
              className="marker"
              onMouseOver={() => handleMarkerClick(i)}
            />
          </Tooltip>
        ))}
      </g>
    </svg>
  );
};

export default WorldMap;
