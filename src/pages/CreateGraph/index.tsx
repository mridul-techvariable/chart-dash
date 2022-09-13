// import React, { useState, useEffect } from "react";
// import BasicLayout from "../../components/BasicLayout/DashboardCreationTopNav";
// import SideNav from "../../components/BasicLayout/DashboardCreationSideNav";
// import Button from "../../components/buttons/CustomButton";
// import DropdownMenu from "../../components/DropdownMenu";
// import DroppableField from "../../components/fields/DroppableField";
// import Popup from "../../components/Popup";
// import TabBox from "../../components/TabBox";
// import { isEmpty } from "../../utils/functions";
// import { useParams } from "react-router";
// // temp image
// import graphIcon from "../../icons/svgs/graphButtonIcon.svg";
// import publishButtonIcon from "../../icons/svgs/publishButtonIcon.svg";
// import addKpiIcon from "../../icons/svgs/kpiAdd.svg";
// import { databases } from "../../apis/databases.apis";
// import { tablesMeta } from "../../apis/tablesMeta.apis";
// import { getChartLayout } from "../../apis/ChartApi/charts.apis.js";

// //
// import DroppableFieldIm from "../../components/fields/DroppableField/DroppableFieldIm";
// import Filter from "../../components/Filter";
// import KpiCard from "../../components/cards/KpiCard";
// import Customize from "./Customize";
// import ChartArea from "./ChartArea";
// import PublishDashboard from "./PublishDashboard";
// import UploadStatus from "./UploadStatus";
// import AddKpi from "./AddKpi";
// import TabBar from "./TabBar";
// import GraphDropdown from "./GraphDropdown";
// import useStyles from "./style";
// import { Grid } from "@material-ui/core";
// import { EMPTY_ARRAY, EMPTY_OBJECT, EMPTY_STRING } from "../../utils/constants";
// import { processQuery } from "../../apis/queryfunctions.apis";
// import { tilesFunctions } from "../../apis/tiles.apis";
// import { getMappingTable } from "../../apis/mapping.apis";

// // import WithLoader from '../../hoc/WithLoader';
// // import theme from '../../theme';
// const titles = ["FILTER", "CUSTOMIZE"];

// // const ChartAreaWithLoader = WithLoader(ChartArea, {
// //   background: '#fff',
// //   borderRadius: '10px',
// //   border: '1px solid #000000',
// // });

// // const KpiCardWithLoader = WithLoader(KpiCard, {
// //   width: theme.typography.pxToRem(192),
// //   height: theme.typography.pxToRem(95),
// //   borderRadius: '10px',
// //   background: '#fff',
// // });

// /**
//  * @method DashboardCreationPage - page to create a dashboard
//  * @param {Object} props - props passed to the component
//  */

// const DashboardCreationPage = (props: any) => {
//   const {
//     mainContainer,
//     dropFieldX,
//     dropFieldY,
//     graphSection,
//     sideNav,
//     tabBox,
//     bottomBar,
//     button,
//     buttonGraph,
//     contain,
//     dropGrid,
//     chartArea,
//     tabBoxContainer,
//     graphContain,
//     dropContainer,
//     addKpi,
//     kpiButton,
//     kpiText,
//     kpiContainer,
//     kpiContain,
//   } = useStyles();

//   /**
//    * valueTab - index of the tab element
//    * @type {number}
//    * popup - state of popup open or close
//    * @type {boolean}
//    * anchorEl - position where dropdown should be opened
//    * @type {Object}
//    * inputList - add multiple charts values of array
//    * @type {Array}
//    * selectedDatabase - datasource selected from dropdown to display
//    * @type {Object}
//    * datasource - all databases to be set from api call
//    * @type {Array}
//    * refresh - to toggle refresh page
//    * @type {boolean}
//    * queryObject - query object to be sent to the backend after taking data from droppable sections
//    * @type {Object}
//    * droppedTable - table object dropped on droppable field
//    * @type {Object}
//    * clickedChartType - chart type selected on click of graph
//    * @type {Object}
//    * chartData - chart data fetched once query is generated and chart type is selected
//    */

