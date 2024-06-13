import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import "./styles/FirstPage.css";
import { CurrencyContext } from "./App";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";

const FirstPage: React.FC = () => {
  const { currency } = useContext(CurrencyContext);
  const currencies = Object.keys(currency);
  const apiKey = import.meta.env.VITE_REACT_APP_CURRENCY_API_KEY;

  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const convertCurrency = async () => {
      if (amount > 0 && baseCurrency && targetCurrency) {
        try {
          const freecurrencyapi = new Freecurrencyapi(
            "fca_live_cEYxGMpZKtgjiGyzwRpGOUvxhCiWeRQqqZegJLXu"
          );
          const response = await freecurrencyapi.latest({
            base_currency: baseCurrency,
            currencies: targetCurrency,
          });

          console.log("Response from API:", response);

          const rate = response.data[targetCurrency];
          if (!rate) {
            throw new Error(`Rate for ${targetCurrency} not found.`);
          }

          setConvertedAmount(amount * rate);
        } catch (error: any) {
          console.error("Error fetching currency data:", error);
          setError(`Error fetching currency data: ${error.message}`);
        }
      }
    };

    convertCurrency();
  }, [amount, baseCurrency, targetCurrency, apiKey]);

  if (!apiKey) {
    return (
      <div>
        Error: API key is missing. Please check your environment variables.
      </div>
    );
  }

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "baseCurrency") {
      setBaseCurrency(value);
    } else if (name === "targetCurrency") {
      setTargetCurrency(value);
    }
    console.log(`${name}: ${value}`);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleChangeTargetToBase = () => {
    setAmount(convertedAmount);
  };

  return (
    <div className='first-container'>
      <h1>Currency Converter</h1>
      <section>
        <div className='container__section-1'>
          <select
            name='baseCurrency'
            onChange={handleOptionChange}
            value={baseCurrency}
          >
            {currencies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            type='number'
            value={Math.round(amount * 100000) / 100000}
            onChange={handleAmountChange}
          />
        </div>
        <i>
          <svg
            onClick={handleChangeTargetToBase}
            width='24'
            height='24'
            xmlns='http://www.w3.org/2000/svg'
            fillRule='evenodd'
            clipRule='evenodd'
          >
            <path d='M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 2c5.519 0 10 4.481 10 10s-4.481 10-10 10-10-4.481-10-10 4.481-10 10-10zm2 12v-3l5 4-5 4v-3h-9v-2h9zm-4-6v-3l-5 4 5 4v-3h9v-2h-9z' />
          </svg>
        </i>
        <div className='container__section-2'>
          <select
            name='targetCurrency'
            onChange={handleOptionChange}
            value={targetCurrency}
          >
            {currencies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            type='number'
            value={Math.round(convertedAmount * 100000) / 100000}
            disabled
          />
        </div>
      </section>
      {error && <div className='error'>{error}</div>}
    </div>
  );
};

export default FirstPage;
