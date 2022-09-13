export default class ChartLayoutOM {
  constructor(id, layout, chartData) {
    console.log('lalala',chartData)
    this.dashboard_id = id;
    this.charts = layout.map((chartLayout, index) => {
      let { data, ...others } = chartData[index];
      return { ...chartLayout, data: others };
    });
  }
}