//   const [valueTab, setValueTab] = useState(0);
//   const [popup, setPopup] = useState(false);
//   const [popupKpi, setPopupKpi] = useState(false);
//   const [popupStatus, setPopupStatus] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [inputList, setInputList] = useState(["input", "input test"]);
//   const [selectedDatabase, setSelectedDatabase] = useState(EMPTY_OBJECT);
//   const [datasource, setDatasource] = useState(EMPTY_ARRAY);
//   const [tableContent, setTableContent] = useState(EMPTY_ARRAY);
//   const [refresh, setRefresh] = useState(false);
//   const [droppedTable, setDroppedTable] = useState<any>([{}]);
//   const [clickedChartType, setClickedChartType] = useState(EMPTY_STRING);
//   const [chartData, setChartData] = useState<any>([]);
//   const [filterArr, setFilterArr] = useState<any>([[]]);
//   const [selectedTabChart, setSelectedTabChart] = useState(0);
//   const [xfieldState, setXFieldState] = useState([[]]);
//   const [yfieldState, setYFieldState] = useState([[]]);
//   const [chartTitles, setChartTitles] = useState([
//     "chart title 1",
//     "chart title 2",
//     "random shit",
//   ]);
//   const [tiles, setTiles] = useState<any>([[]]);
//   const [queryObject, setQueryObject] = useState<any>(["query one", "query two "]);
//   const [tilesFunction, setTilesFunction] = useState(EMPTY_ARRAY);
//   const [tilesData, setTilesData] = useState(EMPTY_ARRAY);
//   const [loading, setLoading] = useState(false);
//   const [editKpiObject, setEditKpiObject] = useState(EMPTY_OBJECT);
//   const [editKpiIndex, setEditKpiIndex] = useState(null);
//   const [chartIdEdit, setChartIdEdit] = useState(EMPTY_ARRAY);
//   const [isLoadFirst, setIsLoadFirst] = useState(true);
//   const [mappedCheckbox, setMappedCheckbox] = useState(false);
//   const [loadMapState, setLoadMapState] = useState(false);

//   const { id } = useParams();
//   const dashboardName = props?.history?.location?.state?.dashboardName;

//   /**
//    * @method getTilesFunctions
//    * @description api call to get functions to be used in tiles
//    */

//   const getTilesFunctions = () => {
//     tilesFunctions()
//       .then((response: any) => {
//         setTilesFunction(response?.data?.data);
//       })
//       .catch((err: any) => console.log("err", err));
//   };

//   /**
//    * @method getMappedTables
//    * @description api call to get mapped tables
//    */

//   const getMappedTables = () => {
//     setLoadMapState(true);
//     getMappingTable(selectedDatabase?.id)
//       .then((response: any) => {
//         setTableContent([...tableContent, ...response.data]);
//         setLoadMapState(false);
//       })
//       .catch((err: any) => console.log("err", err));
//   };

//   /**
//    * @method getChartData
//    * @description api call to get chart data
//    */
//   const getChartData = () => {
//     let tempQuery = queryObject;

//     let temp = tempQuery.map((prev: any, index: any) => {
//       if (index === selectedTabChart) {
//         return {
//           ...prev,
//           tiles: [],
//         };
//       } else return prev;
//     });

//     processQuery(temp[selectedTabChart])
//       .then((response: any) => {
//         chartData.splice(selectedTabChart, 1, response?.data);
//         setChartData([...chartData]);
//         setLoading(false);
//       })
//       .catch((err: any) => console.log(err));
//   };

//   /**
//    * @method getTilesFunctions
//    * @description api call to get list of tiles
//    */

//   const getTiles = () => {
//     processQuery(queryObject[selectedTabChart])
//       .then((response: any) => {
//         tilesData.splice(selectedTabChart, 1, response?.data?.tiles);
//         setTilesData([...tilesData]);
//         setLoading(false);
//       })
//       .catch((err: any) => console.log(err));
//   };

//   /**
//    * @method getTables
//    * @description api call to get tables meta from datasource
//    */

//   const getTables = (id: any) => {
//     tablesMeta(id)
//       .then((response: any) => {
//         setTableContent(response?.data?.data);
//         getCharts(response);
//       })
//       .catch((err: any) => {
//         console.log(err);
//         props.loadPrimary(false);
//       });
//   };

//   /**
//    * @method getDatabase
//    * @description api call to get all datasource
//    */

//   const getDatabase = () => {
//     databases()
//       .then((response: any) => {
//         setDatasource(response?.data?.data?.results);
//         setSelectedDatabase(response?.data?.data?.results[0]);
//         if (response?.data?.data?.results[0]?.id) {
//           getTables(response?.data?.data?.results[0]?.id);
//         }
//       })
//       .catch((err: any) => {
//         console.log(err);
//         props.loadPrimary(false);
//       });
//   };

//   /**
//    * @method getCharts
//    * @description api call to get dashboard contents
//    */

