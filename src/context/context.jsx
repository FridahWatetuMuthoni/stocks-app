import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import finHub from "../api/finHub";

const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [stock, setStock] = useState([]);
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        let responses = await Promise.all(
          watchList.map((stock) => {
            return finHub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );

        responses = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });

        if (isMounted) {
          setStock(responses);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => (isMounted = false);
  }, [watchList]);

  const data = {
    stock,
    search,
    setSearch,
    setWatchList,
  };

  return (
    <GlobalContext.Provider value={data}>
      {props.children}
    </GlobalContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContextProvider, GlobalContext };
