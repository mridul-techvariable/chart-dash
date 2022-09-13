import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getRandomColor } from "../utils";
import { createTooltip, moveTooltip, resetTooltip } from "../Tooltip";
import { chartDefaults, getSvg } from "../Utilities/defaults";

export const PackedBubbleChart =   ({
    data,
    categories,
    options = { chart: { height: 500, width: window.innerWidth - 500 } },
    onClick = () => {},
  }) => {
    const ref = useRef();
    const [keys, setKeys] = useState([]);
    const [colors, setColors] = useState([]);
    const [chartData, setChartData] = useState([]);
    const animateDuration = 1000;

    let chartOptions = { ...chartDefaults.chart, ...options.chart };

    const { height, width } = chartOptions;

    useEffect(() => {
      let reformatData = data.map((curr) => {
        return curr.data.map((currData) => {
          return {
            name: currData.name,
            key: curr.name,
            category: curr.name,
            value: currData.value,
          };
        });
      });

      const reformattedData = Array.prototype.concat(...reformatData);
      console.log("reform", reformattedData);
      let keys = data.map((key) => key.name);

      let colors = keys.map((_) => getRandomColor());

      setColors(colors);

      setKeys(keys);
      setChartData(reformattedData);
    }, [data]);

    useEffect(() => {
      if (chartData.length) {
        const color = d3.scaleOrdinal().domain(keys).range(colors);
        const max = chartData.reduce(function (prev, current) {
          return prev?.value > current?.value ? prev?.value : current?.value;
        });

        var size = d3
          .scaleLinear()
          .domain([0, max * 100])
          .range([7, 55]);

        let svg = getSvg(ref, chartOptions);

        var node = svg
          .append("g")
          .selectAll("circle")
          .data(chartData)
          .enter()
          .append("circle")
          .attr(
            "r",
            function (d) {
              return size(d.value);
            }
            // return size(d.value);
          )
          .attr("cx", width / 2)
          .attr("cy", height / 2)
          .style("fill", (d) => color(keys.indexOf(d.category)))
          .style("fill-opacity", 0.9)
          // .attr("stroke", "black")
          // .style("stroke-width", 1)
          .on("mouseover", function (e, d) {
            console.log("d", d);
            let className = this.getAttribute("class");

            // svg
            //   .selectAll(`circle`)
            //   // .transition("growStroke")
            //   // .attr("stroke-width", 3)
            //   // .attr("stroke-opacity", "10%")
            //   // .attr("r", size(d.value))
            //   .attr("opacity", 0.5);

            // d3.select(this)
            //   .transition("grow")
            //   // .attr("r", size(d.value) + 2)
            //   .attr("opacity", 0.9);
            createTooltip(e, d, svg, this, options);
          })
          .on("mousemove", (event) => {
            moveTooltip(event, options);
          })
          .on("mouseout", (e, d) => {
            // d3.select(this).attr("opacity", 1);

            // svg
            //   .selectAll("circle")
            //   .attr("opacity", 0.9)

            resetTooltip(svg, options);
          })
          .call(
            d3
              .drag() // call specific function when circle is dragged
              .on("start", (event, d) => dragstarted(event, d))
              .on("drag", (event, d) => dragged(event, d))
              .on("end", (event, d) => dragended(event, d))
          );

        var simulation = d3
          .forceSimulation()
          .force(
            "center",
            d3
              .forceCenter()
              .x(width / 2)
              .y(height / 2)
          ) // Attraction to the center of the svg area
          .force("charge", d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
          .force(
            "collide",
            d3
              .forceCollide()
              .strength(0.2)
              .radius(function (d) {
                return size(d.value) + 3;
              })
              .iterations(1)
          ); // Force that avoids circle overlapping

        // Apply these forces to the nodes and update their positions.
        // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
        simulation.nodes(chartData).on("tick", function (d) {
          node
            .attr("cx", function (d) {
              return d.x;
            })
            .attr("cy", function (d) {
              return d.y;
            });
        });

        // What happens when a circle is dragged?
        function dragstarted(event, d) {
          console.log("event", event, d, "active", event.active);
          if (!event.active) simulation.alphaTarget(0.03).restart();
          d.fx = d.x;
          d.fy = d.y;
        }
        function dragged(event, d) {
          d.fx = event.x;
          d.fy = event.y;
        }
        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0.03);
          d.fx = null;
          d.fy = null;
        }

        svg.node();
      }
    }, [chartData]);
    console.log({Baal:"dhekera"})

    return <svg ref={ref}></svg>;
  }
