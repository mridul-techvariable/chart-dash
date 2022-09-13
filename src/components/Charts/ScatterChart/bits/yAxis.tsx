import * as d3 from "d3";

type props = {
  margin: any;
  yAxisOptions: any;
  y: any;
};

/**
 * @method getYAxis
 * @description Function to generate set of points of printing the y axis
 * @param margin
 * @param yAxisOptions
 * @param y
 * @returns a set of points
 */
export const getYAxis =
  ({ margin, yAxisOptions, y }: props) =>
  (g: any) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(null, "s"))
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
