import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useCurrency from "../hooks/useCurrency";
import useCryptocurrency from "../hooks/useCryptocurrency";
import axios from "axios";

const Buton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;

  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Form = ({ setCurrency, setCryptoCurrency }) => {
  // State list of cryptocurrencies
  const [listCrypto, setListCrypto] = useState([]);
  const [error, setError] = useState(false);

  // list of different currencies.
  const CURRENCIES = [
    { code: "USD", name: "United States Dollar" },
    { code: "ILS", name: "Israeli New Shekel" },
    { code: "EUR", name: "Euro" },
    { code: "ARG", name: "Argentinian Peso" },
    { code: "GBP", name: "Pound Sterling" },
    { code: "MXN", name: "Mexican Peso" },
  ];

  // Use useCurrency
  const [currency, SelectCurrency] = useCurrency(
    "Select your currency",
    "",
    CURRENCIES
  );

  // Use Crypto Currency
  const [cryptocurrency, SelectCrypto] = useCryptocurrency(
    "Choose your Cryptocurrency",
    "",
    listCrypto
  );

  // Execute API call
  useEffect(() => {
    const consultAPI = async () => {
      try {
        const url =
          "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
        const result = await axios.get(url);
        setListCrypto(result.data.Data);
      } catch (err) {
        console.error(err);
      }
    };
    consultAPI();
  }, []);

  // when the user submits
  const quoteCurrency = (e) => {
    e.preventDefault();

    //validate that the two fields are filed
    if (currency === "" || cryptocurrency === "") {
      setError(true);
      return;
    }

    setError(false);
    // send the data to the main component
    setCryptoCurrency(cryptocurrency);
    setCurrency(currency);
  };

  return (
    <form onSubmit={quoteCurrency}>
      {error ? <Error message="All the fields are required" /> : null}
      <SelectCurrency />
      <SelectCrypto />
      <Buton type="submit" value="calculate" />
    </form>
  );
};

export default Form;
