// /src/types/stats.ts

export interface StatBox {
  title: string;
  value: number;
  icon: string;
  bgColor: string;
  updateTime: string;
}

export interface ChartData {
  series: number[] | { name: string, data: number[] }[];
  categories: string[];
}
