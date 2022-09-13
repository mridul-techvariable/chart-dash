import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getRandomColor } from "../utils";
import { createTooltip, moveTooltip, resetTooltip, tooltip } from "../Tooltip";
import { yAxisLabel } from "../Utilities/YAxisLabel";
import {
  chartDefaults,
  getChartOptions,
  getSvg,
  margin,
} from "../Utilities/defaults";
import { getXAxis } from "./bits/xAxis";
import { getYAxis } from "./bits/yAxis";
import { xAxisLabel } from "../Utilities/XAxisLabel";
import { getChartTitle } from "../Utilities/ChartTitle";
// import { getGrid } from "./bits/grid";

type props = {
  data: any;
  categories: any;
  options: any;
  onClick: any;
};

/**
 * @method ScatterChart
 * @description Function to generate a scatter chart
 * @param data
 * @param categories
 * @param options
 * @param onClick
 * @returns a react node
 */
export const ScatterChart = ({
  data,
  categories,
  options,
  onClick = () => {},
}: props) => {
  const ref: any = useRef();
  // const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [colors, setColors] = useState([]);

  let chartOptions = { ...chartDefaults.chart, ...options.chart };

  const { height, width } = chartOptions;

  let yAxisOptions = {
    ...getChartOptions({ axis: "yAxis", options }),
  };

  let xAxisOptions = {
    ...getChartOptions({ axis: "xAxis", options }),
  };

  useEffect(() => {
    // let reformatted = categories.map((category, index) => {
    //   return data.reduce((acc, dataItem, dataIndex) => {
    //     return { ...acc, [dataIndex]: dataItem.data[index] };
    //   }, {});
    // });

    let keys: any = new Array(data.length).fill(0).map((_, i) => i);

    let colors: any = keys.map((_: any) => getRandomColor());

    setColors(colors);

    setKeys(keys);

    // setData(reformatted);
  }, [data]);

  useEffect(() => {
    if (data.length) {
      const color = d3.scaleOrdinal().domain(keys).range(colors);

      /**Scales setup */
      const y = d3
        .scaleLinear()
        // .domain(d3.extent(data: any, (d: any): any => d.y))
        .domain([33, 44])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // const y1 = d3
      //   .scaleBand()
      //   .domain(keys)
      //   .rangeRound([y0.bandwidth(), 0])
      //   .padding(0.1);

      const x = d3
        .scaleLinear()
        // .domain(d3.extent(data: any, (d: any): any => d.x))
        .domain([33, 44])
        .nice()
        .range([margin.left, width - margin.right]);

      let xAxis = getXAxis({
        margin,
        xAxisOptions,
        x,
        height,
        data,
      });
      let yAxis = getYAxis({ margin, yAxisOptions, y });

      // const grid = getGrid({margin, })

      /**Axes setup */

      let svg = getSvg(ref, chartOptions);

      svg
        .append("g")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", (d: any) => x(d.x))
        .attr("cy", (d: any) => y(height))
        .attr("r", 1.5)
        .attr("stroke", (d: any, i: any): any => color(i))
        // .attr("stroke-opacity", 0.3)
        .attr("fill", "none")
        .style("opacity", 0.5)
        .on("mouseover", function (e: any, d: any) {
          d3.select(this).transition("grow").attr("r", 8);
          createTooltip(e, d, svg, this, options);
        })
        .on("mousemove", (event) => moveTooltip(event, options))
        .on("mouseout", () => resetTooltip(svg, options));

      svg
        .selectAll("circle")
        .transition()
        .delay(function (d: any, i: any) {
          return i * 10;
        })
        .duration(2000)
        // .attr("cx", (d) => x(d.x))
        .attr("cy", (d: any) => y(d.y));

      svg
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("dy", "0.35em")
        .attr("x", (d: any) => x(d.x) + 7)
        .attr("y", (d: any) => y(d.y) + 7)
        .text((d: any) => d.name);
      yAxisLabel(svg, height, margin, yAxisOptions);
      xAxisLabel(svg, width, height, margin, xAxisOptions);
      getChartTitle(svg, width, height, margin, chartOptions);

      svg.append("g").call(xAxis);

      svg.append("g").call(yAxis);
      // svg.append("g").call(grid);

      svg.node();
    }
  }, [data, keys, colors]);

  return <svg ref={ref}></svg>;
};
