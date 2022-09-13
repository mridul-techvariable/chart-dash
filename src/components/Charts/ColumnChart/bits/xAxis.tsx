import * as d3 from "d3";

type props = {
  margin: any;
  xAxisOptions: any;
  x0: any;
  height: any;
};

export const getXAxis =
  ({ margin, xAxisOptions, x0, height }: props) =>
  (g: any) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x0).tickSizeOuter(0))
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
