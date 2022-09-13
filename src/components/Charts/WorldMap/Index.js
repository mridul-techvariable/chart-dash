import React , {useState , useEffect} from "react";
import WorldMap from "./worldmap";

const Worldmap = ({
    data,
    categories,
    options
  }) => {
    console.log('cat',categories,options)
    return (

            <WorldMap
             data={data[0]}
              categories={categories}
               options={options}
               />
            
    )
}
export default Worldmap ;