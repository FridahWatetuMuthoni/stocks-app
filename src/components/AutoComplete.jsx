function AutoComplete() {
  return (
    <section className="w-50 py-3 px-5 rounded  mx-auto ">
      <form action="" className="form-floating dropdown ">
        <input
          type="text"
          name="search"
          id="search"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          style={{ backgroundColor: "rgba(145, 158,171,0.04" }}
        />
        <label htmlFor="search">Search</label>
      </form>
    </section>
  );
}

export default AutoComplete;
