import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  z-index: 1;
  min-height: 70%;
  width: 100%;
  background-color: #f4f4f4;
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

const CardWrapperSmallStyle = { minHeight: "100%" };

const CategoryColumn = styled.div`
  transform: rotate(-180deg);
  writing-mode: tb-rl;
  align-self: stretch;
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
  font-size: 14px;
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

const SubTitleFontSmall = {
  fontSize: "10px"
};

const TitleFontSmall = {
  fontSize: "16px"
};

const ActionFontSmall = {
  fontSize: "9px"
};

const DescriptionFontSmall = {
  fontSize: "10px"
};

const ColumnFontSmall = {
  fontSize: "10px"
};

const Card = props => {
  return (
    <CardWrapper style={props.small ? CardWrapperSmallStyle : null}>
      <CategoryColumn style={props.small ? ColumnFontSmall : null}>
        {props.card["category"]}
      </CategoryColumn>
      <ContentWrapper>
        <Title style={props.small ? TitleFontSmall : null}>{props.card["title"]}</Title>
        <Action style={props.small ? ActionFontSmall : null}>{props.card["action"]}</Action>
        <SubTitle style={props.small ? SubTitleFontSmall : null}>{props.card["subTitle"]}</SubTitle>
        <Divider />
        <CardParagraph style={props.small ? DescriptionFontSmall : null}>
          {props.card["description"]}
        </CardParagraph>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default Card;