//   const getCharts = (responseTable: any) => {
//     let xfields: any = ["1", "2", "3", "4"];
//     let yfields: any = ["1", "2", "3", "4"];
//     let inputs: any = [
//       { title: "new chart" },
//       { title: "new chart 1" },
//       { title: "new chart 2" },
//     ];
//     let charts: any = ["1", "2", "3", "4"];
//     let query: any = ["1", "2", "3", "4"];
//     let chartTitle: any = [
//       "random title",
//       "random title 2",
//       "random title 3",
//       "random title 4",
//     ];
//     let filterTable: any = ["1", "2", "3", "4"];
//     let filter: any = ["1", "2", "3", "4"];
//     let tilesTemp: any = ["1", "2", "3", "4"];
//     let chartId: any = ["1", "2", "3", "4"];
//     getChartLayout(id)
//       .then((response: any) => {
//         if (response?.status != 400 && response.charts) {
//           response.charts.map((item: any, index: any) => {
//             let name = item.options.chart.title.text;
//             inputs.push({ title: name });
//             chartTitle.push(name);
//             charts.push(item);
//             chartId.push(item?.chart_id);
//             query.push(item.query);
//             filter.push(
//               item?.query?.query?.filter ? item?.query?.query?.filter : []
//             );
//             if (typeof item?.tiles == "undefined") {
//               tilesTemp.push([]);
//             } else {
//               tilesTemp.push(item?.tiles);
//               //  tilesTemp =
//             }

//             filterTable.push({
//               table: responseTable?.data?.data.filter(
//                 (element: any) => element?.id == item?.query?.query?.tableId
//               )[0],
//             });

//             let xFieldMapped = new DroppableFieldIm(
//               item.query.graph.xfield,
//               index
//             );
//             yfields.push(
//               item.query.graph.yfields.map((yfield: any) => ({
//                 header: yfield.column_name,
//                 id: yfield.column_id,
//                 tableId: yfield.table_fingerprint,
//                 color: yfield.color,
//               }))
//             );
//             xfields.push([xFieldMapped]);
//           });
//         } else {
//           inputs.push({ title: "new chart" });
//           charts.push([]);
//           query.push([]);
//           chartTitle.push("new chart");
//           filter.push([]);
//           filterTable.push([]);
//           yfields.push([]);
//           xfields.push([]);
//           tilesTemp.push([]);
//           chartId.push([]);
//         }
//         setInputList([...inputs]);
//         setQueryObject([...query]);
//         setChartData([...charts]);
//         setChartTitles([...chartTitle]);
//         setFilterArr([...filter]);
//         setDroppedTable([...filterTable]);
//         setXFieldState([...xfields]);
//         setYFieldState([...yfields]);
//         setTiles([...tilesTemp]);
//         setTilesData([...tilesTemp]);
//         setChartIdEdit([...chartId]);
//         props.loadPrimary(false);
//         setIsLoadFirst(false);
//       })
//       .catch((err: any) => {
//         console.log(err);
//         props.loadPrimary(false);
//       });
//   };

//   useEffect(() => {
//     // if (
//     //   queryObject[selectedTabChart]?.statusXY &&
//     //   queryObject[selectedTabChart]?.graph.type &&
//     //   !isLoadFirst
//     // ) {
//     //   setLoading(true);
//     //   !isLoadFirst && getChartData();
//     // }
//     // if (
//     //   queryObject[selectedTabChart]?.statusXY &&
//     //   queryObject[selectedTabChart]?.tiles?.length >= 0 &&
//     //   !isLoadFirst
//     // ) {
//     //   setLoading(true);
//     //   getTiles();
//     // }

//     console.log("clicked something!");
//   }, [clickedChartType, queryObject]);

//   // useEffect(() => {
//   //   if (!queryObject[selectedTabChart]?.statusXY) {
//   //     chartData.splice(selectedTabChart, 1, {});
//   //     //tilesData.splice(selectedTabChart, 1);
//   //     setChartData([...chartData]);
//   //     setTilesData([...tilesData])
//   //   }
//   // }, [queryObject]);

//   useEffect(() => {
//     // props.loadPrimary(true);
//     getDatabase();
//     getTilesFunctions();
//     setTimeout(
//       function () {
//         props.loadPrimary(false);
//       }.bind(this),
//       8000
//     );
//   }, []);

//   useEffect(() => {
//     if (selectedDatabase?.id) {
//       getTables(selectedDatabase?.id);
//     }
//   }, [refresh]);

//   useEffect(() => {
//     if (
//       !isEmpty(queryObject[selectedTabChart]?.graph?.xfield) &&
//       !isEmpty(queryObject[selectedTabChart]?.graph?.yfields) &&
//       !queryObject[selectedTabChart]?.statusXY
//     ) {
//       setQueryObject(
//         [...queryObject].map((prev, index) => {
//           if (index === selectedTabChart) {
//             return {
//               ...prev,
//               query: {
//                 ...prev.query,
//               },
//               graph: {
//                 ...prev.graph,
//               },
//               statusXY: true,
//             };
//           } else return prev;
//         })
//       );
//     }
//   }, [queryObject[selectedTabChart]?.graph]);

//   useEffect(() => {
//     const yFieldArray = yfieldState[selectedTabChart]?.map((item: any) => {
//       // return new XYFields(
//       //   item?.fingerprint,
//       //   item?.id,
//       //   item?.header,
//       //   item?.color
//       // );
//       return "random shit"
//     });

