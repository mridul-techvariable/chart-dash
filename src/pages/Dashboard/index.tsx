import React from "react";
import { BarChart } from "../../components/Charts/BarChart";
import { PieChart } from "../../components/Charts/PieChart";
import { LineChart } from "../../components/Charts/LineChart";
import { AreaChart } from "../../components/Charts/AreaChart";
import { ColumnChart } from "../../components/Charts/ColumnChart";
import { DonutChart } from "../../components/Charts/DonutChart";
import { MixedChart } from "../../components/Charts/MixedChart";
import BubbleChart from "../../components/Charts/BubbleChart/bubbleChart";
import { ScatterChart } from "../../components/Charts/ScatterChart";
import NavWrapper from "../../components/NavWrapper";

const scatterData = [
  { x: 95, y: 95, name: "BE" },
  { x: 86.5, y: 102.9, name: "DE" },
  { x: 80.8, y: 91.5, name: "FI" },
  { x: 80.4, y: 102.5, ame: "NL" },
  { x: 80.3, y: 86.1, name: "SE" },
  { x: 78.4, y: 70.1, name: "ES" },
  { x: 74.2, y: 68.5, name: "FR" },
  { x: 73.5, y: 83.1, ame: "NO" },
  { x: 71, y: 93.2, name: "UK" },
  { x: 69.2, y: 57.6, name: "IT" },
  { x: 68.6, y: 20, ame: "RU" },
  { x: 65.5, y: 126.4, name: "US" },
  { x: 65.4, y: 50.8, name: "HU" },
  { x: 63.4, y: 51.8, name: "PT" },
  { x: 64, y: 82.9, name: "NZ" },
];

