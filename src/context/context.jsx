import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import finHub from "../api/finHub";

const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  const [stock, setStock] = useState([]);
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finHub.get("/search", {
          params: {
            q: search,
          },
        });
        if (isMounted) {
          console.log(response.data);
          setSearchResults(response.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (search.length > 0) {
      fetchData();
    } else {
      setSearchResults([]);
    }

    return () => (isMounted = false);
  }, [search]);

  const addStock = (stock) => {
    if (watchList.indexOf(stock) === -1) {
      setWatchList([...watchList, stock]);
    }
  };

  const deleteStock = (stock) => {
    let updatedStocks = watchList.filter((element) => element !== stock);
    setWatchList(updatedStocks);
  };

  const data = {
    stock,
    search,
    setSearch,
    setWatchList,
    searchResults,
    addStock,
    deleteStock,
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
