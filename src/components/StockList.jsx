import useGlobalData from "../hooks/useGlobalData";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function StockList() {
  const { stock, deleteStock } = useGlobalData();
  const navigate = useNavigate();

  const changeColor = (data) => {
    return data > 0 ? "success" : "danger";
  };

  const renderIcon = (data) => {
    return data > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
  };

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`);
  };

  if (stock.length < 1) {
    return (
      <section className="shadow-sm p-5 mt-5 rounded-2 w-75 mx-auto">
        <h2 className="text-center p-3 ">
          Check your Internet Connection and Reload
        </h2>
      </section>
    );
  }
  return (
    <section>
      <table className="table table-striped shadow-lg mt-5 p-3">
        <thead style={{ color: "rgb(79,89,102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stockData) => {
            const { data, symbol } = stockData;
            return (
              <tr
                className="table-row"
                style={{
                  cursor: "pointer",
                }}
                key={symbol}
                onClick={() => handleStockSelect(symbol)}
              >
                <th scope="row">{symbol}</th>
                <td>{data.c}</td>
                <td className={`text-${changeColor(data.d)}`}>
                  {data.d}
                  {renderIcon(data.d)}
                </td>
                <td className={`text-${changeColor(data.dp)}`}>
                  {data.dp}
                  {renderIcon(data.dp)}
                </td>
                <td>{data.h}</td>
                <td>{data.l}</td>
                <td>{data.o}</td>
                <td>
                  {data.pc}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteStock(symbol);
                    }}
                    className="btn btn-danger btn-sm mx-3 d-inline-block delete-button"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default StockList;
