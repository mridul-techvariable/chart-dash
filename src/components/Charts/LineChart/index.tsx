import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getRandomColor } from "../utils";
import { createTooltip, moveTooltip, resetTooltip } from "../Tooltip";
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

type props = {
  data: any;
  categories: any;
  options: any;
  onClick: any;
};

/**
 * @method LineChart
 * @description Function to generate a LineChart
 * @param data
 * @param categories
 * @param options
 * @param onClick
 * @returns a react node
 */
export const LineChart = ({
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
      chartData: data,
    });
    console.log("chartDatas1", data);
    const line = d3
      .line()
      .x((d: any, i: any): any => x(categories[i]))
      .y((d: any, i: any) => y(d));

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
      .attr("class", (d: any, i: any) => `datapoint${i}`)
      .attr("stroke", (d: any, i: any) => d.color || color(i))
      .attr("d", (d: any) => line(d.data));

    //line transform animation
    let pathNodes = svg
      .selectAll("path")
      .nodes()
      .map((node: any) => node.getTotalLength());

    path
      .attr("stroke-dasharray", (d, i) => pathNodes[i])
      .attr("stroke-dashoffset", (d, i) => pathNodes[i])
      .transition()
      .ease(d3.easeSin)
      .duration(animateDuration)
      .attr("stroke-dashoffset", 0);

    //draw data points

    svg
      .append("g")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("fill", "#fff")
      .attr("stroke", (d: any, i: any) => data.color || color(i))
      .attr("stoke-width", "2px")
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
      .attr("class", (d: any) => `datapoint${d.ci}`)
      .style("opacity", 0)
      .attr("r", 4)
      .on("click", (e: any, { ci, ...d }: any) => {
        onClick(d);
        resetTooltip(svg, options);
      })
      .attr("cx", (d: any, i: any): any => x(categories[d.key]))
      .attr("cy", (d: any, i: any) => y(d.value))
      .on("mouseover", function (e: any, d: any) {
        // let className = this?.getAttribute("class");

        svg
          // .selectAll(`:not(.${className})`) //uncomment later
          .selectAll(`:not(.${``})`)
          .transition("growStroke")
          .attr("stroke-width", 3)
          .attr("stroke-opacity", "10%");
        d3.select(this).transition("grow").attr("r", 8);
        //Tooltip
        createTooltip(e, d, svg, this, options);
      })
      .on("mousemove", (event) => moveTooltip(event, options))
      .on("mouseout", function () {
        // let className = this.getAttribute("class");
        d3.select(this).transition("grow").attr("r", 4);
        d3.selectAll(path)
          .transition("shrinkStroke")
          .attr("stroke-width", 1.5)
          .attr("stroke-opacity", "100%");
        svg
          .selectAll("path,circle")
          .transition("shrinkStroke")
          .attr("stroke-width", 1.5)
          .attr("stroke-opacity", "100%");
        resetTooltip(svg, options);
      });

    //circle animation
    svg
      .selectAll("circle")
      .transition("lineTransition")
      .delay(animateDuration)
      .duration(500)

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

  return <svg ref={ref}></svg>;
};
