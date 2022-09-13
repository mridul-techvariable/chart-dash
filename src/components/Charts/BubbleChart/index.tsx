import BubbleChart from "./bubbleChart";
import React, { Component } from "react";

export default function App(props: any) {
  props.loadPrimary(false);
  return <BubbleChart {...props} />;
}
