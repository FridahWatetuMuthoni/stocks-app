import useGlobalData from "../hooks/useGlobalData";

function AutoComplete() {
  const { setSearch, searchResults, search, addStock } = useGlobalData();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const renderDropDown = () => {
    const dropDownClass = search ? "show" : null;
    return (
      <ul
        style={{
          height: "500px",
          overflowY: "scroll",
          overflowX: "hidden",
          cursor: "pointer",
        }}
        className={`dropdown-menu p-2 ${dropDownClass}`}
      >
        {searchResults.map((result) => {
          return (
            <li
              className="dropdown-item"
              key={result.symbol}
              onClick={() => {
                let str = result.symbol;
                let symbol = result.symbol.slice(0, str.indexOf("."));
                addStock(symbol);
                setSearch("");
              }}
            >
              {result.description}-{result.symbol}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <section className="w-50 py-3 px-5 rounded  mx-auto ">
      <form action="" className="form-floating dropdown ">
        <input
          type="text"
          name="search"
          id="search"
          onChange={handleChange}
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          style={{ backgroundColor: "rgba(145, 158,171,0.04" }}
        />
        <label htmlFor="search">Search</label>
        {renderDropDown()}
      </form>
    </section>
  );
}

export default AutoComplete;
