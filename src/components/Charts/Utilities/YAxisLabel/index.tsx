/**x-axis label */
/**
 *
 * @param {*} svg - The svg element
 * @param {*} height - the height of the chart
 * @param {*} margin - the margin object
 *
 */
export const yAxisLabel = (
  svg: any,
  height: any,
  margin: any,
  {
    label: { enabled = false, text = "", color = "#666666", fontSize = "12px" },
  } = {
    label: {},
  }
) =>
  enabled &&
  svg
    .append("text")
    .attr("x", -height / 2 + margin.bottom - margin.top / 2)
    .attr("y", margin.right / 2)
    .attr("text-anchor", "end")
    .attr("transform", `rotate(-90)`)
    .style("color", color)
    .attr("fill", color)
    .attr("font-size", fontSize)
    // .style("font-weight", "bold")
    .text(text);
