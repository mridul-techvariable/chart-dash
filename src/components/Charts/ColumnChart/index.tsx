import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getRandomColor } from "../utils";
import { TvTooltip } from "../Utilities/Tooltip";
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
import { svg } from "d3";

type props = {
  data: any;
  categories: any;
  options: any;
  onClick: any;
};

export const ColumnChart = ({
  data,
  categories,
  options = { chart: { height: 500, width: window.innerWidth - 500 } },
  onClick = () => {},
}: props) => {
  const ref: any = useRef();
  const [chartData, setData] = useState([]);
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
    let reformatted = categories.map((category: any, index: any) => {
      return data.reduce((acc: any, dataItem: any, dataIndex: any) => {
        return { ...acc, [dataIndex]: dataItem.data[index] };
      }, {});
    });

    let keys: any = new Array(data.length).fill(0).map((_, i) => i);

    let colors: any = keys.map((_: any) => getRandomColor());

    setColors(colors);

    setKeys(keys);

    setData(reformatted);
  }, [data]);

  useEffect(() => {
    let svg = getSvg(ref, chartOptions);

    if (chartData.length) {
      const x0 = d3
        .scaleBand()
        .domain(categories)
        .rangeRound([margin.left, width - margin.right])
        .paddingInner(0.2);

      const x1 = d3
        .scaleBand()
        .domain(keys)
        .rangeRound([0, x0.bandwidth()])
        .padding(0.05);

      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(chartData, (d: any) => d3.max(keys, (key, index) => d[index])),
        ])
        .nice()
        .rangeRound([height - margin.bottom, margin.top]);

      const color = d3
        .scaleOrdinal()
        .domain(keys)
        .range(["#98abc5", "#6b486b", "#a05d56", "#ff8c00"]);

      const xAxis = getXAxis({ margin, xAxisOptions, x0, height });

      const yAxis = getYAxis({ margin, yAxisOptions, y, height, chartData });

      svg
        .append("g")
        .selectAll("g")
        .data(chartData)
        .join("g")
        .attr("transform", (d, i) => `translate(${x0(categories[i])},0)`)
        .selectAll("rect")
        .data((d, index) => {
          return data.map((_: any, dataIndex: any) => {
            return {
              name: _.name,
              category: categories[index],
              key: categories[index],
              value: d[dataIndex],
              color: _.color || color(dataIndex),
            };
          });
        })
        .join("rect")
        .attr("x", (d: any, index: any): any => x1(index))
        .attr("y", (d) => y(0))
        .attr("width", x1.bandwidth())
        .on("click", function (e, d) {
          onClick(d);
          resetTooltip(svg, options);
        })
        .attr("fill", (d: any, index: any) => d.color)
        .on("mouseover", function (e, d) {
          createTooltip(e, d, svg, this, options);
        })
        .on("mousemove", (event) => moveTooltip(event, options))
        .on("mouseout", () => resetTooltip(svg, options));

      //Animation
      svg
        .selectAll("rect")
        .transition("columnTransition")
        .duration(500)
        .attr("y", (d: any) => y(d.value))
        .attr("height", (d: any) => y(0) - y(d.value))
        .delay(function (d, i) {
          return i * 100;
        });

      ////////LINEDRAW///////

      const line = d3
        .line()
        .x((d, i): any => x1(categories[i]))
        .y((d: any, i: any) => y(d));

      let path = svg
        .append("g")
        .attr("fill", "none")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .selectAll("path")
        .data(data)
        .join("path")
        .attr("class", (d, i) => `datapoint${i}`)
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
        .duration(1000)
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
        .on("click", (e: any, { ci, ...d }: any): any => {
          onClick(d);
          resetTooltip(svg, options);
        })
        .attr("cx", (d: any, i): any => x1(categories[d.key]))
        .attr("cy", (d: any, i) => y(d.value))
        .on("mouseover", function (e, d) {
          // let className = this.getAttribute("class");

          svg
            .selectAll(`:not(.${""})`)
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

      yAxisLabel(svg, height, margin, yAxisOptions);
      xAxisLabel(svg, width, height, margin, xAxisOptions);
      getChartTitle(svg, width, height, margin, chartOptions);

      svg.append("g").call(xAxis);

      svg.append("g").call(yAxis);

      svg.node();
    }
    return function () {
      svg.selectAll("*").remove();
    };
  }, [chartData]);

  return <svg ref={ref}></svg>;
};
