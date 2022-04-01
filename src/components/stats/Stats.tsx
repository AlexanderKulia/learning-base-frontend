import { AxiosResponse } from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useQuery } from "react-query";
import { ChartsApi, HomeChartData } from "../../services/api";
import { Spinner } from "../utils/Spinner";

const options: Highcharts.Options = {
  chart: {
    style: {
      fontFamily: "Roboto",
    },
  },
  legend: { enabled: false },
  title: {
    text: "My learning progress",
  },
  tooltip: { animation: false },
  plotOptions: {
    column: {
      dataLabels: {
        enabled: true,
      },
      states: {
        hover: { enabled: false },
      },
    },
    series: {
      animation: false,
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: "Notes created",
    },
  },
};

export const Stats = (): JSX.Element => {
  const statsQuery = useQuery<
    AxiosResponse<HomeChartData[]>,
    Error,
    HomeChartData[]
  >("stats", () => ChartsApi.getHomeChartData(), { select: (res) => res.data });

  if (statsQuery.isLoading) return <Spinner />;
  if (!statsQuery.isSuccess) return <span>Failed to load stats</span>;
  if (Array.isArray(statsQuery.data) && !statsQuery.data.length)
    return <span>Seems like you dont have any activity yet</span>;

  const handleXAxis = (): Highcharts.Options["xAxis"] => {
    return {
      categories: statsQuery.data.map((item) => {
        const date = new Date(item.day);
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
      }),
    };
  };

  const handleSeries = (): Highcharts.Options["series"] => {
    return [
      {
        type: "column",
        data: statsQuery.data.map((item) => item.count),
      },
    ];
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{
        ...options,
        xAxis: handleXAxis(),
        series: handleSeries(),
      }}
    />
  );
};
