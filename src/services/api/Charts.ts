import { AxiosResponse } from "axios";
import { get } from "./base";

export interface HomeChartData {
  day: string;
  count: number;
}

export const ChartsApi = {
  getHomeChartData: (): Promise<AxiosResponse<HomeChartData[]>> =>
    get<HomeChartData[]>("/charts/home"),
};
