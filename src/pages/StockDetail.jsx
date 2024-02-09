import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import finHub from "../api/finHub";
import StockChart from "../components/StockChart";

function StockDetail() {
  const [chartData, setChartData] = useState();
  const { symbol } = useParams();

  const formatData = (data) => {
    return data.t.map((element, index) => {
      return {
        x: element * 1000,
        y: Math.floor(data.c[index]),
      };
    });
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const date = new Date();
        const currentTime = Math.floor(date.getTime() / 1000);

        let oneDayAgo;
        if (date.getDay() === 6) {
          oneDayAgo = currentTime - 2 * 24 * 60 * 60;
        } else if (date.getDay() === 0) {
          oneDayAgo = currentTime - 3 * 24 * 60 * 60;
        } else {
          oneDayAgo = currentTime - 24 * 60 * 60;
        }

        const oneWeek = currentTime - 7 * 24 * 60 * 60;
        const oneYear = currentTime - 365 * 24 * 60 * 60;

        const responses = await Promise.all([
          finHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDayAgo,
              to: currentTime,
              resolution: 30,
            },
          }),
          finHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60,
            },
          }),
          finHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);

        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (isMounted) {
      fetchData();
    }

    return () => (isMounted = false);
  }, [symbol]);

  return (
    <section className="w-100">
      {chartData ? (
        <section>
          <StockChart chartData={chartData} symbol={symbol} />
        </section>
      ) : (
        <section className="shadow-lg w-75 mx-auto p-5 mt-5 ">
          <h1 className="text-center">No data to display on the chart</h1>
        </section>
      )}
    </section>
  );
}

export default StockDetail;