//     setQueryObject(
//       [...queryObject].map((prev: any, index: any) => {
//         if (index === selectedTabChart) {
//           return {
//             ...prev,
//             graph: {
//               ...prev.graph,
//               yfields: yFieldArray.length != 0 ? yFieldArray : EMPTY_ARRAY,
//             },
//             statusXY: false,
//           };
//         } else return prev;
//       })
//     );
//   }, [yfieldState]);

//   useEffect(() => {
//     const xFieldArray = xfieldState[selectedTabChart]?.map((item: any) => {
//       // return new XYFields(
//       //   item?.fingerprint,
//       //   item?.id,
//       //   item?.header,
//       //   item?.color
//       // );
//       return "random shit "
//     });

//     setQueryObject(
//       [...queryObject].map((prev: any, index: any) => {
//         if (index === selectedTabChart) {
//           return {
//             ...prev,
//             graph: {
//               ...prev.graph,
//               xfield: xFieldArray.length != 0 ? xFieldArray[0] : EMPTY_ARRAY,
//             },
//             statusXY: false,
//           };
//         } else return prev;
//       })
//     );
//   }, [xfieldState]);

//   /**
//    * @method handleChangeTab - handle the changing of tabs that contain filters
//    * @param {Object} event - click event on which tab is being clicked
//    * @param {number} - index of tab which was clicked
//    */

//   const handleChangeTab = (event: any, newValue: any) => {
//     setValueTab(newValue);
//   };

//   /**
//    * @method handleOpenPopup - handle opening of popup
//    */

//   const handleOpenPopup = () => {
//     setPopup(true);
//   };

//   /**
//    * @method handleClosePopup
//    * @description handle closing of popup
//    */

//   const handleClosePopup = () => {
//     setPopup(false);
//   };

//   /**
//    * @method handleOpenPopupStatus - handle opening of popup
//    */

//   const handleOpenPopupStatus = () => {
//     setPopupStatus(true);
//   };

//   /**
//    * @method handleClosePopupStatus
//    * @description handle closing of popup
//    */

//   const handleClosePopupStatus = () => {
//     setPopupStatus(false);
//   };

//   /**
//    * @method handleOpenPopupKpi - handle opening of popup for kpi
//    */

//   const handleOpenPopupKpi = (e: any, edit: any, index: any) => {
//     edit ? setEditKpiObject(edit) : setEditKpiObject(EMPTY_OBJECT);
//     edit ? setEditKpiIndex(index) : setEditKpiIndex(null);
//     setPopupKpi(true);
//   };

//   /**
//    * @method handleOpenPopupKpi
//    * @description handle closing of popup for kpi
//    */

//   const handleClosePopupKpi = () => {
//     setPopupKpi(false);
//   };
//   /**
//    * @method handleOpenDropdown - open dropdown to display graphs
//    * @param {Object} event - click event to get position where clicked
//    */
//   const handleOpenDropdown = (event: any) => {
//     setAnchorEl(event.currentTarget);
//   };

//   /**
//    * @method handleCloseDropdown - close dropdown to display graphs
//    */

//   const handleCloseDropdown = () => {
//     setAnchorEl(null);
//   };

//   /**
//    * @method handleAddTab - addmore charts to chart items tabs
//    */
//   //uncomment later
//   const handleAddTab = () => {
//     // setInputList([...inputList, { title: "New value" }]);
//     // setQueryObject([
//     //   ...queryObject,
//     //   {
//     //     type: "query",
//     //     query: EMPTY_OBJECT,
//     //     graph: EMPTY_OBJECT,
//     //     database: EMPTY_STRING,
//     //     databaseName: EMPTY_STRING,
//     //     statusXY: false,
//     //   },
//     // ]);
//     // setFilterArr([...filterArr, []]);
//     // setDroppedTable([...droppedTable, {}]);
//     // setXFieldState([...xfieldState, []]);
//     // setYFieldState([...yfieldState, []]);
//     // setChartData([...chartData, {}]);
//     // setChartTitles([...chartTitles, "New Chart " + (inputList.length + 1)]);
//     // setTiles([...tiles, []]);
//     // setSelectedTabChart(inputList.length);
//     console.log("handle add tab");
//   };

//   /**
//    * @method handleCopyTab
//    * @description handles copying of charts
//    */

//   const handleCopyTab = () => {
//     // setInputList([...inputList, { title: chartTitles[selectedTabChart] }]);
//     setChartTitles([...chartTitles, chartTitles[selectedTabChart]]);
//     setXFieldState([...xfieldState, xfieldState[selectedTabChart]]);
//     setYFieldState([...yfieldState, yfieldState[selectedTabChart]]);
//     setChartData([...chartData, chartData[selectedTabChart]]);
//     setQueryObject([...queryObject, queryObject[selectedTabChart]]);
//     setFilterArr([...filterArr, filterArr[selectedTabChart]]);
//     setDroppedTable([...droppedTable, droppedTable[selectedTabChart]]);
//     setSelectedTabChart(inputList.length);
//   };

