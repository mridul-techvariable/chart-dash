import * as d3 from "d3";
import { chartDefaults } from "../Utilities/defaults";

export const tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "d3-tooltip")
  .style("position", "absolute")
  .style("top", 0)
  .style("z-index", "10")
  .style("visibility", "hidden")
  .style("padding", "10px")
  .style("background", "rgba(0,0,0,0.6)")
  .style("border-radius", "4px")
  .style("color", "#fff")
  .text("a simple tooltip");

export const createTooltip = function (
  e: any,
  d: any,
  svg: any,
  current: any,
  options: any
) {
  if (!getTooltipEnabled(options)) return;

  tooltip
    .html(
      `<div>${d.category === undefined ? "" : d.category} (${
        d.name || d.data?.name
      })</div><div>Value: ${d.value ? d.value : `${d.x}, ${d.y}`}</div>`
    )
    .style("visibility", "visible");
  svg.selectAll("rect").transition().style("opacity", 0.1);
  // svg.selectAll("path").transition().style("opacity", 0.1);
  // svg.selectAll("circle").transition().style("opacity", 0.1).attr("r", 2);

  d3.select(current)
    .transition()
    .style("opacity", 0.9)
    .style("cursor", "pointer");
  // .attr("r", 5);
};

export const moveTooltip = function (event: any, options: any) {
  if (!getTooltipEnabled(options)) return;

  tooltip
    .style("top", event.pageY - 10 + "px")
    .style("left", event.pageX + 10 + "px");
};

export const resetTooltip = function (svg: any, options: any) {
  if (!getTooltipEnabled(options)) return;

  tooltip.html(``).style("visibility", "hidden");
  svg.selectAll("rect").transition().style("opacity", 1);
  svg.selectAll("path").transition().style("opacity", 1);
  svg.selectAll("circle").transition().style("opacity", 0.9);
};

function getTooltipEnabled(options: any) {
  let isEnabled = options?.tooltip?.enabled;
  if (typeof isEnabled === "undefined") {
    isEnabled = chartDefaults.tooltip.enabled;
  }
  return isEnabled;
}
