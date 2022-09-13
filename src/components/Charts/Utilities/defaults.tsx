import * as d3 from "d3";

export const chartDefaults: any = {
  chart: {
    height: 500,
    width: window.innerWidth - 500,
    background: "#fff",
    title: { enabled: true, text: "ChartIO", color: "#666666", fontSize: 18 },
  },
  yAxis: {
    domain: { color: "rgba(0, 0, 0, 0.08)" },
    label: { enabled: false, fontSize: "14px" },
    ticks: {
      rotation: 0,
      color: "#666666",
      tickColor: "rgba(0, 0, 0, 0.08)",
      fontSize: "16px",
    },
  },
  xAxis: {
    domain: { color: "rgba(0, 0, 0, 0.08)" },
    label: { enabled: false, fontSize: "14px" },
    ticks: {
      rotation: 0,
      color: "#666666",
      tickColor: "rgba(0, 0, 0, 0.08)",
      fontSize: "16px",
    },
  },
  tooltip: {
    enabled: true,
  },
};

/**
 * @param {object} options
 * @param {('xAxis'|'yAxis')} options.axis - The axis to get the chartOptions for
 * @param {object} options.options - The options provided to the chart
 *
 */
export const getChartOptions = ({ axis, options = {} }: any) => ({
  domain: { ...chartDefaults[axis].domain, ...options?.[axis]?.domain },
  label: { ...chartDefaults[axis].label, ...options?.[axis]?.label },
  ticks: { ...chartDefaults[axis].ticks, ...options?.[axis]?.ticks },
});

export const margin = { top: 50, right: 60, bottom: 50, left: 100 };

export const getSvg = (ref: any, chartOptions: any) =>
  d3
    .select(ref.current)
    .attr("viewBox", `0 0 ${chartOptions.width} ${chartOptions.height}`)
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .style("background", chartOptions.background)
    .style("padding", chartOptions.padding || "0px");
