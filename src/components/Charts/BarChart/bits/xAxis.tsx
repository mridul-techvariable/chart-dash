import * as d3 from "d3";

type props = {
  margin: any;
  xAxisOptions: any;
  x: any;
  height: any;
  chartData: any;
};

export const getXAxis =
  ({ margin, xAxisOptions, x, height, chartData }: props) =>
  (g: any) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .call((g: any) =>
        g.select(".domain").style("color", xAxisOptions.domain.color)
      )
      .call(d3.axisBottom(x).ticks(null, "s"))
      .call((g: any) =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 15)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text(chartData.y)
      )
      .call((g: any) =>
        g.selectAll(".tick line").attr("stroke", xAxisOptions.ticks.tickColor)
      )
      .call((g: any) =>
        g.selectAll(".tick text").attr("fill", xAxisOptions.ticks.color)
      );
