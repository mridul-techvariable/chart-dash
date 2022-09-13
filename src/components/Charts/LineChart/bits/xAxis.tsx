import * as d3 from "d3";

type props = {
  margin: any;
  xAxisOptions: any;
  x: any;
  height: any;
};

/**
 * @method getXAxis
 * @description Function to generate x axis plot points
 * @param margin
 * @param xAxisOptions
 * @param x
 * @param height
 * @returns a set of x axis points
 */
export const getXAxis =
  ({ margin, xAxisOptions, x, height }: props) =>
  (g: any) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .call((g: any) =>
        g.select(".domain").style("color", xAxisOptions.domain.color)
      )
      .call((g: any) =>
        g.selectAll(".tick line").attr("stroke", xAxisOptions.ticks.tickColor)
      )
      .call((g: any) =>
        g
          .selectAll(".tick text")
          .attr("fill", xAxisOptions.ticks.color)
          .attr("transform", `rotate(${xAxisOptions.ticks.rotation})`)
      );