const bubbleData = [
  {
    rad: 0.091701625465715,
    type: "a",
  },
  {
    rad: 0.21272087383101,
    type: "a",
  },
  {
    rad: 0.035410223127195,
    type: "a",
  },
  {
    rad: 0.116931769564156,
    type: "a",
  },
  {
    rad: 0.013794659620028,
    type: "a",
  },
  {
    rad: 0.0129693381043,
    type: "a",
  },
  {
    rad: 0.291664026179998,
    type: "a",
  },
  {
    rad: 0.04721313648375,
    type: "a",
  },
  {
    rad: 0.021851369654518,
    type: "a",
  },
  {
    rad: 0.164620503784299,
    type: "a",
  },
  {
    rad: 0.008410419255516,
    type: "a",
  },
  {
    rad: 0.005227036266279,
    type: "a",
  },
  {
    rad: 0.002633168645419,
    type: "a",
  },
  {
    rad: 0.005109133192603,
    type: "a",
  },
  {
    rad: 0.007349291592437,
    type: "a",
  },
  {
    rad: 0.018983866904985,
    type: "a",
  },
  {
    rad: 0.00259386762086,
    type: "a",
  },
  {
    rad: 0.006641873150384,
    type: "a",
  },
  {
    rad: 0.006013056757448,
    type: "a",
  },
  {
    rad: 0.01167240429387,
    type: "a",
  },
  {
    rad: 0.007703000813463,
    type: "a",
  },
  {
    rad: 0.007309990567878,
    type: "a",
  },
  {
    rad: 0.085056619494122,
    type: "a",
  },
  {
    rad: 0.008410419255516,
    type: "a",
  },
  {
    rad: 0.022025327018441,
    type: "a",
  },
  {
    rad: 0.007152786469644,
    type: "a",
  },
  {
    rad: 0.00259386762086,
    type: "a",
  },
  {
    rad: 0.044184825988111,
    type: "a",
  },
  {
    rad: 0.002397362498068,
    type: "a",
  },
  {
    rad: 0.001925750203366,
    type: "a",
  },
  {
    rad: 0.003576393234822,
    type: "a",
  },
  {
    rad: 0.037442807041286,
    type: "a",
  },
  {
    rad: 0.004165908603199,
    type: "a",
  },
  {
    rad: 0.00699558237141,
    type: "a",
  },
  {
    rad: 0.011357996097402,
    type: "a",
  },
  {
    rad: 0.00310478094012,
    type: "a",
  },
  {
    rad: 0.002908275817328,
    type: "a",
  },
  {
    rad: 0.15696688881131,
    type: "a",
  },
  {
    rad: 0.010768480729025,
    type: "a",
  },
  {
    rad: 0.004873327045252,
    type: "a",
  },
  {
    rad: 0.004951929094369,
    type: "a",
  },
  {
    rad: 0.062100404237204,
    type: "a",
  },
  {
    rad: 0.006288163929358,
    type: "a",
  },
  {
    rad: 0.005580745487305,
    type: "a",
  },
  {
    rad: 0.010964985851817,
    type: "a",
  },
  {
    rad: 0.065675828926238,
    type: "a",
  },
  {
    rad: 0.002829673768211,
    type: "a",
  },
  {
    rad: 0.002358061473509,
    type: "a",
  },
  {
    rad: 0.033326518431661,
    type: "a",
  },
  {
    rad: 0.008096011059048,
    type: "a",
  },
  {
    rad: 0.008921332574776,
    type: "a",
  },
  {
    rad: 0.006407028724269,
    type: "a",
  },
  {
    rad: 0.002318760448951,
    type: "a",
  },
  {
    rad: 0.009982460237855,
    type: "a",
  },
  {
    rad: 0.009275041795803,
    type: "a",
  },
  {
    rad: 0.008331817206399,
    type: "a",
  },
  {
    rad: 0.006681174174943,
    type: "a",
  },
  {
    rad: 0.009746654090504,
    type: "a",
  },
  {
    rad: 0.012694230932391,
    type: "a",
  },
  {
    rad: 0.00778160286258,
    type: "a",
  },
  {
    rad: 0.122831049081978,
    type: "a",
  },
  {
    rad: 0.01972911432836,
    type: "a",
  },
  {
    rad: 0.032533192312423,
    type: "a",
  },
  {
    rad: 0.012340521711364,
    type: "a",
  },
  {
    rad: 0.00778160286258,
    type: "a",
  },
  {
    rad: 0.013401649374444,
    type: "a",
  },
  {
    rad: 0.092540392990121,
    type: "a",
  },
  {
    rad: 0.016074119044421,
    type: "a",
  },
  {
    rad: 0.091500419795522,
    type: "a",
  },
  {
    rad: 0.015916914946187,
    type: "a",
  },
  {
    rad: 0.022126476826427,
    type: "a",
  },
  {
    rad: 0.259706981483785,
    type: "a",
  },
  {
    rad: 0.157804736533797,
    type: "a",
  },
  {
    rad: 0.014580680111198,
    type: "a",
  },
  {
    rad: 0.023580614735091,
    type: "a",
  },
  {
    rad: 0.264835515453092,
    type: "a",
  },
  {
    rad: 0.093223919096152,
    type: "a",
  },
  {
    rad: 0.01454137908664,
    type: "a",
  },
  {
    rad: 0.013598154497236,
    type: "a",
  },
  {
    rad: 0.012694230932391,
    type: "a",
  },
  {
    rad: 0.039379674283325,
    type: "a",
  },
  {
    rad: 0.013323047325327,
    type: "a",
  },
  {
    rad: 0.009235740771244,
    type: "a",
  },
  {
    rad: 0.098217744077975,
    type: "a",
  },
  {
    rad: 0.006916980322293,
    type: "a",
  },
  {
    rad: 0.080238603101887,
    type: "a",
  },
  {
    rad: 0.085701445515517,
    type: "a",
  },
  {
    rad: 0.005777250610097,
    type: "a",
  },
  {
    rad: 0.045798299599645,
    type: "a",
  },
  {
    rad: 0.06770171979446,
    type: "a",
  },
  {
    rad: 0.013165843227093,
    type: "a",
  },
  {
    rad: 0.005855852659214,
    type: "a",
  },
  {
    rad: 0.015995516995304,
    type: "a",
  },
  {
    rad: 0.026035625677048,
    type: "a",
  },
  {
    rad: 0.007585097739788,
    type: "a",
  },
  {
    rad: 1e-8,
    type: "a",
  },
  {
    rad: 0.010296868434323,
    type: "a",
  },
  {
    rad: 0.114572769251385,
    type: "a",
  },
  {
    rad: 0.019139598959982,
    type: "a",
  },
  {
    rad: 1,
    type: "a",
  },
  {
    rad: 0.33783817349853,
    type: "b",
  },
  {
    rad: 0.110217721797216,
    type: "b",
  },
  {
    rad: 0.153419823533985,
    type: "b",
  },
  {
    rad: 0.232619783225072,
    type: "b",
  },
  {
    rad: 0.107489842215448,
    type: "b",
  },
  {
    rad: 0.051796865821407,
    type: "b",
  },
  {
    rad: 0.222935041862613,
    type: "b",
  },
  {
    rad: 0.090400495054295,
    type: "b",
  },
  {
    rad: 0.148602376148966,
    type: "b",
  },
  {
    rad: 0.225924252507015,
    type: "b",
  },
  {
    rad: 0.102882063279118,
    type: "b",
  },
  {
    rad: 0.073539429206727,
    type: "b",
  },
  {
    rad: 0.083064836536197,
    type: "b",
  },
  {
    rad: 0.003777316699617,
    type: "b",
  },
  {
    rad: 0.082736374214491,
    type: "b",
  },
  {
    rad: 0.332528918214375,
    type: "b",
  },
  {
    rad: 0.03887734783431,
    type: "b",
  },
  {
    rad: 0.05234430302425,
    type: "b",
  },
  {
    rad: 0.005036422266157,
    type: "b",
  },
  {
    rad: 0.012919517987098,
    type: "b",
  },
  {
    rad: 0.007390402238382,
    type: "b",
  },
  {
    rad: 0.039041578995162,
    type: "b",
  },
  {
    rad: 0.193709852453792,
    type: "b",
  },
  {
    rad: 0.0083757892035,
    type: "b",
  },
  {
    rad: 0.184959560774274,
    type: "b",
  },
  {
    rad: 0.006623990154402,
    type: "b",
  },
  {
    rad: 0.081915218410227,
    type: "b",
  },
  {
    rad: 0.109109604483063,
    type: "b",
  },
  {
    rad: 0,
    type: "b",
  },
  {
    rad: 0.102617651110145,
    type: "b",
  },
  {
    rad: 0.001642311608529,
    type: "b",
  },
  {
    rad: 0.17991478900799,
    type: "b",
  },
  {
    rad: 0.052399046744534,
    type: "b",
  },
  {
    rad: 0.144761009296616,
    type: "b",
  },
  {
    rad: 0.050811478856289,
    type: "b",
  },
  {
    rad: 0.056076182436032,
    type: "b",
  },
  {
    rad: 0.190007241548802,
    type: "b",
  },
  {
    rad: 1,
    type: "b",
  },
  {
    rad: 0.047581599359515,
    type: "b",
  },
  {
    rad: 0.202251222027591,
    type: "b",
  },
  {
    rad: 0.1046886060485,
    type: "b",
  },
  {
    rad: 0.433387630635882,
    type: "b",
  },
  {
    rad: 0.050866222576574,
    type: "b",
  },
  {
    rad: 0.059962986576218,
    type: "b",
  },
  {
    rad: 0.043640051499045,
    type: "b",
  },
  {
    rad: 0.111796497364434,
    type: "b",
  },
  {
    rad: 0.000602180923127,
    type: "b",
  },
  {
    rad: 0.042873639415064,
    type: "b",
  },
  {
    rad: 0.056012132283299,
    type: "b",
  },
  {
    rad: 0.155728366218375,
    type: "b",
  },
  {
    rad: 0.14732465771753,
    type: "b",
  },
  {
    rad: 0.61296309173546,
    type: "b",
  },
  {
    rad: 0.206650866729948,
    type: "b",
  },
];

