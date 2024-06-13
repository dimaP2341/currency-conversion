import React, { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import axios from "axios";

// Create the context outside of the component
const CurrencyContext = createContext({
  currency: [""],
});

function App() {
  const [currency, setCurrency] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_cEYxGMpZKtgjiGyzwRpGOUvxhCiWeRQqqZegJLXu&currencies=EUR%2CUSD%2CJPY%2CBGN%2CCZK%2CDKK%2CGBP%2CHUF%2CPLN%2CRON%2CSEK%2CCHF%2CISK%2CNOK%2CHRK%2CRUB%2CTRY%2CAUD%2CBRL%2CCAD%2CCNY%2CHKD%2CIDR%2CILS%2CINR%2CKRW%2CMXN%2CMYR%2CNZD%2CPHP%2CSGD%2CTHB%2CZAR"
        );
        const currencies = res.data.data;
        setCurrency(currencies);
      } catch (error) {
        console.error("Error fetching the currency data:", error);
      }
    };

    fetchData();
  }, []);

  const defaultValue = {
    currency,
  };

  return (
    <div>
      <CurrencyContext.Provider value={defaultValue}>
        <Navbar />
        <Outlet />
      </CurrencyContext.Provider>
    </div>
  );
}

export { CurrencyContext };
export default App;
