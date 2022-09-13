import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getRandomColor } from "../utils";
import { createTooltip, moveTooltip, resetTooltip } from "../Tooltip";
import {
  chartDefaults,
  getChartOptions,
  getSvg,
  margin,
} from "../Utilities/defaults";

type props = {
  data: any;
  categories: any;
  options: any;
  onClick: any;
};

/**
 * @method DonutChart
 * @description Function to generate a donut chart
 * @param data
 * @param categories
 * @param options
 * @param onClick
 * @returns
 */
export const DonutChart = ({
  data,
  categories,
  options = { chart: { height: 500, width: window.innerWidth - 500 } },
  onClick = () => {},
}: props) => {
  const ref: any = useRef();
  const [keys, setKeys] = useState([]);
  const [colors, setColors] = useState([]);
  const animateDuration = 1000;

  let chartOptions = { ...chartDefaults.chart, ...options.chart };

  const { height, width } = chartOptions;

  useEffect(() => {
    let keys: any = new Array(data.length).fill(0).map((_, i) => i);

    let colors: any = keys.map((_: any) => getRandomColor());

    setColors(colors);

    setKeys(keys);
  }, [data]);

  useEffect(() => {
    const color = d3.scaleOrdinal().domain(keys).range(colors);

    const pie = d3
      .pie()
      .sort(null)
      .startAngle(1.1 * Math.PI)
      .endAngle(3.1 * Math.PI)
      .value((d: any) => d.data);

    const arcs = pie(data);

    let arc = d3
      .arc()
      .innerRadius(height / 4)
      .outerRadius(height / 2);
    const radius = (height / 2) * 0.85;

    const arcLabel = d3.arc().innerRadius(radius).outerRadius(radius);

    let svg: any = getSvg(ref, chartOptions);

    svg
      .append("g")
      .attr("transform", `translate(${width / 2} ${height / 2})`)
      .attr("stroke", "white")
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(arcs)
      .join("path")
      // .attr("fill", (d, i) => color(i))
      // .attr("d", arc)
      .on("click", function (e: any, d: any) {
        onClick(d);
      })
      .on("mouseover", function (e: any, d: any) {
        // createTooltip(e, d, svg, this, options);
      })
      .on("mousemove", (event: any) => moveTooltip(event, options))
      .on("mouseout", () => resetTooltip(svg, options))
      .append("title")
      .text((d: any) => `${d.data.name}: ${d.data.data.toLocaleString()}`);

    svg
      .selectAll("path")
      .transition()
      .duration(600)
      .attrTween("d", function (d: any) {
        var i = d3.interpolate(d.startAngle, d.endAngle);
        return function (t: any) {
          d.endAngle = i(t);
          return arc(d);
        };
      })
      .attr("fill", (d: any, i: any) => color(i));

    // svg
    //   .append("g")
    //   .attr("transform", `translate(${width / 2} ${height / 2})`)
    //   .attr("font-family", "montserrat")
    //   .attr("font-size", 10)
    //   .attr("margin", 10)
    //   .attr("text-anchor", "start")
    //   .selectAll("text")
    //   .data(arcs)
    //   .join("text")
    //   .attr("d", arc)
    //   .attr('transform', d => `translate(${arcLabel.centroid(d)})`)
    //   .call((text) =>
    //     text
    //       .append("tspan")
    //       .attr("y", "-0.4em")
    //       .attr("font-weight", "bold")
    //       .text((d) => d.data.name)
    //   )
    //   .call((text) =>
    //     text
    //   //    .filter((d) => d.endAngle - d.startAngle > 0.25)
    //       .append("tspan")
    //       .attr("x", 0)
    //       .attr("y", "0.7em")
    //       .attr("fill-opacity", 0.7)
    //       .text((d) => d.data.data.toLocaleString())
    //   );

    svg.node();
  }, [data, colors]);

  return <svg ref={ref}></svg>;
};
