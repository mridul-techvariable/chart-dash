import { FontSize, BaseColor, TickColor } from "../../utils/enums";

export interface XAxisOptions {
  domain: {
    color: string;
  };
  label: {
    enable: boolean;
    fontSize: FontSize;
  };
  ticks: {
    rotation: number;
    color: BaseColor;
    tickColor: TickColor;
    fontSize: FontSize;
  };
}
