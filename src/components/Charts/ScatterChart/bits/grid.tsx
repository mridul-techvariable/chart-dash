import * as d3 from "d3";

type props = {
  margin: any;
  xAxisOptions: any;
  x: any;
  height: any;
  chartData: any;
};

/**
 * @method getGrid
 * @description Function to generate a grid for scatter chart
 * @param margin
 * @param xAxisOptions
 * @param x
 * @param height
 * @param chartData
 * @return a set of points for constructing the grid
 */
export const getGrid =
  ({ margin, xAxisOptions, x, height, chartData }: props) =>
  (g: any) =>
    g
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.1)
      .call((g: any) =>
        g
          .append("g")
          .selectAll("line")
          .data(x.ticks())
          .join("line")
          .attr("x1", (d: any) => 0.5 + x(d))
          .attr("x2", (d: any) => 0.5 + x(d))
          .attr("y1", margin.top)
          .attr("y2", height - margin.bottom)
      )
      .call((g: any) =>
        g
          .append("g")
          .selectAll("line")
          .data((y: any) => y.ticks())
          .join("line")
          .attr("y1", (d: any, y: any) => 0.5 + y(d))
          .attr("y2", (d: any, y: any) => 0.5 + y(d))
          .attr("x1", margin.left)
          .attr("x2", 20 - margin.right)
      );
