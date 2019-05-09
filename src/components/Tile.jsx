import React from "react";
import styled from "styled-components";

const Date = styled.div`
  font-size: 0.8em;
  color: ${props => props.dateTextColor}
  border: 1px solid ${props => props.dateColor};
  border-radius: 100%;
  text-align: center;
  width: 18px;
  height: 18px;
  font-family: "Patrick Hand", cursive;
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${props => props.dateColor};
`;

const Title = styled.div`
  flex-grow: 1;
  text-align: center;
  font-size: 1em;
  color: white;
`;

const TileWrapper = styled.div`
  position: relative;
  display: flex
  flex-direction: row
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background: ${props => props.inputColor};
  height: 120px;
  width: 137px;
  padding: 6px;
  &:hover {
    border-style: solid;
    border-width: 2.5px;
    border-color: #FFFFFF;
    padding: 3.5px;
  }
`;

export const IndicatedTileWrapper = styled.div`
  position: relative;
  display: flex
  flex-direction: row
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background: ${props => props.inputColor};
  height: 120px;
  width: 137px;
  padding: 6px;
  border-style: solid;
  border-width: 3px;
  border-color: red;
  padding: 3px;
  box-shadow: inset 0 0 0 1000px rgba(1,1,0,.4);
`;

export const Layer = styled.div`
  background-color: rgba(1, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Description = styled.div`
  flex-grow: 1;
  text-align: center;
  font-size: 0.7em;
  width: 100%;
  color: ${props => props.descriptionColor || "#FFFFFF"};
`;

const Action = styled.div`
  flex-grow: 1;
  text-align: center;
  color: white;
`;

const HR = styled.div`
  width: 100%;
  height: 0px;
`;

const TileInner = props => (
  <React.Fragment>
    <Title>{props.title}</Title>
    {props.date ? (
      <Date dateColor={props.dateColor} dateTextColor={props.dateTextColor}>
        {props.date}
      </Date>
    ) : null}
    <HR />
    {props.image}
    <Description descriptionColor={props.descriptionColor}>{props.description}</Description>
    <Action>{props.action}</Action>
  </React.Fragment>
);

const Tile = props => {
  if (props.isPlayerTile) {
    return (
      <IndicatedTileWrapper onClick={props.onClick} inputColor={props.color}>
        <TileInner {...props} />
      </IndicatedTileWrapper>
    );
  }
  return (
    <TileWrapper onClick={props.onClick} inputColor={props.color}>
      <TileInner {...props} />
    </TileWrapper>
  );
};

export default Tile;
