import * as d3 from "d3";

export const getColorScale = (keys) =>
  d3
    .scaleOrdinal()
    .domain(keys)
    .range(["#98abc5", "#6b486b", "#a05d56", "#ff8c00"]);
