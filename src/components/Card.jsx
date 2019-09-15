import React from "react";
import styled from "styled-components";
import sanitizeHtml from 'sanitize-html';



const CardWrapper = styled.div`
  z-index: 1;
  max-height:  ${props => props.height};
  max-width: 300px;
  height: 100%;
  width: 100%;
  background-color: #f4f4f4;
  border: 0.25px solid #e1e1e1;
  flex-direction: row;
  display: flex;
  padding-right: 10%;
`;

const CategoryColumn = styled.div`
  padding: 0.25px;
  transform: rotate(-180deg);
  writing-mode: tb-rl;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 15%;
  font-weight: 900;
  background-color: ${props => props.color};
  color: black;
  padding-bottom: 5%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  width: 100%;

  padding-bottom: 10%;
`;
const Title = styled.h4`
  color: black;
  padding-top: 10px;
  font-size: 20px;
`;

const Action = styled.p`
  font-size: 0.95em;
  font-weight: 700;
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
  font-size: 0.9em;
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

const boldOpportunityCategories = (paragraph) => {
    let dirty = paragraph.replace(/"([^"]+)"/g, `<b>$1</b>`);
    return sanitizeHtml(dirty, {
        allowedTags: ['b']
    });
};

const Card = props => {
  return (
    <CardWrapper height={props.small? "300px" : "600px"}>
      <CategoryColumn color={props.card["color"]} style={props.small ? ColumnFontSmall : null}>
        {props.card["categoryDescription"]}
      </CategoryColumn>
      <ContentWrapper>
        <Title style={props.small ? TitleFontSmall : null}>{props.card["title"]}</Title>
        <Action style={props.small ? ActionFontSmall : null}>{props.card["action"]}</Action>
        <SubTitle style={props.small ? SubTitleFontSmall : null}>{props.card["subTitle"]}</SubTitle>
        <Divider />
        <CardParagraph style={props.small ? DescriptionFontSmall : null}>
            <div dangerouslySetInnerHTML={{__html: boldOpportunityCategories(props.card["description"])}}/>
        </CardParagraph>
      </ContentWrapper>
    </CardWrapper>
  );
};

export default Card;