//   /**
//    * @method handleTabChartDelete
//    * @description deletes the tab and all its dependencies
//    * @param {number} index - index of tab to be deleted
//    */

//   const handleTabChartDelete = (index: any) => {
//     setSelectedTabChart(index - 1);
//     inputList.splice(index, 1);
//     chartTitles.splice(index, 1);
//     xfieldState.splice(index, 1);
//     yfieldState.splice(index, 1);
//     chartData.splice(index, 1);
//     queryObject.splice(index, 1);
//     filterArr.splice(index, 1);
//     droppedTable.splice(index, 1);
//     setInputList([...inputList]);
//     setChartTitles([...chartTitles]);
//     setXFieldState([...xfieldState]);
//     setYFieldState([...yfieldState]);
//     setChartData([...chartData]);
//     setQueryObject([...queryObject]);
//     setFilterArr([...filterArr]);
//     setDroppedTable([...droppedTable]);
//   };

//   /**
//    *@method handleDatabaseChange
//    @description switch between datasources and get tables accordingly
//    * @param {String} value - selected database from dropdown
//    */

//   const handleDatabaseChange = (value: any) => {
//     setSelectedDatabase(value);
//     setRefresh(!refresh);
//   };

//   /**
//    * @method XYFields
//    * @description generate object for xfields
//    * @param {string} table_fingerprint
//    * @param {number} column_id
//    * @param {string} column_name
//    * @param {string} color
//    */

//   function XYFields(
//     table_fingerprint: any,
//     column_id: any,
//     column_name: any,
//     color: any
//   ) {
//     console.log("xyfield ");
//     // this.table_fingerprint = table_fingerprint;
//     // this.column_id = column_id;
//     // this.column_name = column_name;
//     // this.color = color;
//   }

//   /**
//    * @method handleXDrop - handles dropping of table items, and generate query object
//    * @param {Array} data - data received from droppable field
//    */

//   const handleXDrop = (data: any) => {
//     let repeatValidation = xfieldState[selectedTabChart].findIndex(
//       (item: any) => item?.id == data?.id
//     );

//     if (repeatValidation != -1) {
//       props.showToast.error("field exists");
//       return;
//     }

//     setXFieldState(
//       xfieldState.map((prev: any, index: any) => {
//         if (index === selectedTabChart) {
//           return [...prev, data];
//         } else return prev;
//       })
//     );
//     setDroppedTable(
//       [...droppedTable].map((prev: any, index: any) => {
//         if (index === selectedTabChart) {
//           return { ...prev, table: JSON.parse(data?.table) };
//         } else {
//           return prev;
//         }
//       })
//     );

//     setQueryObject(
//       [...queryObject].map((prev: any, index: any) => {
//         if (index === selectedTabChart) {
//           return {
//             ...prev,
//             query: {
//               tableId: data?.tableId,
//               table_name: data?.tableName,
//             },
//             database: selectedDatabase.id,
//             databaseName: selectedDatabase.file_name,
//             statusXY: false,
//           };
//         } else return prev;
//       })
//     );
//     chartData.splice(selectedTabChart, 1, {});

//     setChartData([...chartData]);
//   };
//   /**
//    * @method handleYDrop - handles dropping of table items, and generate query object
//    * @param {Array} data - data received from droppable field
//    */
//   const handleYDrop = (data: any) => {
//     let repeatValidation = yfieldState[selectedTabChart].findIndex(
//       (item: any) => item?.id == data?.id
//     );
//     let sameTableValidation = yfieldState[selectedTabChart].findIndex(
//       (item: any) => item?.tableId == data?.tableId
//     );

//     console.log("data", sameTableValidation);

//     let isValidDataType = false;

//     if (sameTableValidation == -1 && yfieldState[selectedTabChart].length) {
//       props.showToast.error("field should be from same table");
//       return;
//     }

//     if (data.type == "int" || data.type == "float") {
//       isValidDataType = true;
//     }

//     if (repeatValidation != -1) {
//       props.showToast.error("field exists");
//       return;
//     }
//     if (!isValidDataType) {
//       props.showToast.error("only integer or float is acceptable");
//       return;
//     }

//     setYFieldState(
//       yfieldState.map((prev: any, index: any) => {
//         if (index === selectedTabChart) {
//           return [...prev, data];
//         } else return prev;
//       })
//     );
//     setDroppedTable(
//       [...droppedTable].map((prev, index) => {
//         if (index === selectedTabChart) {
//           return { ...prev, table: JSON.parse(data?.table) };
//         } else {
//           return prev;
//         }
//       })
//     );

