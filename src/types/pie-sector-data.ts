import { SectorProps } from "recharts";

export type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: { x: number, y: number };
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: any;
};

export type PieSectorDataItem = React.SVGProps<SVGPathElement> & Partial<SectorProps> & PieSectorData;