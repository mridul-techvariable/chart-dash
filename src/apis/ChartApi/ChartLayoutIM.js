export default class ChartLayoutIM {
  constructor(chartLayout) {
    this.data = chartLayout?.map((layout) => {
      const tempData = layout.data;
      tempData.options.chart = {
        ...tempData.options.chart,
        height: 220,
        width: 550,
      };
      return tempData;
    });
    // this.name = chartLayout?.map((layout) => layout.name);
    this.layout = chartLayout?.map((layoutData, index) => {
      let { data, name, query, ...others } = layoutData;
      return others;
    });
  }
}