//     setQueryObject(
//       [...queryObject].map((prev: any, index: any) => {
//         if (index === selectedTabChart) {
//           return {
//             ...prev,
//             query: {
//               tableId: data?.tableId,
//               table_name: data?.tableName,
//             },
//             database: selectedDatabase.id,
//             databaseName: selectedDatabase.file_name,
//             statusXY: false,
//           };
//         } else return prev;
//       })
//     );

//     chartData.splice(selectedTabChart, 1, {});

//     setChartData([...chartData]);
//   };

//   /**
//    * @method handleGraphDropwdownClick - handles setting of clicked chart
//    * @param {string} value - value of clicked chart
//    */

//   const handleGraphDropwdownClick = (value: any) => {
//     setClickedChartType(value);
//     setQueryObject(
//       [...queryObject].map((prev: any, index: any) => {
//         if (index === selectedTabChart) {
//           return {
//             ...prev,
//             graph: {
//               ...prev.graph,
//               type: value,
//             },
//           };
//         } else return prev;
//       })
//     );
//     setAnchorEl(null);
//     chartData.splice(selectedTabChart, 1, {});
//     setChartData([...chartData]);
//   };

//   /**
//    * @method handleFilterAdd
//    * @description to add filter to the table
//    * @param {string} type -type of filter
//    * @param {string} typedVal - calue entered in field
//    * @param {string} columnName - column name on which filter to be applied
//    * @param {number} columnId - column id on which filter to be applied
//    */

//   const handleFilterAdd = (
//     type: any,
//     typedVal: any,
//     columnName: any,
//     columnId: any
//   ) => {
//     let filterObj = {
//       type: type,
//       column_id: columnId,
//       column_name: columnName,
//       value: [typedVal],
//     };
//     let and = [...(filterArr[selectedTabChart].and || []), filterObj];

//     setFilterArr(
//       [...filterArr].map((prev, index) => {
//         if (index === selectedTabChart) {
//           return {
//             ...prev,
//             and,
//           };
//         } else return prev;
//       })
//     );

//     setQueryObject(
//       [...queryObject].map((prev: any, index: any) => {
//         if (index === selectedTabChart) {
//           return {
//             ...prev,
//             query: {
//               ...prev.query,
//               filter: {
//                 and: and,
//               },
//             },
//           };
//         } else return prev;
//       })
//     );

//     chartData.splice(selectedTabChart, 1, {});

//     setChartData([...chartData]);
//   };

//   const handleAddKpi = (
//     title: any,
//     func: any,
//     column: any,
//     backgroundColor: any,
//     textColor: any,
//     edit: any
//   ) => {
//     if (typeof edit == "number") {
//       let tilesObject = {
//         title: title,
//         column_name: column,
//         function_name: func,
//         background_color: backgroundColor,
//         textColor: textColor,
//       };
//       tiles[selectedTabChart].splice(edit, 1, tilesObject);

//       setTiles([...tiles]);

//       setQueryObject(
//         [...queryObject].map((prev: any, index: any) => {
//           if (index === selectedTabChart) {
//             return {
//               ...prev,
//               tiles: tiles[selectedTabChart],
//             };
//           } else return prev;
//         })
//       );
//       return;
//     }

//     let tilesObj = {
//       title: title,
//       column_name: column,
//       function_name: func,
//       background_color: backgroundColor,
//       textColor: textColor,
//     };

//     let selectedTabTiles = tiles?.[selectedTabChart] || [];
//     selectedTabTiles.push(tilesObj);

//     const tilesCopy = [...tiles];

//     tilesCopy.splice(selectedTabChart, 1, selectedTabTiles);

//     setTiles([...tilesCopy]);

//     setQueryObject(
//       [...queryObject].map((prev: any, index: any) => {
//         if (index === selectedTabChart) {
//           return {
//             ...prev,
//             tiles: selectedTabTiles,
//           };
//         } else return prev;
//       })
//     );
//   };

//   const handleDeleteKpi = (index: any) => {
//     tiles[selectedTabChart].splice(index, 1);

//     setTiles([...tiles]);

//     setQueryObject(
//       [...queryObject].map((prev: any, i) => {
//         if (i === selectedTabChart) {
//           return {
//             ...prev,
//             tiles: tiles[selectedTabChart],
//           };
//         } else return prev;
//       })
//     );
//   };

//   /**
//    * @method handleTabChartClick
//    * @description handles on chart clicked
//    * @param {number} index - index of clicked tab
//    */

//   const handleTabChartClick = (index: any) => {
//     setSelectedTabChart(index);
//   };

//   /**
//    * @method handleDeleteXField
//    * @description removes column from x field
//    * @param {string} chip - name of the clicked chip
//    */

