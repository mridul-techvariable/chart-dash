import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getRandomColor } from "../utils";
import { createTooltip, moveTooltip, resetTooltip } from "../Tooltip";
import { yAxisLabel } from "../Utilities/YAxisLabel";
import { getXAxis } from "./bits/xAxis";
import { getYAxis } from "./bits/yAxis";
import {
  chartDefaults,
  getChartOptions,
  getSvg,
  margin,
} from "../Utilities/defaults";
import { xAxisLabel } from "../Utilities/XAxisLabel";
import { getChartTitle } from "../Utilities/ChartTitle";

type props = {
  data: any;
  categories: any;
  options: any;
  onClick: any;
};

export const AreaChart = ({
  data,
  categories,
  options = { chart: { height: 500, width: window.innerWidth - 500 } },
  onClick = () => {},
}: props) => {
  const ref: any = useRef();
  const [chartData, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [colors, setColors] = useState([]);
  const animateDuration = 1000;

  let chartOptions = { ...chartDefaults.chart, ...options.chart };

  const { height, width } = chartOptions;

  let yAxisOptions = {
    ...getChartOptions({ axis: "yAxis", options }),
  };

  let xAxisOptions = {
    ...getChartOptions({ axis: "xAxis", options }),
  };

  useEffect(() => {
    let keys: any = new Array(data.length).fill(0).map((_, i) => i);

    let colors: any = keys.map((_: any) => getRandomColor());

    setColors(colors);

    setKeys(keys);
  }, [data]);

  useEffect(() => {
    const x = d3
      .scalePoint()
      .domain(categories)
      .range([margin.left, width - margin.right - 50]);

    let minRange: any = d3.min(
      data.reduce((acc: any, curr: any) => [...acc, ...curr.data], [])
    );

    const y = d3
      .scaleLinear()
      .domain([
        minRange < 0 ? minRange : 0,
        d3.max(
          data.reduce((acc: any, curr: any) => [...acc, ...curr.data], [])
        ),
      ])
      .nice()
      .rangeRound([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal().domain(keys).range(colors);

    const xAxis = getXAxis({ margin, xAxisOptions, x, height });

    const yAxis = getYAxis({
      margin,
      yAxisOptions,
      y,
      height,
      // margin,
      chartData: data,
    });

    const area = d3
      .area()
      .curve(d3.curveLinear)
      .x((d, i): any => x(categories[i]))
      .y0(y(0))
      .y1((d: any, i: any) => y(d));

    let svg = getSvg(ref, chartOptions);

    let path = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .selectAll("path")
      .data(data)
      .join("path")
      .attr("class", (d, i) => `layer${i}`)
      .attr("style", "opacity:0")
      .attr("stroke", (d: any, i: any) => d.color || color(i))
      .attr("d", (d: any) => area(d.data))
      .attr("fill", (d: any, i: any) => d.color || color(i));

    path
      .on("mouseover", function () {
        d3.selectAll(path).transition().style("opacity", 0.1);
        d3.select(this)
          .raise()
          .transition()
          .style("cursor", "pointer")
          .style("opacity", 1);
      })
      .on("mouseout", function () {
        d3.selectAll(path).transition().style("opacity", 0.8);
      });

    //#region commented animation
    //line transform animation
    // let pathNodes = svg
    //   .selectAll("path")
    //   .nodes()
    //   .map((node) => node.getTotalLength());

    // path
    //   .attr("stroke-dasharray", (d, i) => pathNodes[i])
    //   .attr("stroke-dashoffset", (d, i) => pathNodes[i])
    //   .transition()
    //   .ease(d3.easeSin)
    //   .duration(animateDuration)
    //   .attr("stroke-dashoffset", 0)
    //   .style("opacity", 0.8)
    //   .transition()
    //   .duration(1000)
    //   .delay(500)
    //   .attr("fill", (d, i) => color(i));
    //draw data points
    //#endregion
    svg
      .append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("stroke", (d: any, i: any) => d.color || color(i))
      .attr("stoke-width", "2px")
      .attr("fill", "#fff")
      .selectAll("circle")
      .data((data: any, ci: any) => {
        let mData = categories.map((category: any, index: any) => ({
          key: index,
          name: data.name,
          category: category,
          value: data.data[index],
          ci,
        }));
        return mData;
      })
      .join("circle")
      .style("opacity", 0)
      .attr("r", 3)
      .on("click", (e: any, { ci, ...d }: any) => {
        onClick(d);
        resetTooltip(svg, options);
      })
      .attr("class", (d: any) => `layer${d.ci}`)
      .attr("cx", (d: any, i: any): any => x(categories[d.key]))
      .attr("cy", (d: any, i) => y(d.value))
      .on("mouseover", function (e, d) {
        // let className = this.getAttribute("class");
        d3.select(this).transition("growArea").attr("r", 6);
        d3.selectAll(`.${""}`)
          .raise()
          .transition()
          .style("cursor", "pointer")
          .style("opacity", 1);
        createTooltip(e, d, svg, this, options);
      })
      .on("mousemove", function (event) {
        moveTooltip(event, options);
      })
      .on("mouseout", function () {
        d3.select(this).transition("growArea").attr("r", 3);
        // let className = this.getAttribute("class");
        d3.selectAll(`.${""}`)
          .transition("areaTransition")
          .style("cursor", "pointer")
          .style("opacity", 0.8);
        resetTooltip(svg, options);
      });

    /**path animation */
    path
      .transition()
      .delay(animateDuration)
      .duration(200)
      .style("opacity", 0.8);

    //circle animation
    svg
      .selectAll("circle")
      .transition()
      .delay(animateDuration)
      .duration(200)
      .style("opacity", 1);

    yAxisLabel(svg, height, margin, yAxisOptions);
    xAxisLabel(svg, width, height, margin, xAxisOptions);
    getChartTitle(svg, width, height, margin, chartOptions);

    svg.append("g").call(xAxis);

    svg.append("g").call(yAxis);

    svg.node();

    return function () {
      svg.selectAll("*").remove();
    };
  }, [data, colors, keys]);

  return <svg id="d3charttvcp" ref={ref}></svg>;
};
