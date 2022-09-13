import * as d3 from "d3";

export const TvTooltip = (svg: any) => {
  // return svg.attr("fill",(d: any,i: any)=>{console.log({he:d}) || d})
  return svg.attr("fill", (d: any, i: any) => d);
};
