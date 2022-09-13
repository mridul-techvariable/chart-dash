import * as d3 from "d3";

type props = {
  margin: any;
  yAxisOptions: any;
  y: any;
  height: any;
  chartData: any;
};

/**
 * @method getYAxis
 * @description Function to generate a set of points which will be plotted on the y Axis for a mixed chart
 * @param margin
 * @param yAxisOptions
 * @param y
 * @param height
 * @param chartData
 * @returns a set of points
 */
export const getYAxis =
  ({ margin, yAxisOptions, y, height, chartData }: props) =>
  (g: any) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, "s"))
      .call((g: any) =>
        g.select(".domain").style("color", yAxisOptions.domain.color)
      )
      .call((g: any) =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text(chartData.y)
      )
      .call((g: any) =>
        g.selectAll(".tick line").attr("stroke", yAxisOptions.ticks.tickColor)
      )
      .call((g: any) =>
        g
          .selectAll(".tick text")
          .attr("transform", `rotate(${yAxisOptions.ticks.rotation})`)
          .style("color", yAxisOptions.ticks.color)
      );
