import React from "react";
import styled from "styled-components";

const CategoryText = styled.span`
  font-size: 14px;
  font-weight: var(--font-weight-bold);
  color: var(--color-purple);
  margin-top: 5px;
  margin-left: 35px;
`;
const HorizontalLineBelow = styled.div`
  width: 304px;
  height: 1px;
  margin: 0 auto;
  background-color: var(--color-purple);
`;
const Text = styled.p`
  width: 304px;
  margin: 25px auto;
  line-height: 20px;
  font-size: 14px;
  font-weight: var(--font-weight-regular);
`;

const RecycleMethodsHY = ({ text }) => {
  return (
    <>
      <HorizontalLineBelow />
      <CategoryText>배출 방법</CategoryText>
      <Text>{text}</Text>
    </>
  );
};

export default RecycleMethodsHY;
