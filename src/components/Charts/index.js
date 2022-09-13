import { PieChart } from "@material-ui/icons";
import { AreaChart } from "./AreaChart";
import { BarChart } from "./BarChart";
import { ColumnChart } from "./ColumnChart";
import { LineChart } from "./LineChart";
import { DonutChart } from "./DonutChart"
import {ScatterChart } from "./ScatterChart";
import {MixedChart } from "./MixedChart";
import {PackedBubbleChart} from "./PackedBubbleChart"
import Worldmap from "./WorldMap/Index";
// import Worldmap from "./WorldMap/Index";

const charts = {
  barchart: BarChart,
  areachart: AreaChart,
  linechart: LineChart,
  piechart: PieChart,
  donutchart: DonutChart,
  geochart:Worldmap,
  scatterchart: ScatterChart,
  columnchart: ColumnChart,
  packedbubblechart:PackedBubbleChart,
  mixedchart:MixedChart ,
  //Worldmap : Worldmap
};

export default charts;
