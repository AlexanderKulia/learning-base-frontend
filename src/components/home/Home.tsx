import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
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

export const Home = (): JSX.Element => {
  const [chartData, setChartData] = useState<HomeChartData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChartData = async (): Promise<void> => {
      try {
        const chartDataRes = await ChartsApi.getHomeChartData();
        setChartData(chartDataRes.data);
        setIsLoading(false);
      } catch (error) {
        alert("Could not fetch chart data");
      }
    };

    fetchChartData();
  }, []);

  const handleXAxis = (): Highcharts.Options["xAxis"] => {
    return {
      categories: chartData.map((item) => {
        const date = new Date(item.day);
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
      }),
    };
  };

  const handleSeries = (): Highcharts.Options["series"] => {
    return [
      {
        type: "column",
        data: chartData.map((item) => item.count),
      },
    ];
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            ...options,
            xAxis: handleXAxis(),
            series: handleSeries(),
          }}
        />
      )}
    </>
  );
};
