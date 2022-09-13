type props = {
  svg: any;
  width: any;
  height: any;
  margin: any;
};

/**x-axis label */
/**
 *
 * @param {*} svg - The svg element
 * @param {*} height - the height of the chart
 * @param {*} margin - the margin object
 *
 */
export const xAxisLabel = (
  svg: any,
  width: any,
  height: any,
  margin: any,
  {
    label: { enabled = false, text = "", color = "#666666", fontSize = "16px" },
  } = {
    label: {},
  }
) =>
  enabled &&
  svg
    .append("text")
    .attr("x", width / 2 + margin.left)
    .attr("y", height - 10)
    .attr("text-anchor", "end")
    .attr("transform", `rotate(0)`)
    .style("color", color)
    .attr("fill", color)
    .attr("font-size", fontSize)
    // .style("font-weight", "bold")
    .text(text);
