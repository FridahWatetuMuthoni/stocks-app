import { BrowserRouter, Routes, Route } from "react-router-dom";
import StockOverView from "./pages/StockOverView";
import StockDetail from "./pages/StockDetail";
import { GlobalContextProvider } from "./context/context";

function App() {
  return (
    <main className="container">
      <BrowserRouter>
        <GlobalContextProvider>
          <Routes>
            <Route path="/" element={<StockOverView />} />
            <Route path="/detail/:symbol" element={<StockDetail />} />
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
