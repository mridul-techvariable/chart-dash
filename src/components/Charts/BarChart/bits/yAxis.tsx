import * as d3 from "d3";

type props = {
  margin: any;
  yAxisOptions: any;
  y0: any;
};

/**
 * @method getYAxis
 * @description Function to generate Y Axis plot points for BarChart
 * @param margin
 * @param yAxisOptions
 * @param y0
 * @returns a function
 */
export const getYAxis =
  ({ margin, yAxisOptions, y0 }: props) =>
  (g: any) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y0).ticks(null, "s"))
      .call((g: any) =>
        g.select(".domain").style("color", yAxisOptions.domain.color)
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
