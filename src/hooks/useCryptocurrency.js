import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const SelectC = styled.select`
  -webkit-appearance: none;
  width: 100%;
  display: block;
  padding: 1rem;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useCryptocurrency = (label, initialState, options) => {
  // State of our custome hook
  const [state, setState] = useState(initialState);

  const SelectCrypto = () => (
    <Fragment>
      <Label>{label}</Label>
      <SelectC onChange={(e) => setState(e.target.value)} value={state}>
        <option value=""> -- Select -- </option>
        {/*  Creating the options with the optiones passed by the form component */}
        {options?.map((option) => (
          <option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>
            {option.CoinInfo.FullName}
          </option>
        ))}
      </SelectC>
    </Fragment>
  );

  //Return state, interface and function that modifies the state
  return [state, SelectCrypto, setState];
};

export default useCryptocurrency;
