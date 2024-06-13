import { useEffect, useState } from "react";
import "./styles/SecondPage.css";
import { useLocation, useParams } from "react-router-dom";

type Rates = {
  [key: string]: number;
};

type Item = {
  code: string;
  decimal_digits: number;
  name: string;
  name_plural: string;
  rounding: number;
  symbol: string;
  symbol_native: string;
  type: string;
};

function SecondPage() {
  const [data, setData] = useState<Rates | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const arrCurrency = data ? Object.entries(data) : [];
  const location = useLocation();
  console.log(location.pathname.slice(1, -1));

  useEffect(() => {
    const convertCurrency = async () => {
      try {
        const response = await fetch(
          "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_cEYxGMpZKtgjiGyzwRpGOUvxhCiWeRQqqZegJLXu&currencies=EUR%2CUSD%2CJPY%2CBGN%2CCZK%2CDKK%2CGBP%2CHUF%2CPLN%2CRON%2CSEK%2CCHF%2CISK%2CNOK%2CHRK%2CRUB%2CTRY%2CAUD%2CBRL%2CCAD%2CCNY%2CHKD%2CIDR%2CILS%2CINR%2CKRW%2CMXN%2CMYR%2CNZD%2CPHP%2CSGD%2CTHB%2CZAR&base_currency=EUR"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch currency data");
        }

        const responseData = await response.json();
        setData(responseData.data);
        setLoading(false);
      } catch (error) {
        setError("An unknown error occurred");
        console.error("Error fetching currency data:", error);
      }
    };

    convertCurrency();
  }, []);

  if (loading) {
    return <main className='second-container'>Loading...</main>;
  }

  if (error) {
    return <main className='second-container'>{error}</main>;
  }

  return (
    <main className='second-container'>
      <h1>Rates Table</h1>
      <h3>1 EUR =</h3>
      <ul>
        {arrCurrency.map(([code, rate]) => (
          <li key={code} className='list-item'>
            {code} - {rate.toFixed(4)}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default SecondPage;