//   const handleDeleteXField = (chip: any, chipData: any) => {
//     let editedData = xfieldState[selectedTabChart].filter(
//       (curChip: any) => curChip.header !== chip
//     );
//     setXFieldState(
//       xfieldState.map((prev, index) => {
//         if (index === selectedTabChart) {
//           return editedData;
//         } else return prev;
//       })
//     );
//   };

//   /**
//    * @method handleDeleteYField
//    * @description removes column from y field
//    * @param {string} chip - name of the clicked chip
//    */

//   const handleDeleteYField = (chip: any) => {
//     let editedData = yfieldState[selectedTabChart].filter(
//       (curChip: any) => curChip.header !== chip
//     );
//     setYFieldState(
//       yfieldState.map((prev, index) => {
//         if (index === selectedTabChart) {
//           return editedData;
//         } else return prev;
//       })
//     );
//   };

//   /**
//    * @method deleteFilter
//    * @description removes filter that is clicked
//    * @param {number} index - index to be deleted
//    */

//   const deleteFilter = (index: any) => {
//     filterArr[selectedTabChart].and.splice(index, 1);
//     setFilterArr(
//       [...filterArr].map((prev, i) => {
//         if (i === selectedTabChart) {
//           return {
//             ...prev,
//             and: filterArr[selectedTabChart].and,
//           };
//         } else return prev;
//       })
//     );

//     setQueryObject(
//       [...queryObject].map((prev: any, i) => {
//         if (i === selectedTabChart) {
//           return {
//             ...prev,
//             query: {
//               ...prev.query,
//               filter: {
//                 and: filterArr[selectedTabChart].and,
//               },
//             },
//           };
//         } else return prev;
//       })
//     );
//   };

//   const mappedCheckboxHandler = () => {
//     setMappedCheckbox(!mappedCheckbox);
//     if (!mappedCheckbox) {
//       getMappedTables();
//     } else {
//       let tempTable = tableContent.filter((item: any) => item?.dump_id);
//       setTableContent([...tempTable]);
//     }
//     // !mappedCheckbox && getMappedTables()
//   };

//   /**
//    * components - components to pass as props to tab component of material ui
//    * @type {Array}
//    */
//   let components = [
//     {
//       index: 0,
//       val: (
//         <Filter
//           droppedTable={droppedTable[selectedTabChart]?.table}
//           filterArr={filterArr[selectedTabChart]?.and}
//           fields={droppedTable[selectedTabChart]?.table?.fields}
//           deleteFilter={deleteFilter}
//           tablePage={false}
//           handleFilterAdd={handleFilterAdd}
//           {...props}
//         />
//       ),
//     },
//     {
//       index: 1,
//       val: (
//         <Customize
//           selectedChartIndex={selectedTabChart}
//           chartData={chartData}
//           setChartData={setChartData}
//         />
//       ),
//     },
//   ];

//   /**
//    * @method handleReset
//    * @description resets the chart
//    */

//   const handleReset = () => {
//     /**reset chart data */
//     chartData.splice(selectedTabChart, 1, {});
//     setChartData([...chartData]);
//     /**reset chart title */
//     chartTitles.splice(selectedTabChart, 1, "Lorem Ipsum Chart Title");
//     setChartTitles([...chartTitles]);
//     /**remove selected chart type */
//     // queryObject[selectedTabChart].graph.type = null;
//     setQueryObject([...queryObject]);
//   };

//   return (
//     <div className={contain}>
//       <Grid xs={12} container>
//         <BasicLayout hasAvatar DashboardTitle={`Draft/${dashboardName}`} />
//         <Grid container className={sideNav}>
//           <SideNav
//             tableContent={tableContent}
//             loadMapState={loadMapState}
//             handleOpenPopupStatus={handleOpenPopupStatus}
//             datasource={datasource}
//             handleDatabaseChange={handleDatabaseChange}
//             database={selectedDatabase?.title}
//             mappedCheckboxHandler={mappedCheckboxHandler}
//           />
//         </Grid>
//         <Grid direction="column" container className={mainContainer}>
//           <Grid className={dropContainer} container>
//             <Grid container justify="space-between">
//               <Grid container className={dropGrid}>
//                 <Grid className={dropFieldX}>
//                   <DroppableField
//                     label="X"
//                     onDelete={handleDeleteXField}
//                     droppedItem={xfieldState[selectedTabChart]}
//                     onFieldDrop={handleXDrop}
//                   />
//                 </Grid>
//                 <Grid container className={button}>
//                   <Button
//                     onButtonClick={handleOpenPopup}
//                     startIcon={publishButtonIcon}
//                     label="PUBLISH"
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>

