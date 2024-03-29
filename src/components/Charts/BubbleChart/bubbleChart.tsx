import React, { Component } from "react";
import * as d3 from "d3";
import * as _ from "lodash";

export default class BubbleChart extends Component<any, any> {
  simulation: any;
  state: any;
  graphdata: any;
  node: any;

  constructor(props: any) {
    super(props);

    this.state = {
      margin: { top: 0, right: 20, bottom: 20, left: 0 },
      sizeDivisor: 0.8,
      color: null,
      nodePadding: 2.5,
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    const { data }: any = this.props;
    window.addEventListener("resize", this.handleResize);
    this.setState({
      color: d3.scaleOrdinal(["#597EF7", "#9254DE"]),
    });
    this.simulation = d3.forceSimulation();
    let tempData = data;
    tempData.forEach((d: any) => {
      if (d.rad) {
        d.size = +d.rad * 120;
        d.size < 1 ? (d.radius = 1) : (d.radius = d.size);
      } else {
        d.value = +d.value;
        d.size = +d.value / this.state.sizeDivisor;
        d.size < 3 ? (d.radius = 3) : (d.radius = d.size);
      }
    });
    this.graphdata = tempData.sort((a: any, b: any) => {
      return b.size - a.size;
    });
    this.createBubblePlot(this.graphdata);
  }

  componentDidUpdate(prevProps: any) {
    const { data }: any = this.props;
    if (!_.isEqual(prevProps.data, this.props.data)) {
      let tempData = data;
      tempData.forEach((d: any) => {
        if (d.rad) {
          d.size = +d.rad * 120;
          d.size < 1 ? (d.radius = 1) : (d.radius = d.size);
        } else {
          d.value = +d.value;
          d.size = +d.value / this.state.sizeDivisor;
          d.size < 3 ? (d.radius = 3) : (d.radius = d.size);
        }
      });
      this.graphdata = tempData.sort((a: any, b: any) => {
        return b.size - a.size;
      });
      this.createBubblePlot(this.graphdata);
    }
  }
  createBubblePlot(data: any) {
    const node = this.node;
    d3.select(node).selectAll("g").remove();
    const width =
      this.props.width - this.state.margin.left - this.state.margin.right;
    const height =
      this.props.height - this.state.margin.top - this.state.margin.bottom;
    this.simulation
      .force(
        "forceX",
        d3
          .forceX()
          .strength(0.1)
          .x(width * 0.5)
      )
      .force(
        "forceY",
        d3
          .forceY()
          .strength(0.1)
          .y(height * 0.5)
      )
      .force(
        "center",
        d3
          .forceCenter()
          .x(width * 0.5)
          .y(height * 0.5)
      )
      .force("charge", d3.forceManyBody().strength(-15));

    let nodeg = d3
      .select(node)
      .attr("width", width + this.state.margin.left + this.state.margin.right)
      .attr("height", height + this.state.margin.top + this.state.margin.bottom)
      .append("g")
      .attr(
        "transform",
        "translate(" +
          this.state.margin.left +
          "," +
          this.state.margin.top +
          ")"
      );

    let nodes: any = null;
    let nodestext1: any = null;
    let nodeinnercircle: any = null;
    // let nodestext2 = null;
    // let nodestext3 = null;

    this.simulation
      .nodes(data)
      .force(
        "collide",
        d3
          .forceCollide()
          .strength(0.5)
          .radius((d: any) => {
            return (width / height / 2) * d.radius + this.state.nodePadding;
          })
          .iterations(1)
      )
      .on("tick", function (d: any) {
        nodes
          .attr("cx", (d: any) => {
            return d.x;
          })
          .attr("cy", (d: any) => {
            return d.y;
          });

        nodestext1
          .attr("x", (d: any) => {
            return d.x;
          })
          .attr("y", (d: any) => {
            return d.y;
          });

        nodeinnercircle
          .attr("cx", (d: any) => {
            return d.x;
          })
          .attr("cy", (d: any) => {
            return d.y;
          });
      });

    let nodedata = nodeg.selectAll("circle").data(data).enter();

    nodes = nodedata
      .append("circle")
      .attr("r", (d: any) => {
        return (width / height / 2) * d.radius;
      })
      .attr("fill", (d: any) => {
        if (d.color) {
          return d.color;
        } else {
          if (d.type === "a") {
            return "#597EF7";
          } else {
            return "#9254DE";
          }
        }
      })
      .attr("fill-opacity", (d: any) => {
        if (d.rad) {
          let opacity = d.rad.toFixed(2);
          if (opacity >= 1) {
            return opacity;
          } else if (opacity < 1 && opacity > 0.4) {
            return 0.8;
          } else if (opacity < 0.4 && opacity > 0.04) {
            return 0.6;
          } else {
            return 0.5;
          }
        } else {
          return 1;
        }
      })
      .attr("cx", (d: any) => {
        return d.x;
      })
      .attr("cy", (d: any) => {
        return d.y;
      })
      .on("mouseover", this.mouseOver)
      .on("mouseout", this.mouseOut)
      .call(
        d3.drag()
        // d3
        //   .drag()
        //   .on("start", this.dragstarted)
        //   .on("drag", this.dragged)
        //   .on("end", this.dragended)
      );

    nodeinnercircle = nodedata
      .append("circle")
      .attr("cx", (d: any) => {
        return d.x;
      })
      .attr("cy", (d: any) => {
        return d.y;
      })
      .attr("r", (d: any) => {
        if (d.label === "" || d.label === " ") {
          return 0;
        } else {
          return 11;
        }
      })
      .attr("visibility", (d: any) => {
        if (d.label === "" || d.label === " " || !d.label) {
          return "hidden";
        } else {
          return "visible";
        }
      })
      .attr("fill", "#000000")
      .attr("fill-opacity", "0.24");

    let nodetxt = nodeg.selectAll("text").data(data).enter();

    nodestext1 = nodetxt
      .append("text")
      .attr("x", (d: any) => {
        return d.x;
      })
      .attr("y", (d: any) => {
        return d.y;
      })
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .text(function (d: any) {
        return d.label;
      })
      .attr("font-family", "SF-Pro-Display-Semibold")
      .attr("font-size", "12px")
      .attr("font-weight", 600)
      .attr("line-height", "20px")
      .attr("fill", "white");

    // nodestext2 = nodetxt
    //     .append("text")
    //     .attr("x", (d) => { return d.x })
    //     .attr("y", (d) => { return d.y })
    //     .attr("dy", ".3em")
    //     .style("text-anchor", "middle")
    //     .text(function (d) {
    //         return d.country;
    //     })
    //     .attr("font-family", "Gill Sans")
    //     .attr("font-size", function (d) {
    //         return d.radius / 5;
    //     })
    //     .attr("fill", "white");

    // nodestext3 = nodetxt
    //     .append("text")
    //     .attr("x", (d) => { return d.x })
    //     .attr("y", (d) => { return d.y })
    //     .attr("dy", "1.3em")
    //     .style("text-anchor", "middle")
    //     .text(function (d:any) {
    //         return d.label;
    //     })
    //     .attr("font-family", "Gill Sans")
    //     .attr("font-size", function (d) {
    //         return d.radius / 5;
    //     })
    //     .attr("fill", "white");

    this.simulation.alphaTarget(0.03).restart();
  }

  dragstarted = (e: any, d: any): any => {
    if (!e.active) this.simulation.alphaTarget(0.03).restart();
    d.fx = e.x;
    d.fy = e.y;
  };

  dragged = (e: any, d: any): any => {
    d.fx = e.x;
    d.fy = e.y;
  };

  dragended = (e: any, d: any): any => {
    if (!e.active) this.simulation.alphaTarget(0.03);
    d.fx = null;
    d.fy = null;
  };

  render() {
    return (
      <div
        style={{
          height: this.props.height,
          width: this.props.width,
          border: "1px solid #000000",
        }}
      >
        <svg
          style={{
            height: this.props.height,
            width: this.props.width,
          }}
          ref={(node) => (this.node = node)}
        ></svg>
      </div>
    );
  }

  handleResize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    this.createBubblePlot(this.graphdata);
    //     this.forceUpdate();
  };

  mouseOver = (e: any, data: any) => {
    if (data) {
      if (data.label !== "" && data.label !== " ") {
        if (this.props.onMouseOver) {
          this.props.onMouseOver(e, data);
        }
      }
    }
  };
  mouseOut = (e: any, data: any) => {
    // console.log("onMouseOut")
    if (data) {
      if (data.label !== "" && data.label !== " ") {
        if (this.props.onMouseOut) {
          this.props.onMouseOut(e, data);
        }
      }
    }
  };
}
