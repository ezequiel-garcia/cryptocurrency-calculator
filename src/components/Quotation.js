import React from "react";
import styled from "@emotion/styled";

const ResultDiv = styled.div`
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
  font-size: 18px;

  span {
    font-weight: bold;
  }
`;

const Price = styled.p`
  font-size: 30px;
  span {
    font-weight: bold;
  }
`;

const Quotation = ({ res }) => {
  if (Object.keys(res).length === 0) return null;

  return (
    <ResultDiv>
      <Price>
        The price is: <span>{res.PRICE}</span>
      </Price>
      <Info>
        Highest price of the day: <span>{res.HIGHDAY}</span>
      </Info>
      <Info>
        Lowest price of the day: <span>{res.LOWDAY}</span>
      </Info>
      <Info>
        Variation in the last 24 hours: <span>{res.CHANGEPCT24HOUR}</span>
      </Info>
      <Info>
        Last update: <span>{res.LASTUPDATE}</span>
      </Info>
    </ResultDiv>
  );
};

export default Quotation;