//             <Grid container justify="space-between">
//               <Grid container className={dropGrid}>
//                 <Grid className={dropFieldY}>
//                   <DroppableField
//                     label="Y"
//                     onDelete={handleDeleteYField}
//                     droppedItem={yfieldState[selectedTabChart]}
//                     onFieldDrop={handleYDrop}
//                   />
//                 </Grid>
//                 <Grid container className={buttonGraph}>
//                   <Button
//                     onButtonClick={handleOpenDropdown}
//                     startIcon={graphIcon}
//                     isOutlined
//                     label="GRAPH"
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid className={graphContain} container direction="column">
//             <Grid
//               container
//               alignItems="center"
//               direction="row"
//               className={kpiContainer}
//             >
//               {tilesData[selectedTabChart]?.map((item: any, index: any) => {
//                 return (
//                   <Grid className={kpiContain}>
//                     <KpiCard
//                       handleOpenPopupKpi={handleOpenPopupKpi}
//                       index={index}
//                       isLoading={loading}
//                       fullKpiObject={item}
//                       title={item?.title}
//                       result={item?.result}
//                       backgroundColor={item?.background_color}
//                       textColor={item?.textColor}
//                     />
//                   </Grid>
//                 );
//               })}
//               <Grid
//                 onClick={handleOpenPopupKpi}
//                 container
//                 justify="center"
//                 alignItems="center"
//                 direction="column"
//                 className={addKpi}
//               >
//                 <div className={kpiButton}>
//                   <img src={addKpiIcon} alt="add-kpi"></img>
//                 </div>
//                 <p className={kpiText}>ADD KPI</p>
//               </Grid>
//             </Grid>

//             <Grid container className={graphSection} justify="space-between">
//               <Grid className={chartArea} item>
//                 {/* <Suspense fallback={<div>Loading...</div>}> */}
//                 <ChartArea
//                   isLoading={loading}
//                   // chart={queryObject[selectedTabChart]?.graph?.type}
//                   data={chartData[selectedTabChart]}
//                   chartTitle={chartTitles[selectedTabChart]}
//                   chartTitles={chartTitles}
//                   setChartTitles={setChartTitles}
//                   selectedChartIndex={selectedTabChart}
//                   handleReset={handleReset}
//                 />
//                 {/* </Suspense> */}
//               </Grid>

//               <Grid item className={tabBoxContainer}>
//                 <div className={tabBox}>
//                   <TabBox
//                     handleChange={handleChangeTab}
//                     value={valueTab}
//                     titles={titles}
//                     components={components}
//                   />
//                 </div>
//               </Grid>
//             </Grid>
//             <Grid container xs={12} className={bottomBar}>
//               <TabBar
//                 inputList={inputList}
//                 selectedTabChart={selectedTabChart}
//                 handleTabChartClick={handleTabChartClick}
//                 handleTabChartDelete={handleTabChartDelete}
//                 handleAddTab={handleAddTab}
//                 handleCopyTab={handleCopyTab}
//                 chartTitles={chartTitles}
//               />
//             </Grid>
//           </Grid>
//           <Grid></Grid>
//         </Grid>
//         <Popup
//           name="Create insight and add to your dashboard"
//           open={popup}
//           handleClose={handleClosePopup}
//         >
//           <PublishDashboard
//             chartTitles={chartTitles}
//             queryObject={queryObject}
//             handleClose={handleClosePopup}
//             showToast={props.showToast}
//             chartIdEdit={chartIdEdit}
//             chartData={chartData}
//             dashboardId={id}
//           />
//         </Popup>
//         <Popup name=" " open={popupKpi} handleClose={handleClosePopupKpi}>
//           <AddKpi
//             chartTitles={chartTitles}
//             queryObject={queryObject}
//             datasource={datasource}
//             kpiObject={editKpiObject}
//             handleClose={handleClosePopupKpi}
//             editIndex={editKpiIndex}
//             showToast={props.showToast}
//             handleAddKpi={handleAddKpi}
//             // statusXY={queryObject[selectedTabChart]?.statusXY}
//             tilesFunction={tilesFunction}
//             handleDeleteKpi={handleDeleteKpi}
//             database={selectedDatabase?.title}
//             tableName={droppedTable[selectedTabChart]?.table?.table_name}
//             fields={droppedTable[selectedTabChart]?.table?.fields}
//           />
//         </Popup>
//         <Popup
//           name="Upload Status"
//           open={popupStatus}
//           statusPopup
//           handleClose={handleClosePopupStatus}
//         >
//           <UploadStatus />
//         </Popup>
//         <DropdownMenu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           close={handleCloseDropdown}
//         >
//           <GraphDropdown
//             handleClick={handleGraphDropwdownClick}
//             // statusXY={queryObject[selectedTabChart]?.statusXY}
//           />
//         </DropdownMenu>
//       </Grid>
//     </div>
//   );
// };
// DashboardCreationPage.propTypes = {};

// export default DashboardCreationPage;

const CreateGraph = () => {
  return <>Create Graph</>;
};

export default CreateGraph;
