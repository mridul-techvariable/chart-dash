import React, { memo, useEffect, useRef, useState } from "react";
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

type Props = {
  data: any;
  categories: any;
  options: any;
  onClick: any;
};

export const BarChart = ({
  data,
  categories,
  options,
  onClick = () => {},
}: Props) => {
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
      const color = d3
        .scaleOrdinal()
        .domain(keys)
        .range(["#98abc5", "#6b486b", "#a05d56", "#ff8c00"]);

      /**Scales setup */
      const y0 = d3
        .scaleBand()
        .domain(categories)
        .rangeRound([margin.top, height - margin.bottom])
        .paddingInner(0.1);

      const y1 = d3
        .scaleBand()
        .domain(keys)
        .rangeRound([y0.bandwidth(), 0])
        .padding(0.1);

      const x = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(chartData, (d: any) => d3.max(keys, (key, index) => d[index])),
        ])
        .nice()
        .rangeRound([margin.left, width - margin.right]);

      /**Axes setup */
      let xAxis = getXAxis({
        margin,
        xAxisOptions,
        x,
        height,
        chartData,
      });
      let yAxis = getYAxis({ margin, yAxisOptions, y0 });

      svg
        .append("g")
        .selectAll("g")
        .data(chartData)
        .join("g")
        .attr(
          "transform",
          (d: any, i: any) => `translate(0,${y0(categories[i])})`
        )
        .selectAll("rect")
        .data((d: any, index: any) => {
          return data.map((_: any, dataIndex: any) => {
            return {
              name: _.name,
              key: categories[index],
              category: categories[index],
              value: d[dataIndex],
              color: _.color || color(dataIndex),
            };
          });
        })
        .join("rect")
        .attr("x", (d: any) => x(0))
        .attr("y", (d: any, index: any): any => y1(index))
        .attr("height", y1.bandwidth())
        .on("click", function (e: any, d: any) {
          onClick(d);
          resetTooltip(svg, options);
        })
        .attr("fill", (d: any, index: any) => d.color)
        .on("mouseover", function (e: any, d: any) {
          // createTooltip(e, d, svg, this, options);
        })
        .on("mousemove", (event: any) => moveTooltip(event, options))
        .on("mouseout", () => resetTooltip(svg, options));

      svg
        .selectAll("rect")
        .transition("barTransition")
        .duration(500)
        .attr("x", (d: any) => x(0))
        .attr("width", (d: any) => x(d.value) - x(0))
        .delay(function (d: any, i: any) {
          return i * 100;
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

  return <svg id="d3charttvcp" ref={ref}></svg>;
};
