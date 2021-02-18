import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import image from "./cryptomonedas.png";
import Form from "./components/Form";
import Quotation from "./components/Quotation";
import Spinner from "./components/Spinner";

import axios from "axios";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  // States
  const [currency, setCurrency] = useState("");
  const [cryptoCurrency, setCryptoCurrency] = useState("");
  const [res, setRes] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const quoteCryptoCurrency = async () => {
      // prevent the first load
      if (currency === "") {
        return;
      }

      // consult the api to get the quotation
      try {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`;
        const res = await axios.get(url);

        // show spinner
        setLoading(true);

        // hide spinner
        setTimeout(() => {
          setLoading(false);

          // saving the response in the res state.
          setRes(res.data.DISPLAY[cryptoCurrency][currency]);
        }, 3000);
      } catch (err) {
        console.error(err);
      }
    };

    quoteCryptoCurrency();
  }, [currency, cryptoCurrency]);

  // show spinner or result
  const component = loading ? <Spinner /> : <Quotation res={res} />;

  return (
    <Container>
      <div>
        <Image src={image} alt="cryptoconcurrence image" />
      </div>
      <div>
        <Heading>Quote Cryptocurrencies Instantly</Heading>
        <Form setCurrency={setCurrency} setCryptoCurrency={setCryptoCurrency} />
        {component}
      </div>
    </Container>
  );
}

export default App;
