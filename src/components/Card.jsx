import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  z-index: 1;
  height: 80%;
  width: 30%;
  max-width: 300px;
  background-color: #f4f4f4;
  border-top-right-radius: 5%;
  border-bottom-right-radius: 5%;
  margin: 1%;
  padding: 2.5px;
  &:hover {
    border-style: solid;
    border-width: 2.5px;
    border-color: red;
    padding: 0;
  }
  flex-direction: row;
  display: flex;
`;

const CategoryColumn = styled.div`
  transform: rotate(-180deg);
  writing-mode: tb-rl;
  align-self: stretch;
  height: 100%;
  width: 12%;
  background-color: green;
  justify-content: center;
  color: white;
  border: 1px solid green;
  padding-top: 10%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  width: 100%;
`;
const Title = styled.h4`
  color: black;
  padding-top: 10px;
`;

const Action = styled.p`
  font-size: 0.75em;
`;

const SubTitle = styled.h6`
  font-weight: 700;
`;

const Divider = styled.div`
  background-color: black;
  height: 2.5px;
  width: 90%;
`;

const CardParagraph = styled.p`
  padding-top: 10px;
  font-size: 0.8em;
  margin-right: 10px;
`;

const Card = props => {
  return (
    <CardWrapper>
      <CategoryColumn>{props.card["category"]}</CategoryColumn>
      <ContentWrapper>
        <Title>{props.card["title"]}</Title>
        <Action>{props.card["action"]}</Action>
        <SubTitle>{props.card["subTitle"]}</SubTitle>
        <Divider />
        <CardParagraph>{props.card["description"]}</CardParagraph>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default Card;
