/**x-axis label */

import { chartDefaults } from "../defaults";

/**
 *
 * @param {*} svg - The svg element
 * @param {*} height - the height of the chart
 * @param {*} margin - the margin object
 *
 */
export const getChartTitle = (
  svg: any,
  width: any,
  height: any,
  margin: any,
  chartOptions: any
) => {
  chartOptions = { ...chartDefaults.chart.title, ...chartOptions?.title };
  if (chartOptions.enabled)
    svg
      .append("text")
      .attr("x", width / 2 + margin.left - margin.right)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(0)`)
      .style("color", chartOptions.color)
      .attr("fill", chartOptions.color)
      .attr("font-size", chartOptions.fontSize)
      .text(chartOptions.text);
};
