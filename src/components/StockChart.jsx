import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { useState } from "react";

function StockChart({ chartData, symbol }) {
  const [dateFormat, setDateFormat] = useState("24hrs");
  const { day, week, year } = chartData;

  const determineTimeFormat = () => {
    switch (dateFormat) {
      case "24hrs":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  const detemineColor =
    determineTimeFormat()[determineTimeFormat().length - 1].y -
      determineTimeFormat()[0].y >
    0
      ? "#26c281"
      : "#ed3419";
  const options = {
    colors: [detemineColor],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datatime",
      labels: {
        dateTimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };

  const series = [
    {
      name: symbol,
      data: determineTimeFormat(),
    },
  ];

  const renderButtonSelect = (button) => {
    const classes = "btn m-1";
    if (button === dateFormat) {
      return classes + "btn-primary";
    } else {
      return classes + "btn-outline-primary";
    }
  };
  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width="100%" />
      <section>
        <button
          onClick={() => setDateFormat("24hrs")}
          className={renderButtonSelect("24hrs")}
        >
          24 hrs
        </button>
        <button
          onClick={() => setDateFormat("7d")}
          className={renderButtonSelect("7d")}
        >
          7 days
        </button>
        <button
          onClick={() => {
            setDateFormat("1y");
          }}
          className={renderButtonSelect("1y")}
        >
          1 year
        </button>
      </section>
    </div>
  );
}

StockChart.propTypes = {
  chartData: PropTypes.array,
  symbol: PropTypes.string,
};

export default StockChart;