const Dashboard = () => {
  const data = [
    {
      name: "Year 1800",
      data: [107, 31, 635, 203, 2],
    },
    {
      name: "Year 1900",
      data: [133, 156, 947, 408, 6],
    },
    {
      name: "Year 2000",
      data: [814, 841, 3714, 727, 31],
    },
    {
      name: "Year 2016",
      data: [1216, 1001, 4436, 738, 40],
    },
  ];

  const pieData = [
    {
      name: "Chrome",
      data: 61.41,
      // sliced: true,
      // selected: true,
    },
    {
      name: "Internet Explorer",
      data: 11.84,
    },
    {
      name: "Firefox",
      data: 10.85,
    },
    {
      name: "Edge",
      data: 4.67,
    },
    {
      name: "Safari",
      data: 4.18,
    },
    {
      name: "Sogou Explorer",
      data: 1.64,
    },
    {
      name: "Opera",
      data: 1.6,
    },
    {
      name: "QQ",
      data: 1.2,
    },
    {
      name: "Other",
      data: 2.61,
    },
  ];

  return (
    <>
      <NavWrapper>
        <>
          <BarChart
            data={data}
            options={{
              chart: {
                height: 250,
                width: 600,
              },
            }}
            categories={["Africa", "America", "Asia", "Europe", "Oceania"]}
            onClick={() => console.log("clicked")}
          />
          <PieChart
            options={{
              chart: {
                height: 350,
                width: 600,
                title: {
                  text: "Browser",
                },
              },
              yAxis: {
                label: {
                  enabled: true,
                  text: "Count",
                },
              },
              xAxis: {
                label: { enabled: true, text: "Population per Capita" },
              },
            }}
            data={pieData}
            onClick={() => console.log("clicked pie chart")}
          />
          <LineChart
            categories={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
            options={{
              chart: {
                height: 250,
                width: 600,
              },
            }}
            data={[
              {
                data: [
                  29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
                  194.1, 95.6, 54.4,
                ],
              },
              {
                data: [
                  106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 80, 194.1, 95.6, 50,
                  29.9, 71.5,
                ],
              },
            ]}
            onClick={() => console.log("clicked line chart")}
          />
          <AreaChart
            categories={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
            options={{
              chart: {
                height: 250,
                width: 600,
              },
            }}
            data={[
              {
                data: [
                  29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
                  194.1, 95.6, 54.4,
                ],
              },
              {
                data: [
                  50, 29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 80,
                  194.1, 95.6,
                ],
              },
            ]}
            onClick={() => console.log("click area chart")}
          />
          <ColumnChart
            data={[
              {
                name: "purchase_amt",
                data: [269690, 224046, 277505, 259762],
              },
              {
                name: "time_spent",
                data: [32610, 31837, 31498, 33642],
              },
            ]}
            options={{
              chart: {
                height: 350,
                width: 600,
                title: {
                  text: "History World Population By Region",
                },
              },
              yAxis: {
                label: {
                  enabled: true,
                  text: "Countries",
                },
              },
              xAxis: {
                label: { enabled: true, text: "Population per Capita" },
              },
            }}
            onClick={() => console.log("Clicked")}
            categories={[
              "Google Chrome",
              "Microsoft Edge",
              "Mozilla Firefox",
              "Opera",
            ]}
          />
          <DonutChart
            options={{
              chart: {
                height: 350,
                width: 600,
                title: {
                  text: "Browser",
                },
              },
              yAxis: {
                label: {
                  enabled: true,
                  text: "Count",
                },
              },
              xAxis: {
                label: { enabled: true, text: "Population per Capita" },
              },
            }}
            categories={[
              "Google Chrome",
              "Microsoft Edge",
              "Mozilla Firefox",
              "Opera",
            ]}
            data={pieData}
            onClick={() => console.log("click")}
          />
          <MixedChart
            categories={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
            options={{
              chart: {
                height: 250,
                width: 600,
              },
            }}
            data={[
              {
                data: [
                  29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
                  194.1, 95.6, 54.4,
                ],
              },
              {
                data: [
                  106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 80, 194.1, 95.6, 50,
                  29.9, 71.5,
                ],
              },
            ]}
            onClick={() => console.log("clicked line chart")}
          />
          <BubbleChart data={bubbleData} width={`100px`} height={`100px`} />
          <ScatterChart
            categories={[
              "Google Chrome",
              "Microsoft Edge",
              "Mozilla Firefox",
              "Opera",
            ]}
            options={{
              chart: {
                height: 350,
                width: 600,
                title: {
                  text: "Browser",
                },
              },
              yAxis: {
                label: {
                  enabled: true,
                  text: "Count",
                },
              },
              xAxis: {
                label: { enabled: true, text: "Population per Capita" },
              },
            }}
            data={scatterData}
            onClick={() => console.log("click")}
          />
        </>
      </NavWrapper>
    </>
  );
};

export default Dashboard;
